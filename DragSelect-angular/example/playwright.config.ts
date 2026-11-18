import { defineConfig, devices } from '@playwright/test';

// The same tests run against two apps with the same code:
// this one (latest Angular, zoneless) and ../example-ng19 (oldest supported Angular, zone.js).
export default defineConfig({
  testDir: './e2e',
  projects: [
    {
      name: 'angular-22-zoneless',
      use: { ...devices['Desktop Chrome'], baseURL: 'http://localhost:4321' },
    },
    {
      name: 'angular-19-zone.js',
      use: { ...devices['Desktop Chrome'], baseURL: 'http://localhost:4322' },
    },
  ],
  webServer: [
    {
      command: 'npx ng serve --port 4321',
      url: 'http://localhost:4321',
      reuseExistingServer: !process.env['CI'],
      timeout: 120_000,
    },
    {
      command: 'npm --prefix ../example-ng19 start',
      url: 'http://localhost:4322',
      reuseExistingServer: !process.env['CI'],
      timeout: 120_000,
    },
  ],
});
