'use client'

import { createContext, useState, ReactNode } from 'react'

type WorkspaceMode = 'ai' | 'manual' | 'hybrid'

interface WorkspaceContextType {
  mode: WorkspaceMode
  setMode: (mode: WorkspaceMode) => void
}

export const WorkspaceContext = createContext<WorkspaceContextType>({
  mode: 'ai',
  setMode: () => {}
})

export function WorkspaceProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<WorkspaceMode>('ai')

  return (
    <WorkspaceContext.Provider value={{ mode, setMode }}>
      {children}
    </WorkspaceContext.Provider>
  )
} 