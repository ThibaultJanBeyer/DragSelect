export const baseUrl = `file://${process.cwd()}/__tests__/functional`;

export const wait = (time) => new Promise((res) => setTimeout(() => res('ok'), time))

export const getStepFactorByBrowser = (name) => {
  const ciFactor = process.env.CI ? 2 : 1;
  return name === 'firefox' || name === 'webkit' ? 10 * ciFactor : 1 * ciFactor
}

export const goToOptimized = async (page, uri) => {
  await page.goto(uri)
  await page.waitForLoadState('domcontentloaded', { timeout: 15000 });
  await page.waitForLoadState('load', { timeout: 30000 });
  await page.waitForLoadState('networkidle', { timeout: 5000 });
}
