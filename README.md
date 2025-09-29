# ⌛ Jira Timer Extension

> **Add a timer to the Jira Kanban board which resets whenever the Quick Filters change** - This is a Chrome Extension

<p>
  <a href="https://chromewebstore.google.com/detail/<TODO>"><img src="https://img.shields.io/badge/Chrome_Web_Store-b7bdf8?style=for-the-badge&logo=GoogleChrome&logoColor=24273a"></a>
  <a href="https://addons.mozilla.org/en-US/firefox/addon/jira-timer-extension/"><img src="https://img.shields.io/badge/Firefox_Add--ons-f5a97f?style=for-the-badge&logo=Firefox-Browser&logoColor=24273a"></a>
</p>

## ✨ Features

- 🕒 **Big Clock** - Visible for all participants in Dailys / Standups (Agile Project Management)
- 🔵 **Circular Visualiser** - Get a better feeling for how much timer is left
- ⭕ **Red Stopwatch** - Count the time back up after it ran out with red warnings
- 🤏 **Minimize Timer** - Whenever the timer is in your way, just hit the minimize button and it counts down in the background

## 🚀 Development

### Directory Structure

| Folder | Description |
|---|---|
| `entrypoints/content.ts` | Logic for displaying timer on Jira websites. |
| `entrypoints/style.css` | CSS styles for the displayed timer. |
| `entrypoints/options.ts` | Logic for updating the domains configured by the user to local storage. |
| `entrypoints/options.html` | Website where the user can change and configure the domains where this extension should be active. |
| `entrypoints/background.ts` | Logic for updating the `content.ts` script with the correct domains. |
| `public/icon/` | Extension icon in different sizes. | <TODO>

### Scripts

The following package.json scripts are available for your convenience:

| Script | Description |
|---|---|
| `dev` | Launch a Chrome instance with the extension installed and hot reloading enabled. Use `dev:firefox` to launch a Firefox instance instead. |
| `build` | Build the Chrome extension to `dist/`. Use `build:firefox` to build the Firefox version instead. |
| `zip` | Build and zip the Chrome extension. Use `zip:firefox` to build and zip the Firefox version instead. |

<div align="center">

**Made with ❤️ by [@trueberryless](https://trueberryless.org)**

</div>
