'use client'

import { IoArrowBack, IoDownload, IoShare, IoSave } from 'react-icons/io5'
import { SiOpenai } from 'react-icons/si'
import Link from 'next/link'
import { useContext } from 'react'
import { WorkspaceContext, WorkspaceProvider } from '@/contexts/WorkspaceContext'

export default function WorkspaceLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <WorkspaceProvider>
      <WorkspaceContent>{children}</WorkspaceContent>
    </WorkspaceProvider>
  )
}

function WorkspaceContent({ children }: { children: React.ReactNode }) {
  const { mode, setMode } = useContext(WorkspaceContext)

  return (
    <div className="flex flex-col h-screen bg-[#1a1d21]">
      {/* Top Navigation */}
      <nav className="h-14 border-b border-gray-800 flex items-center px-4 justify-between bg-[#1a1d21]">
        <div className="flex items-center gap-4">
          <Link href="/projects" className="text-gray-400 hover:text-white">
            <IoArrowBack className="w-5 h-5" />
          </Link>
          <h1 className="font-semibold text-lg text-white">Untitled Project</h1>
        </div>

        {/* Mode Switcher */}
        <div className="flex gap-2 bg-[#2a2d31] p-1 rounded-lg">
          <button
            onClick={() => setMode('ai')}
            className={`px-4 py-1.5 rounded-md transition-colors ${
              mode === 'ai' ? 'bg-[#4a4d51] text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            <span className="flex items-center gap-2">
              <SiOpenai className="w-4 h-4" />
              AI Mode
            </span>
          </button>
          <button
            onClick={() => setMode('manual')}
            className={`px-4 py-1.5 rounded-md transition-colors ${
              mode === 'manual' ? 'bg-[#4a4d51] text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            Manual
          </button>
          <button
            onClick={() => setMode('hybrid')}
            className={`px-4 py-1.5 rounded-md transition-colors ${
              mode === 'hybrid' ? 'bg-[#4a4d51] text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            Hybrid
          </button>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button className="workspace-button">
            <IoShare className="w-4 h-4" />
            Share
          </button>
          <button className="workspace-button">
            <IoDownload className="w-4 h-4" />
            Export
          </button>
          <button className="workspace-button-primary">
            <IoSave className="w-4 h-4" />
            Save
          </button>
        </div>
      </nav>

      {/* Main Content */}
      {children}
    </div>
  )
} 