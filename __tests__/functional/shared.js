export const baseUrl = `file://${process.cwd()}/__tests__/functional`;
export const wait = (time) => new Promise((res) => setTimeout(() => res('ok'), time))
export const getStepFactorByBrowser = (name) => {
  const ciFactor = process.env.CI ? 2 : 1;
  return name === 'firefox' ? 5 * ciFactor : name === 'webkit' ? 10 * ciFactor : 1 * ciFactor
}
