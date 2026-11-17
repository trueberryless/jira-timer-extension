# ⌛ Jira Timer Extension

> **Add a timer to the Jira Kanban board which resets whenever the Quick Filters change** - This is a Chrome Extension

![Chrome Extension](https://img.shields.io/badge/Chrome-Extension-green?logo=googlechrome&logoColor=green)

## ✨ Features

- 🕒 **Big Clock** - Visible for all participants in Dailys / Standups (Agile Project Management)
- 🔵 **Circular Visualiser** - Get a better feeling for how much timer is left
- ⭕ **Red Stopwatch** - Count the time back up after it ran out with red warnings
- 🤏 **Minimize Timer** - Whenever the timer is in your way, just hit the minimize button and it counts down in the background

## 📚 Resources

- 📖 [**Load unpacked extensions**](https://developer.chrome.com/docs/extensions/get-started/tutorial/hello-world#load-unpacked) - Complete setup guide

## ⚙️ Configuration

You can search for those terms to adjust settings for your needs:

| Terms          | Description                                                                                    | Default        |
| -------------- | ---------------------------------------------------------------------------------------------- | -------------- |
| `totalSeconds` | The total time every speacker should be allowed to speak before the stopwatch starts           | `90`           |
| `lightskyblue` | Adjust the default color for the circular surroundings (2x in `content.js`, 1x in `timer.css`) | `lightskyblue` |
| `red`          | Default color for the warning circular surroundings (1x in `content.js`, 1x in `timer.css`)    | `red`          |

Take a closer look in the `timer.css` to adjust:

- `width` and `height` of the clock (default: `30rem`)
- positioning with `top`, `right`, `bottom` or/and `left` respectfully
- `border-radius`, and so on...

## 📤 Outputs

Displayes a big timer in the bottom left corner on the Jira page.

## 🚀 Quick Start

1. Clone this repository with `git clone https://github.com/trueberryless/jira-timer-extension`
2. Go to `manifest.json` and adapt the `host_permissions` and `content_scripts[].matches` to your companies Jira domain.
3. Go to `chrome://extensions/` in a Chromium-based browser
4. Enable `Developer Mode` in the top right corner
5. Click `Load unpacked` and choose the local files you cloned in step one (root directory of this repo).
6. Enjoy 🥳

<div align="center">

**Made with ❤️ by [@trueberryless](https://felixs.dev)**

</div>
