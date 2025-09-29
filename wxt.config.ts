import { defineConfig } from 'wxt';

// See https://wxt.dev/api/config.html
export default defineConfig({
  manifest: {
    name: 'Jira Timer Extension',
    description: 'Tracks speaking time when Jira Quick Filters change.',
    version: '0.0.0',
    manifest_version: 3,
    permissions: ['storage', 'scripting'],
    host_permissions: ['https://*/*'],
  },
  webExt: {
    startUrls: ['https://jira.demo.almworks.com/secure/RapidBoard.jspa?rapidView=5#/'],
  },
});
