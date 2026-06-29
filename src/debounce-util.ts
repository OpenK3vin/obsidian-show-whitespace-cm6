import { type Range, StateEffect } from "@codemirror/state";
import {
    type Decoration,
    type DecorationSet,
    type EditorView,
    ViewPlugin,
    type ViewUpdate,
} from "@codemirror/view";

export const DEBOUNCE_MS = 300;

export const triggerRebuild = StateEffect.define<null>();

/**
 * Dirty ranges accumulated during typing — passed to buildDecorations
 * so only changed lines are rebuilt when the debounce fires.
 */
export interface DirtyRange {
    from: number;
    to: number;
}

export function createWhitespacePlugin(
    buildDecorations: (
        view: EditorView,
        dirtyRanges?: DirtyRange[],
    ) => DecorationSet,
) {
    return ViewPlugin.fromClass(
        class {
            decorations: DecorationSet;
            isTyping = false;
            timer: ReturnType<typeof activeWindow.setTimeout> | null = null;
            dirtyRanges: DirtyRange[] = [];

            constructor(view: EditorView) {
                this.decorations = buildDecorations(view);
            }

            update(update: ViewUpdate): void {
                const hasRebuild = update.transactions.some((tr) =>
                    tr.effects.some((e) => e.is(triggerRebuild)),
                );

                if (update.docChanged) {
                    this.isTyping = true;

                    // Collect dirty ranges
                    const currentDirty: DirtyRange[] = [];
                    update.changes.iterChangedRanges(
                        (_fromA, _toA, fromB, toB) => {
                            const doc = update.view.state.doc;
                            const lineFrom = doc.lineAt(fromB).from;
                            const lineTo = doc.lineAt(toB).to;
                            currentDirty.push({ from: lineFrom, to: lineTo });
                            this.dirtyRanges.push({
                                from: lineFrom,
                                to: lineTo,
                            });
                        },
                    );

                    // Map existing decorations forward for unchanged lines
                    this.decorations = this.decorations.map(update.changes);

                    // Immediately rebuild only the changed lines
                    if (currentDirty.length > 0) {
                        const newDecorations = buildDecorations(
                            update.view,
                            currentDirty,
                        );
                        const newRanges = this.collectRanges(
                            newDecorations,
                        ).sort((a, b) => a.from - b.from); // sort by position only

                        this.decorations = this.decorations.update({
                            filter: (from, to) =>
                                !currentDirty.some(
                                    (r) => from >= r.from && to <= r.to,
                                ),
                            add: newRanges,
                            sort: true,
                        });
                    }

                    const view = update.view;
                    if (this.timer) activeWindow.clearTimeout(this.timer);
                    this.timer = activeWindow.setTimeout(() => {
                        this.isTyping = false;
                        this.timer = null;
                        try {
                            view.dispatch({ effects: triggerRebuild.of(null) });
                        } catch {
                            // view was destroyed before the debounce fired
                        }
                    }, DEBOUNCE_MS);
                    return;
                }

                // Handle rebuild trigger BEFORE the isTyping guard
                if (hasRebuild) {
                    this.isTyping = false;
                    if (this.dirtyRanges.length > 0) {
                        const dirty = this.dirtyRanges;
                        this.dirtyRanges = [];
                        const newDecorations = buildDecorations(
                            update.view,
                            dirty,
                        );
                        const newRanges = this.collectRanges(
                            newDecorations,
                        ).sort((a, b) => a.from - b.from); // sort by position only

                        this.decorations = this.decorations.update({
                            filter: (from, to) =>
                                !dirty.some(
                                    (r) => from >= r.from && to <= r.to,
                                ),
                            add: newRanges,
                            sort: true,
                        });
                    } else {
                        this.decorations = buildDecorations(update.view);
                    }
                    return;
                }

                if (this.isTyping) return;

                // Viewport/selection changes only — full rebuild
                if (update.viewportChanged || update.selectionSet) {
                    this.decorations = buildDecorations(update.view);
                }
            }

            /**
             * Extracts all decoration ranges from a DecorationSet
             * so they can be merged into another set.
             */
            collectRanges(set: DecorationSet): Range<Decoration>[] {
                const ranges: Range<Decoration>[] = [];
                const iter = set.iter();
                while (iter.value) {
                    ranges.push(iter.value.range(iter.from, iter.to));
                    iter.next();
                }
                return ranges;
            }

            destroy(): void {
                if (this.timer) activeWindow.clearTimeout(this.timer);
            }
        },
        { decorations: (v) => v.decorations },
    );
}
