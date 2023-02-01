jest.setTimeout(60000)
export default (time) => new Promise((res) => setTimeout(() => res('ok'), time))
