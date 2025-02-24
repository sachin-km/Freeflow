'use client'

import ConnectorLibrary from './ConnectorLibrary'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, ChevronDown, Clock, Star, Settings2 } from 'lucide-react'
import { shapeDefinitions, shapeCategories } from '@/lib/shapes/definitions'
import { connectorDefinitions } from '@/lib/connectors/categories'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { ShapePreview } from './ShapePreview'

export default function ShapeLibrary() {
  const [searchQuery, setSearchQuery] = useState('')
  const [expandedCategories, setExpandedCategories] = useState<string[]>(['basic'])
  const [recentShapes, setRecentShapes] = useState<string[]>([])
  const [activeTab, setActiveTab] = useState('shapes')

  const addToRecent = (itemId: string) => {
    setRecentShapes(prev => {
      const newRecent = [itemId, ...prev.filter(id => id !== itemId)]
      return newRecent.slice(0, 8) // Keep only last 8 items
    })
  }

  const handleDragStart = (itemId: string) => (e: React.DragEvent<HTMLDivElement>) => {
    const item = shapeDefinitions[itemId] || connectorDefinitions[itemId]
    if (!item) return

    addToRecent(itemId)
    
    const dragData = {
      type: itemId,
      properties: 'isConnector' in item ? item.properties : item.defaultProperties,
      icon: item.icon,
      isConnector: 'isConnector' in item
    }

    e.dataTransfer.setData('application/json', JSON.stringify(dragData))
    e.dataTransfer.effectAllowed = 'move'
  }

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev => 
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    )
  }

  return (
    <div className="h-full flex flex-col bg-gray-900/50 backdrop-blur-xl border-r border-white/10">
      <Tabs defaultValue="shapes" className="w-full">
        <TabsList className="w-full grid grid-cols-2 bg-transparent border-b border-white/10">
          <TabsTrigger 
            value="shapes"
            className="data-[state=active]:bg-white/10"
          >
            Shapes
          </TabsTrigger>
          <TabsTrigger 
            value="connectors"
            className="data-[state=active]:bg-white/10"
          >
            Connectors
          </TabsTrigger>
        </TabsList>

        <TabsContent value="shapes" className="flex-1 flex flex-col">
          {/* Search */}
          <div className="p-4 border-b border-white/10">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
              <input
                type="text"
                placeholder="Search shapes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-primary-purple"
              />
            </div>
          </div>

          {/* Categories */}
          <div className="flex-1 overflow-y-auto">
            {shapeCategories.map(category => (
              <ShapeCategory 
                key={category.id}
                category={category}
                searchQuery={searchQuery}
                isExpanded={expandedCategories.includes(category.id)}
                onToggle={() => toggleCategory(category.id)}
                onDragStart={handleDragStart}
              />
            ))}
          </div>

          {/* Recent Shapes */}
          {recentShapes.length > 0 && (
            <div className="p-4 border-t border-white/10">
              <div className="flex items-center gap-2 mb-3">
                <Clock className="w-4 h-4 text-white/60" />
                <h3 className="text-sm font-medium text-white/60">Recently Used</h3>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {recentShapes.map(itemId => (
                  <ShapePreview 
                    key={itemId}
                    itemId={itemId}
                    onDragStart={handleDragStart}
                    size="small"
                  />
                ))}
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="connectors">
          {/* Connector styles and types */}
          <ConnectorLibrary onDragStart={handleDragStart} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

// Add these new components
function ShapeCategory({ category, searchQuery, isExpanded, onToggle, onDragStart }) {
  const filteredShapes = category.shapes.filter(itemId => {
    const item = shapeDefinitions[itemId]
    return item.label.toLowerCase().includes(searchQuery.toLowerCase())
  })

  if (filteredShapes.length === 0) return null

  return (
    <div className="border-b border-white/10">
      <button
        onClick={onToggle}
        className="w-full px-4 py-3 flex items-center justify-between hover:bg-white/5"
      >
        <span className="font-medium text-white">{category.label}</span>
        <ChevronDown
          className={`w-4 h-4 text-white/60 transition-transform ${
            isExpanded ? 'rotate-180' : ''
          }`}
        />
      </button>
      
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-2 gap-2 p-4">
              {filteredShapes.map(itemId => (
                <ShapePreview 
                  key={itemId}
                  itemId={itemId}
                  onDragStart={onDragStart}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
} 