import React, { createContext, useContext, useState } from 'react'

type AppState = {
  user?: { id?: string; name?: string }
}

type StoreTuple = [AppState, React.Dispatch<React.SetStateAction<AppState>>]

const StoreContext = createContext<StoreTuple | undefined>(undefined)

export const useStore = (): StoreTuple => {
  const ctx = useContext(StoreContext)
  if (!ctx) {
    throw new Error('useStore must be used within StoreProvider')
  }
  return ctx
}

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AppState>({})
  return <StoreContext.Provider value={[state, setState]}>{children}</StoreContext.Provider>
}
