import React from 'react'

export const CodePen: React.FC<{
  src: string
}> = ({ src }) => (
  <iframe
    style={{ width: '100%', height: '100%' }}
    scrolling="no"
    title="DragSelect"
    src={src}
    frameBorder="no"
    loading="lazy"
    allowFullScreen
  >
    See the Pen{' '}
    <a href={src} className="metalink">
      DragSelect
    </a>{' '}
    on CodePen.
  </iframe>
)
