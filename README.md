# Obsidian: Show Whitespace (k3vin)

[![GitHub tag (Latest by date)](https://img.shields.io/github/v/tag/OpenK3vin/obsidian-show-whitespace-cm6)](https://github.com/OpenK3vin/obsidian-show-whitespace-cm6/releases) ![GitHub all releases](https://img.shields.io/github/downloads/OpenK3vin/obsidian-show-whitespace-cm6/total?color=success) [![CC BY-SA 4.0][cc-by-sa-shield]][cc-by-sa]

> **Note:** This is a fork of the original [Show Whitespace](https://github.com/ebullient/obsidian-show-whitespace-cm6) plugin by [ebullient](https://github.com/ebullient).

This is a simple plugin to enable CodeMirror 6 extensions to highlight whitespace in both Source and Live Preview modes.

## Features

- **Whitespace Visualization:** Displays leading and trailing whitespace in your notes.
- **Unicode Whitespace Identification:** Highlights non-standard Unicode whitespace characters (like NO-BREAK SPACE, thin spaces, etc.) with dotted underlines to make them visible.
- **Zero-width Space (Custom Whitespace):** Reveals hidden zero-width spaces (e.g., `\u200b`) with a clear outline so they can be spotted and managed easily. *Includes a quick toggle via Command Palette and Ribbon icon.*
- **Performance Optimized:** Incremental rendering updates ensure smooth typing without UI flickering.
- **Blockquote Identification:** Highlights the leading caret for blockquotes, making them easily distinguishable.
- **List marker whitespace:** Slight background applied to whitespace assigned to list markers (bullets or numbers)

Basic CSS styling provided by the plugin renders characters for whitespace at the beginning and ending of lines (not in the middle) for readability.

## Look / Feel options

The plugin provides a few options to customize the look and feel of whitespace characters.

You can also completely disable the plugin's CSS and use your own.

1. Use the plugin setting to disable registration of style.css (this functions as a style settings plugin would)
2. Copy the plugin `style.css` into your own CSS snippet
3. Update styles as desired.

### Examples

Once enabled, the plugin always shows leading space (as that is the hardest to see).
Display of inner/trailing spaces depends on configuration.

- Plugin disabled:  
    <img width="337" alt="image" src="./imgs/lists-no-whitespace.png">

- Show all whitespace; outline list markers:  
    <img width="374" alt="image" src="./imgs/lists-all-whitespace.png">

- Leading/Trailng whitespace; outline list markers:  
    <img width="338" alt="image" src="./imgs/lists-markers.png">

### Line endings

Redefine `--line-end` or `--line-break` to change how those characters appear in a snippet.

```css
body {
  --line-end: '¬';
  --line-break: '↲';
}
```

## Installation

To install:

1. Open `Settings` -> `Community Plugins`
2. Disable safe mode
3. **Browse** and search for "Show Whitespace"
4. Click install
5. Use the toggle on the community plugins tab to enable the plugin.

### Preview with Beta Reviewers Auto-update Tester (BRAT)

1. **Install BRAT**:
    - Open `Settings` -> `Community Plugins`.
    - Disable safe mode.
    - *Browse*, and search for "BRAT."
    - Install the latest version of **Obsidian 42 - BRAT**.
2. **Configure BRAT**:
    - Open BRAT settings (`Settings` -> `Obsidian 42 - BRAT`).
    - In the `Beta Plugin List` section, click `Add Beta Plugin`.
    - Specify this repository: `OpenK3vin/obsidian-show-whitespace-cm6`.
3. **Enable the Plugin**:
    - Navigate to `Settings` -> `Community Plugins`.
    - Enable the plugin.

## For developers

Pull requests are both welcome and appreciated. 😀

## Support

Interested in supporting further development? Consider buying me a coffee!

[<img alt="" src="https://cdn.buymeacoffee.com/buttons/v2/default-blue.png" width="200px"/>](https://www.buymeacoffee.com/k3vin)

## Attribution

While this fork contains new features and improvements by k3vin, it is built upon the excellent foundation of the original [Show Whitespace](https://github.com/ebullient/obsidian-show-whitespace-cm6) plugin by [ebullient](https://github.com/ebullient), which itself was inspired by behavior in VSCode and the original [Show Whitespace](https://github.com/deathau/cm-show-whitespace-obsidian) plugin by [death_au](https://github.com/deathau).

## License

This work is licensed under a [Creative Commons Attribution-ShareAlike 4.0 International License][cc-by-sa].

[![CC BY-SA 4.0](https://licensebuttons.net/l/by-sa/4.0/88x31.png)][cc-by-sa]

[cc-by-sa]: http://creativecommons.org/licenses/by-sa/4.0/
[cc-by-sa-shield]: https://img.shields.io/badge/License-CC%20BY--SA%204.0-lightgrey.svg
