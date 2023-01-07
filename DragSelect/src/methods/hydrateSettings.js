/**
 * @param {string} key
 * @param {string} type
 * @param {*} fallback
 * @returns {void}
 */
const wrongTypeWarn = (key, type, fallback) =>
  console.warn(
    `[DragSelect] TypeIssue: setting "${key}" is not of type "${type}".`
  )

/**
 * @param {string} key
 * @param {*} value
 * @param {boolean} withFallback
 * @param {*} fallback
 * @returns {object}
 */
const hydrateHelper = (key, value, withFallback, fallback) => {
  // no value available
  if (value === undefined) return withFallback ? { [key]: fallback } : {}
  // force unsetting of a value
  if (value === null) return { [key]: null }

  // TypeCheck [GENERIC]
  let isAvailable = true // if it’s not undefined, it was set voluntarily
  let forceFallback = false

  // TypeCheck [String]
  const expectedString = typeof fallback === 'string'
  if (expectedString)
    isAvailable = typeof value === 'string' || value instanceof String
  if (expectedString && !isAvailable) {
    forceFallback = true
    wrongTypeWarn(key, 'string', fallback)
  }

  // TypeCheck [Number]
  const expectedNumber = !Number.isNaN(fallback) && typeof fallback === 'number'
  if (expectedNumber)
    isAvailable = !Number.isNaN(value) && typeof value === 'number'
  if (expectedNumber && !isAvailable) {
    forceFallback = true
    wrongTypeWarn(key, 'number', fallback)
  }

  // TypeCheck [Object]
  const expectedObject =
    Object.prototype.toString.call(fallback) === '[object Object]'
  if (expectedObject)
    isAvailable = Object.prototype.toString.call(value) === '[object Object]'
  if (expectedObject && !isAvailable) {
    forceFallback = true
    wrongTypeWarn(key, 'object', fallback)
  }

  // TypeCheck [Boolean]
  const expectedBoolean = typeof fallback === 'boolean'
  if (expectedBoolean) isAvailable = typeof value === 'boolean'
  if (expectedBoolean && !isAvailable) {
    forceFallback = true
    wrongTypeWarn(key, 'boolean', fallback)
  }

  // TypeCheck [Array]
  const expectedArray = Array.isArray(fallback)
  if (expectedArray) isAvailable = Array.isArray(value)
  if (expectedArray && !isAvailable) {
    forceFallback = true
    wrongTypeWarn(key, 'array', fallback)
  }

  const isFallback = forceFallback || withFallback

  // Special rule for [dragKeys]
  if (key === 'dragKeys' && isAvailable)
    return { [key]: Object.assign(fallback, value) }
  if (key === 'dragKeys' && !isAvailable)
    return isFallback ? { [key]: fallback } : {}

  // Special rule for [dropZones]
  if (
    key === 'dropZones' &&
    isAvailable &&
    new Set(value.map((v) => v.id)).size !== value.length
  )
    console.warn(
      `[DragSelect] UniqueConstraintsIssue: setting "dropZones" contains duplicate ids.`
    )

  if (isAvailable) return { [key]: value }
  if (isFallback) return { [key]: fallback }
  return {}
}

/**
 * This helper method creates the setting object,
 * - if the settings provided are of wrong type, the fallback value will be used
 * - - except for if settings are undefined or explicitly marked as "null"
 * - if "withfallback" is true, it will return the object with all settings:
 * - - if not provided from the settings object (or wrong type), the fallback will be used
 * (the fallback value for each setting is the last prop of the hydrateHelper)
 * @param {Settings} settings
 * @param {boolean} withFallback
 */
export default (settings, withFallback) => ({
  ...hydrateHelper('area', settings.area, withFallback, document),
  ...hydrateHelper('selectables', settings.selectables, withFallback, null),
  ...hydrateHelper(
    'autoScrollSpeed',
    settings.autoScrollSpeed,
    withFallback,
    5
  ),
  ...hydrateHelper(
    'overflowTolerance',
    settings.overflowTolerance,
    withFallback,
    { x: 25, y: 25 }
  ),
  ...hydrateHelper('zoom', settings.zoom, withFallback, 1),
  ...hydrateHelper('customStyles', settings.customStyles, withFallback, false),
  ...hydrateHelper(
    'multiSelectMode',
    settings.multiSelectMode,
    withFallback,
    false
  ),
  ...hydrateHelper(
    'multiSelectToggling',
    settings.multiSelectToggling,
    withFallback,
    true
  ),
  ...hydrateHelper('multiSelectKeys', settings.multiSelectKeys, withFallback, [
    'Control',
    'Shift',
    'Meta',
  ]),
  ...hydrateHelper('selector', settings.selector, withFallback, null),
  ...hydrateHelper(
    'selectionThreshold',
    settings.selectionThreshold,
    withFallback,
    0
  ),
  ...hydrateHelper('draggability', settings.draggability, withFallback, true),
  ...hydrateHelper('immediateDrag', settings.immediateDrag, withFallback, true),
  ...hydrateHelper('keyboardDrag', settings.keyboardDrag, withFallback, true),
  ...hydrateHelper('dragKeys', settings.dragKeys, withFallback, {
    up: ['ArrowUp'],
    down: ['ArrowDown'],
    left: ['ArrowLeft'],
    right: ['ArrowRight'],
  }),
  ...hydrateHelper(
    'keyboardDragSpeed',
    settings.keyboardDragSpeed,
    withFallback,
    10
  ),
  ...hydrateHelper('useTransform', settings.useTransform, withFallback, true),
  ...hydrateHelper(
    'refreshMemoryRate',
    settings.refreshMemoryRate,
    withFallback,
    80
  ),
  ...hydrateHelper('dropZones', settings.dropZones, withFallback, []),
  ...hydrateHelper(
    'dropInsideThreshold',
    settings.dropInsideThreshold,
    withFallback,
    1
  ),
  ...hydrateHelper(
    'dropTargetThreshold',
    settings.dropTargetThreshold,
    withFallback,
    0
  ),
  ...hydrateHelper(
    'usePointerEvents',
    settings.usePointerEvents,
    withFallback,
    false
  ),
  ...hydrateHelper('hoverClass', settings.hoverClass, withFallback, 'ds-hover'),
  ...hydrateHelper(
    'selectableClass',
    settings.selectableClass,
    withFallback,
    'ds-selectable'
  ),
  ...hydrateHelper(
    'selectedClass',
    settings.selectedClass,
    withFallback,
    'ds-selected'
  ),
  ...hydrateHelper(
    'selectorClass',
    settings.selectorClass,
    withFallback,
    'ds-selector'
  ),
  ...hydrateHelper(
    'selectorAreaClass',
    settings.selectorAreaClass,
    withFallback,
    'ds-selector-area'
  ),
  ...hydrateHelper(
    'droppedTargetClass',
    settings.droppedTargetClass,
    withFallback,
    'ds-dropped-target'
  ),
  ...hydrateHelper(
    'droppedInsideClass',
    settings.droppedInsideClass,
    withFallback,
    'ds-dropped-inside'
  ),
  ...hydrateHelper(
    'droppableClass',
    settings.droppableClass,
    withFallback,
    'ds-droppable'
  ),
  ...hydrateHelper(
    'dropZoneClass',
    settings.dropZoneClass,
    withFallback,
    'ds-dropzone'
  ),
  ...hydrateHelper(
    'dropZoneReadyClass',
    settings.dropZoneReadyClass,
    withFallback,
    'ds-dropzone-ready'
  ),
  ...hydrateHelper(
    'dropZoneTargetClass',
    settings.dropZoneTargetClass,
    withFallback,
    'ds-dropzone-target'
  ),
  ...hydrateHelper(
    'dropZoneInsideClass',
    settings.dropZoneInsideClass,
    withFallback,
    'ds-dropzone-inside'
  ),
  ...hydrateHelper('dragAsBlock', settings.dragAsBlock, withFallback, false),
})
