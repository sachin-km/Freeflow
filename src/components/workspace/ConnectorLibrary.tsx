'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, ChevronDown } from 'lucide-react'
import { connectorDefinitions, connectorCategories } from '@/lib/connectors/categories'

interface ConnectorLibraryProps {
  onDragStart: (itemId: string) => (e: React.DragEvent<HTMLDivElement>) => void
}

export default function ConnectorLibrary({ onDragStart }: ConnectorLibraryProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [expandedCategories, setExpandedCategories] = useState<string[]>(['basic'])

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev => 
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    )
  }

  const filteredCategories = connectorCategories.map(category => ({
    ...category,
    connectors: category.connectors.filter(connectorId => {
      const connector = connectorDefinitions[connectorId]
      return connector.label.toLowerCase().includes(searchQuery.toLowerCase())
    })
  })).filter(category => category.connectors.length > 0)

  return (
    <div className="flex flex-col h-full">
      {/* Search */}
      <div className="p-4 border-b border-white/10">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
          <input
            type="text"
            placeholder="Search connectors..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-primary-purple"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {filteredCategories.map(category => (
          <div key={category.id} className="rounded-lg bg-white/5">
            <button
              onClick={() => toggleCategory(category.id)}
              className="w-full px-4 py-3 flex items-center justify-between hover:bg-white/5 rounded-lg"
            >
              <span className="font-medium text-white">{category.label}</span>
              <ChevronDown
                className={`w-4 h-4 text-white/60 transition-transform ${
                  expandedCategories.includes(category.id) ? 'rotate-180' : ''
                }`}
              />
            </button>
            
            {expandedCategories.includes(category.id) && (
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: 'auto' }}
                exit={{ height: 0 }}
                className="overflow-hidden"
              >
                <div className="grid grid-cols-2 gap-2 p-4">
                  {category.connectors.map(connectorId => {
                    const connector = connectorDefinitions[connectorId]
                    return (
                      <motion.div
                        key={connectorId}
                        className="aspect-[4/3] bg-white/5 rounded-lg p-4 flex flex-col items-center justify-center cursor-move hover:bg-white/10 transition-colors"
                        draggable
                        onDragStart={onDragStart(connectorId)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <svg
                          viewBox="0 0 100 100"
                          className="w-12 h-12 mb-2"
                          style={{
                            stroke: connector.properties.style.color,
                            strokeWidth: connector.properties.style.width,
                            fill: 'none'
                          }}
                        >
                          <path
                            d={connector.icon}
                            strokeDasharray={
                              connector.properties.style.strokeStyle === 'dashed'
                                ? '8,4'
                                : connector.properties.style.strokeStyle === 'dotted'
                                ? '2,4'
                                : 'none'
                            }
                          />
                        </svg>
                        <span className="text-sm text-white/80 text-center">
                          {connector.label}
                        </span>
                      </motion.div>
                    )
                  })}
                </div>
              </motion.div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
} 