export const baseUrl = `file://${process.cwd()}/__tests__/functional`;
export const wait = (time) => new Promise((res) => setTimeout(() => res('ok'), time))
export const getStepFactorByBrowser =
  (name) => name === 'firefox' ? 5 : name === 'webkit' ? 10 : 1
