import { useState } from 'react'
import {
  DragSelectProvider,
  useDragSelect,
  useDragSelectArea,
  useDragSelectEvent,
  useDropZone,
  useSelectable,
  useSelection,
} from '@dragselect/react'

const INITIAL = Array.from({ length: 12 }, (_, i) => ({ id: String(i + 1), folder: null }))

export default function App() {
  const [files, setFiles] = useState(INITIAL)
  const move = (ids, folder) =>
    setFiles((fs) => fs.map((f) => (ids.includes(f.id) ? { ...f, folder } : f)))

  return (
    <DragSelectProvider>
      <h1>@dragselect/react</h1>
      <p>Drag to select. Drag selected items onto a folder. Hold Shift/Ctrl to add.</p>
      <Toolbar />
      <Area onMove={move}>
        <div className="grid">
          {files.map((f) => (
            <Item key={f.id} file={f} />
          ))}
        </div>
        <div className="folders">
          <Folder id="archive" name="Archive" files={files} onMove={move} />
          <Folder id="trash" name="Trash" files={files} onMove={move} />
        </div>
      </Area>
      <Log />
    </DragSelectProvider>
  )
}

function Area({ onMove, children }) {
  const ref = useDragSelectArea()
  // dropped next to the folders: the items leave their folder
  useDragSelectEvent('DS:end', ({ items, isDragging, dropTarget }) => {
    if (isDragging && !dropTarget) onMove(items.map((el) => el.dataset.id), null)
  })
  return <div ref={ref} className="area">{children}</div>
}

function Item({ file }) {
  const ref = useSelectable()
  return (
    <button type="button" ref={ref} className="item" data-id={file.id}>
      {file.id}
      {file.folder && <small>{file.folder}</small>}
    </button>
  )
}

function Folder({ id, name, files, onMove }) {
  const ref = useDropZone(id)
  useDragSelectEvent('DS:end', ({ items, isDragging, dropTarget }) => {
    if (!isDragging || dropTarget?.id !== id) return
    onMove(items.map((el) => el.dataset.id), id)
  })
  const count = files.filter((f) => f.folder === id).length
  return (
    <div ref={ref} className="zone">
      📁 {name} ({count})
    </div>
  )
}

function Toolbar() {
  const ds = useDragSelect()
  const selected = useSelection()
  return (
    <div className="toolbar">
      <button onClick={() => ds?.setSelection(ds.getSelectables())}>Select all</button>
      <button onClick={() => ds?.clearSelection()}>Clear</button>
      <span>
        {selected.length} selected: [{selected.map((el) => el.dataset.id).join(', ')}]
      </span>
    </div>
  )
}

function Log() {
  const [lines, setLines] = useState([])
  useDragSelectEvent('DS:end', ({ items, isDragging, dropTarget }) => {
    const ids = items.map((el) => el.dataset.id).join(', ') || 'none'
    const msg = isDragging ? `dropped [${ids}] on ${dropTarget?.id ?? 'nothing'}` : `selected [${ids}]`
    setLines((l) => [msg, ...l].slice(0, 50))
  })
  return <pre className="log">{lines.join('\n')}</pre>
}
