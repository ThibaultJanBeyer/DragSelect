
export const getDocumentScroll = () => ({
  y: document.body?.scrollTop || document.documentElement?.scrollTop || 0,
  x: document.body?.scrollLeft || document.documentElement?.scrollLeft || 0,
})
