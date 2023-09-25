// heavily inspired by https://kentcdodds.com/blog/how-to-use-react-context-effectively
import React, { createContext, useState, useEffect, useContext } from 'react'
import DragSelect, { DSInputElement } from 'dragselect'
export * from 'dragselect'

// export type dropZones = ConstructorParameters<typeof DragSelect>[0]['dropZones']
type ProviderProps = {
  children: React.ReactNode
  settings?: ConstructorParameters<typeof DragSelect>[0]
}

const Context = createContext<DragSelect<DSInputElement> | undefined>(undefined)

function DragSelectProvider({ children, settings = {} }: ProviderProps) {
  const [ds, setDS] = useState<DragSelect<DSInputElement>>()

  useEffect(() => {
    setDS((prevState) => {
      if (prevState) return prevState
      return new DragSelect({})
    })
    return () => {
      if (ds) {
        ds.stop()
        setDS(undefined)
      }
    }
  }, [ds])

  useEffect(() => {
    ds?.setSettings(settings)
  }, [ds, settings])

  return <Context.Provider value={ds}>{children}</Context.Provider>
}

function useDragSelect() {
  const context = useContext(Context)
  return context
}

export { DragSelectProvider, useDragSelect }
