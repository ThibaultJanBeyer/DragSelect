import base from './playwright.config.js'
export default {
  ...base,
  globalSetup: undefined,
  reporter: 'line',
  projects: [
    { name: 'react', testMatch: 'zz-kb.spec.js', use: { baseURL: 'http://127.0.0.1:4302' } },
    { name: 'angular', testMatch: 'zz-kb.spec.js', use: { baseURL: 'http://127.0.0.1:4303' } },
  ],
  webServer: base.webServer.slice(1),
}
