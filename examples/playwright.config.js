import { defineConfig, devices } from '@playwright/test'

// Each app is built for production and served with `vite preview`,
// so the tests exercise the package exactly as a user's bundle would.
// The Angular app is built with the Angular CLI (AOT), like a real Angular project.
const apps = [
  { name: 'js', dir: 'js-test', port: 4301, build: 'npx vite build' },
  { name: 'react', dir: 'react-test', port: 4302, build: 'npx vite build' },
  { name: 'angular', dir: 'angular-test', port: 4303, build: 'npx ng build' },
]

const browsers = [
  { name: 'chromium', use: devices['Desktop Chrome'] },
  { name: 'firefox', use: devices['Desktop Firefox'] },
  { name: 'webkit', use: devices['Desktop Safari'] },
]

export default defineConfig({
  testDir: './e2e',
  globalSetup: './e2e/global-setup.js',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  projects: apps.flatMap((app) =>
    browsers.map((browser) => ({
      name: `${app.name}-${browser.name}`,
      testMatch: `${app.name}.spec.js`,
      use: { ...browser.use, baseURL: `http://127.0.0.1:${app.port}` },
    }))
  ),
  webServer: apps.map((app) => ({
    cwd: app.dir,
    command: `${app.build} && npx vite preview --host 127.0.0.1 --port ${app.port} --strictPort`,
    url: `http://127.0.0.1:${app.port}`,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  })),
})
