'use client'

import { useState, useContext } from 'react'
import { MermaidDiagram } from '@/components/workspace/MermaidDiagram'
import { FlowchartChat } from '@/components/workspace/FlowchartChat'
import { SiOpenai } from 'react-icons/si'
import { WorkspaceContext } from '@/contexts/WorkspaceContext'
import { HiChevronDown } from 'react-icons/hi'

interface Props {
  params: {
    projectId: string
  }
}

export default function Workspace({ params }: Props) {
  const { mode } = useContext(WorkspaceContext)
  const [mermaidCode, setMermaidCode] = useState('')
  const [scale, setScale] = useState(1)
  const [activeTab, setActiveTab] = useState<'shapes' | 'connectors'>('shapes')

  const handleZoom = (delta: number) => {
    setScale(prev => Math.max(0.1, Math.min(2, prev + delta)))
  }

  return (
    <div className="flex flex-1 overflow-hidden">
      {/* Left Sidebar - Only show in manual or hybrid mode */}
      {mode !== 'ai' && (
        <div className="w-[240px] bg-[#1a1d21] border-r border-gray-800">
          <div className="flex p-2 gap-2">
            <button 
              onClick={() => setActiveTab('shapes')}
              className={`flex-1 py-1.5 rounded-md text-sm transition-colors ${
                activeTab === 'shapes' ? 'bg-[#2a2d31] text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              Shapes
            </button>
            <button 
              onClick={() => setActiveTab('connectors')}
              className={`flex-1 py-1.5 rounded-md text-sm transition-colors ${
                activeTab === 'connectors' ? 'bg-[#2a2d31] text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              Connectors
            </button>
          </div>
          
          <div className="p-2">
            <input
              type="text"
              placeholder="Search shapes..."
              className="w-full bg-[#2a2d31] border-none rounded-md py-2 px-3 text-sm text-gray-300 placeholder-gray-500"
            />
          </div>

          {/* Shape Categories */}
          <div className="px-2 py-1">
            <button className="w-full flex items-center justify-between p-2 text-gray-300 hover:bg-[#2a2d31] rounded-md">
              <span className="text-sm">Basic Shapes</span>
              <HiChevronDown className="w-4 h-4" />
            </button>
            {/* Add more categories as needed */}
          </div>

          {/* Shape/Connector Library Content */}
          <div className="p-2 grid grid-cols-2 gap-2">
            {activeTab === 'shapes' ? (
              <>
                <div className="aspect-square bg-[#2a2d31] rounded-lg p-4 flex items-center justify-center cursor-pointer hover:bg-[#3a3d41] transition-colors">
                  <div className="w-12 h-12 border-2 border-gray-400 rounded" />
                </div>
                <div className="aspect-square bg-[#2a2d31] rounded-lg p-4 flex items-center justify-center cursor-pointer hover:bg-[#3a3d41] transition-colors">
                  <div className="w-12 h-12 border-2 border-gray-400 rounded-full" />
                </div>
                <div className="aspect-square bg-[#2a2d31] rounded-lg p-4 flex items-center justify-center cursor-pointer hover:bg-[#3a3d41] transition-colors">
                  <div className="w-12 h-12 border-2 border-gray-400 rotate-45" />
                </div>
                <div className="aspect-square bg-[#2a2d31] rounded-lg p-4 flex items-center justify-center cursor-pointer hover:bg-[#3a3d41] transition-colors">
                  <div className="w-12 h-8 border-2 border-gray-400 rounded-lg" />
                </div>
              </>
            ) : (
              <>
                {/* Connector options would go here */}
              </>
            )}
          </div>
        </div>
      )}

      {/* Canvas Area */}
      <div className="flex-1 relative bg-[#1a1d21]">
        <div className="absolute top-4 right-4 flex gap-2 z-10">
          <button
            onClick={() => handleZoom(0.1)}
            className="p-2 bg-[#2a2d31] text-white rounded-lg hover:bg-[#3a3d41] transition-colors"
          >
            +
          </button>
          <button
            onClick={() => handleZoom(-0.1)}
            className="p-2 bg-[#2a2d31] text-white rounded-lg hover:bg-[#3a3d41] transition-colors"
          >
            -
          </button>
        </div>
        <MermaidDiagram code={mermaidCode} scale={scale} />
      </div>

      {/* Right Panel - AI Chat */}
      <div className="w-[400px] bg-[#1a1d21] border-l border-gray-800">
        <div className="h-full flex flex-col">
          <div className="p-4 border-b border-gray-800 flex items-center gap-2">
            <SiOpenai className="w-5 h-5 text-purple-400" />
            <h2 className="font-semibold text-white">AI Assistant</h2>
          </div>
          <FlowchartChat onGenerateFlowchart={setMermaidCode} />
        </div>
      </div>
    </div>
  )
} 