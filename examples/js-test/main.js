import DragSelect from 'dragselect'

const grid = document.getElementById('grid')
for (let i = 1; i <= 12; i++) {
  const item = document.createElement('div')
  item.className = 'item'
  item.dataset.id = String(i)
  item.textContent = i
  grid.appendChild(item)
}

const ds = new DragSelect({
  selectables: document.querySelectorAll('.item'),
  area: document.getElementById('area'),
  dropZones: [{ element: document.getElementById('zone'), id: 'zone' }],
})

const count = document.getElementById('count')
const log = document.getElementById('log')
const write = (msg) => (log.textContent = `${msg}\n${log.textContent}`.slice(0, 2000))

ds.subscribe('DS:select', () => (count.textContent = `${ds.getSelection().length} selected`))
ds.subscribe('DS:unselect', () => (count.textContent = `${ds.getSelection().length} selected`))
ds.subscribe('DS:end', ({ items, isDragging, dropTarget }) => {
  const ids = items.map((el) => el.dataset.id).join(', ') || 'none'
  write(isDragging ? `dropped [${ids}] on ${dropTarget?.id ?? 'nothing'}` : `selected [${ids}]`)
})

document.getElementById('select-all').onclick = () => ds.setSelection(ds.getSelectables())
document.getElementById('clear').onclick = () => ds.clearSelection()

window.ds = ds // poke at it from devtools
