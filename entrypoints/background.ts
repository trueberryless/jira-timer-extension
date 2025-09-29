export default defineBackground({
  async main() {
    async function registerContentScript() {
      let userDomains = (await storage.getItem<string[]>('local:userDomains')) ?? [];
      userDomains = userDomains.map(domain => `*://${domain}/*`);

      await browser.scripting.registerContentScripts([{
        id: "jira-timer-extension",
        js: ["content.js"],
        matches: userDomains,
        runAt: "document_idle",
        allFrames: false,
      }]);
    }

    browser.runtime.onInstalled.addListener(registerContentScript);
    browser.storage.onChanged.addListener(registerContentScript);
  }
});