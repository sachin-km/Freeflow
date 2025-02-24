'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShapeDefinition, ConnectorDefinition } from '@/types/shapes'
import { useHotkeys } from 'react-hotkeys-hook'
import useUndoRedo from '@/hooks/useUndoRedo'
import { nanoid } from 'nanoid'
import { getConnectionPoint, generatePath } from '@/lib/utils/connectors'

interface CanvasElement {
  id: string
  type: string
  x: number
  y: number
  width: number
  height: number
  rotation: number
  text: string
  properties: any
  isEditing?: boolean
  isConnector: boolean
}

interface CanvasProps {
  gridSize?: number
  snapToGrid?: boolean
}

export default function Canvas({ gridSize = 20, snapToGrid = true }: CanvasProps) {
  const canvasRef = useRef<HTMLDivElement>(null)
  const [elements, setElements] = useState<CanvasElement[]>([])
  const [selectedElements, setSelectedElements] = useState<string[]>([])
  const [draggedElement, setDraggedElement] = useState<CanvasElement | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [selectionBox, setSelectionBox] = useState<{ start: { x: number; y: number } | null, end: { x: number; y: number } | null }>({
    start: null,
    end: null
  })
  const [connecting, setConnecting] = useState<{
    sourceId: string;
    sourceHandle: string;
    mousePosition: { x: number; y: number };
  } | null>(null);
  const [connectors, setConnectors] = useState<{
    id: string;
    sourceId: string;
    targetId: string;
    sourceHandle: string;
    targetHandle: string;
    type: string;
  }[]>([]);
  const [resizing, setResizing] = useState<{
    elementId: string
    handle: string
    startWidth: number
    startHeight: number
    startX: number
    startY: number
    startMouseX: number
    startMouseY: number
  } | null>(null)

  const { addToHistory, undo, redo } = useUndoRedo(elements)

  // Grid calculation
  const getSnappedPosition = useCallback((x: number, y: number) => {
    if (!snapToGrid) return { x, y }
    return {
      x: Math.round(x / gridSize) * gridSize,
      y: Math.round(y / gridSize) * gridSize
    }
  }, [gridSize, snapToGrid])

  // Handle element drop from sidebar
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    
    try {
      const data = e.dataTransfer.getData('application/json')
      if (!data) return
      
      const elementData = JSON.parse(data)
      const rect = canvasRef.current?.getBoundingClientRect()
      if (!rect) return

      const position = getSnappedPosition(
        e.clientX - rect.left,
        e.clientY - rect.top
      )

      const newElement: CanvasElement = {
        id: nanoid(),
        type: elementData.type,
        x: position.x,
        y: position.y,
        width: elementData.isConnector ? 100 : (elementData.properties?.dimensions?.width || 160),
        height: elementData.isConnector ? 40 : (elementData.properties?.dimensions?.height || 80),
        rotation: 0,
        text: elementData.isConnector ? '' : 'Double click to edit',
        properties: {
          ...elementData.properties,
          icon: elementData.icon,
          style: elementData.properties.style
        },
        isEditing: false,
        isConnector: elementData.isConnector
      }

      setElements(prev => {
        const updated = [...prev, newElement]
        addToHistory(updated)
        return updated
      })
    } catch (error) {
      console.error('Error handling drop:', error)
    }
  }, [getSnappedPosition, addToHistory])

  // Handle element dragging on canvas
  const handleElementDrag = useCallback((id: string, deltaX: number, deltaY: number) => {
    if (!canvasRef.current) return

    const rect = canvasRef.current.getBoundingClientRect()
    
    setElements(prev => {
      const updated = prev.map(el => {
        if (selectedElements.includes(el.id)) {
          const newX = el.x + deltaX
          const newY = el.y + deltaY
          
          const { x, y } = getSnappedPosition(newX, newY)
          
          return { ...el, x, y }
        }
        return el
      })
      return updated
    })
  }, [selectedElements, getSnappedPosition])

  // Selection box handling
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (e.button !== 0) return // Left click only
    
    const rect = canvasRef.current?.getBoundingClientRect()
    if (!rect) return

    const start = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    }

    // Check if clicking on an element
    const clickedElement = elements.find(el => {
      return (
        e.clientX - rect.left >= el.x &&
        e.clientX - rect.left <= el.x + el.width &&
        e.clientY - rect.top >= el.y &&
        e.clientY - rect.top <= el.y + el.height
      )
    })

    if (clickedElement) {
      if (!selectedElements.includes(clickedElement.id) && !e.shiftKey) {
        setSelectedElements([clickedElement.id])
      }
      setDraggedElement(clickedElement)
      setIsDragging(true)
    } else {
      setSelectionBox({ start, end: start })
      if (!e.shiftKey) {
        setSelectedElements([])
      }
    }
  }, [elements, selectedElements])

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const rect = canvasRef.current?.getBoundingClientRect()
    if (!rect) return

    if (isDragging && draggedElement) {
      const deltaX = e.clientX - rect.left - draggedElement.x
      const deltaY = e.clientY - rect.top - draggedElement.y
      
      setElements(prev => prev.map(el => {
        if (selectedElements.includes(el.id)) {
          const newX = el.x + deltaX
          const newY = el.y + deltaY
          const { x, y } = getSnappedPosition(newX, newY)
          return { ...el, x, y }
        }
        return el
      }))
    } else if (selectionBox.start) {
      setSelectionBox(prev => ({
        start: prev.start,
        end: {
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        }
      }))
    }
  }, [isDragging, draggedElement, selectedElements, selectionBox.start, getSnappedPosition])

  const handleMouseUp = useCallback(() => {
    if (isDragging) {
      setIsDragging(false)
      setDraggedElement(null)
      addToHistory(elements)
    }

    if (selectionBox.start && selectionBox.end) {
      const box = {
        left: Math.min(selectionBox.start.x, selectionBox.end.x),
        right: Math.max(selectionBox.start.x, selectionBox.end.x),
        top: Math.min(selectionBox.start.y, selectionBox.end.y),
        bottom: Math.max(selectionBox.start.y, selectionBox.end.y)
      }

      const selectedIds = elements.filter(el => {
        const elementBox = {
          left: el.x,
          right: el.x + el.width,
          top: el.y,
          bottom: el.y + el.height
        }

        return (
          elementBox.left < box.right &&
          elementBox.right > box.left &&
          elementBox.top < box.bottom &&
          elementBox.bottom > box.top
        )
      }).map(el => el.id)

      setSelectedElements(prev => 
        [...new Set([...prev, ...selectedIds])]
      )
      setSelectionBox({ start: null, end: null })
    }
  }, [isDragging, selectionBox, elements, addToHistory])

  // Keyboard shortcuts
  useHotkeys('ctrl+z', (e) => {
    e.preventDefault()
    undo()
  }, [undo])

  useHotkeys('ctrl+y', (e) => {
    e.preventDefault()
    redo()
  }, [redo])

  useHotkeys('delete', () => {
    setElements(prev => {
      const updated = prev.filter(el => !selectedElements.includes(el.id))
      addToHistory(updated)
      return updated
    })
    setSelectedElements([])
  }, [selectedElements, addToHistory])

  // Handle text editing
  const handleDoubleClick = (id: string) => {
    setElements(prev => prev.map(el => 
      el.id === id ? { ...el, isEditing: true } : el
    ))
  }

  const handleTextChange = (id: string, text: string) => {
    setElements(prev => prev.map(el => 
      el.id === id ? { ...el, text } : el
    ))
  }

  const handleTextBlur = (id: string) => {
    setElements(prev => {
      const updated = prev.map(el => 
        el.id === id ? { ...el, isEditing: false } : el
      )
      addToHistory(updated)
      return updated
    })
  }

  // Update the onClick handler in the element rendering
  const handleElementClick = (e: React.MouseEvent, element: CanvasElement) => {
    e.stopPropagation()
    
    if (!e.shiftKey) {
      setSelectedElements([element.id])
    } else {
      setSelectedElements(prev => 
        prev.includes(element.id)
          ? prev.filter(id => id !== element.id)
          : [...prev, element.id]
      )
    }
  }

  // Add canvas click handler to deselect
  const handleCanvasClick = () => {
    setSelectedElements([])
  }

  // Add connection points to shapes
  const renderConnectionPoints = (element: CanvasElement) => {
    const points = ['top', 'right', 'bottom', 'left'];
    
    return points.map(position => (
      <div
        key={`${element.id}-${position}`}
        className={`absolute w-3 h-3 bg-white/20 border-2 border-white rounded-full hover:bg-primary-purple hover:scale-125 transition-all ${
          position === 'top' ? 'top-0 left-1/2 -translate-x-1/2 -translate-y-1/2' :
          position === 'right' ? 'right-0 top-1/2 translate-x-1/2 -translate-y-1/2' :
          position === 'bottom' ? 'bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2' :
          'left-0 top-1/2 -translate-x-1/2 -translate-y-1/2'
        }`}
        onMouseDown={(e) => {
          e.stopPropagation();
          setConnecting({
            sourceId: element.id,
            sourceHandle: position,
            mousePosition: { x: e.clientX, y: e.clientY }
          });
        }}
        onMouseUp={(e) => {
          e.stopPropagation();
          if (connecting && connecting.sourceId !== element.id) {
            // Create new connector
            const newConnector = {
              id: nanoid(),
              sourceId: connecting.sourceId,
              targetId: element.id,
              sourceHandle: connecting.sourceHandle,
              targetHandle: position,
              type: 'straight' // or 'curved', 'orthogonal'
            };
            setConnectors(prev => [...prev, newConnector]);
          }
          setConnecting(null);
        }}
      />
    ));
  };

  // Update the resize handling functions
  const handleResizeStart = (e: React.MouseEvent, element: CanvasElement, handle: string) => {
    e.preventDefault()
    e.stopPropagation()
    
    setResizing({
      elementId: element.id,
      handle,
      startWidth: element.width,
      startHeight: element.height,
      startX: element.x,
      startY: element.y,
      startMouseX: e.clientX,
      startMouseY: e.clientY
    })

    // Add global event listeners
    window.addEventListener('mousemove', handleResize)
    window.addEventListener('mouseup', handleResizeEnd)
  }

  const handleResize = useCallback((e: MouseEvent) => {
    if (!resizing || !canvasRef.current) return

    const element = elements.find(el => el.id === resizing.elementId)
    if (!element) return

    const deltaX = e.clientX - resizing.startMouseX
    const deltaY = e.clientY - resizing.startMouseY

    const newSize = { width: resizing.startWidth, height: resizing.startHeight }
    const newPosition = { x: resizing.startX, y: resizing.startY }

    // Update size and position based on handle
    if (resizing.handle.includes('e')) newSize.width += deltaX
    if (resizing.handle.includes('w')) {
      newSize.width -= deltaX
      newPosition.x += deltaX
    }
    if (resizing.handle.includes('s')) newSize.height += deltaY
    if (resizing.handle.includes('n')) {
      newSize.height -= deltaY
      newPosition.y += deltaY
    }

    // Enforce minimum size
    const minSize = 40
    newSize.width = Math.max(minSize, newSize.width)
    newSize.height = Math.max(minSize, newSize.height)

    // Snap to grid if enabled
    if (snapToGrid) {
      newSize.width = Math.round(newSize.width / gridSize) * gridSize
      newSize.height = Math.round(newSize.height / gridSize) * gridSize
      newPosition.x = Math.round(newPosition.x / gridSize) * gridSize
      newPosition.y = Math.round(newPosition.y / gridSize) * gridSize
    }

    setElements(prev => prev.map(el => 
      el.id === resizing.elementId
        ? { 
            ...el, 
            width: newSize.width,
            height: newSize.height,
            x: newPosition.x,
            y: newPosition.y
          }
        : el
    ))
  }, [resizing, elements, snapToGrid, gridSize])

  const handleResizeEnd = useCallback((e?: MouseEvent) => {
    if (!resizing) return
    
    // Remove global event listeners
    window.removeEventListener('mousemove', handleResize)
    window.removeEventListener('mouseup', handleResizeEnd)
    
    setElements(prev => {
      const updated = prev.map(el => 
        el.id === resizing.elementId
          ? {
              ...el,
              width: Math.max(40, el.width),
              height: Math.max(40, el.height)
            }
          : el
      )
      addToHistory(updated)
      return updated
    })
    
    setResizing(null)
  }, [resizing, handleResize, addToHistory])

  // Update renderResizeHandles to handle connectors differently
  const renderResizeHandles = (element: CanvasElement) => {
    if (!selectedElements.includes(element.id)) return null
    
    if (element.isConnector) {
      return (
        <>
          <div
            className="absolute w-3 h-3 bg-white/20 border border-white rounded-full hover:bg-primary-purple"
            style={{
              cursor: 'ew-resize',
              left: '-6px',
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 1001
            }}
            onMouseDown={(e) => {
              e.stopPropagation()
              handleResizeStart(e, element, 'w')
            }}
          />
          <div
            className="absolute w-3 h-3 bg-white/20 border border-white rounded-full hover:bg-primary-purple"
            style={{
              cursor: 'ew-resize',
              right: '-6px',
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 1001
            }}
            onMouseDown={(e) => {
              e.stopPropagation()
              handleResizeStart(e, element, 'e')
            }}
          />
        </>
      )
    }

    const handles = ['nw', 'n', 'ne', 'e', 'se', 's', 'sw', 'w']
    return handles.map(handle => (
      <div
        key={`${element.id}-${handle}`}
        className="absolute w-3 h-3 bg-white/20 border border-white rounded-sm hover:bg-primary-purple"
        style={{
          cursor: `${handle}-resize`,
          ...(handle.includes('n') && { top: '-6px' }),
          ...(handle.includes('s') && { bottom: '-6px' }),
          ...(handle.includes('w') && { left: '-6px' }),
          ...(handle.includes('e') && { right: '-6px' }),
          ...(handle === 'n' && { left: '50%', transform: 'translateX(-50%)' }),
          ...(handle === 's' && { left: '50%', transform: 'translateX(-50%)' }),
          ...(handle === 'w' && { top: '50%', transform: 'translateY(-50%)' }),
          ...(handle === 'e' && { top: '50%', transform: 'translateY(-50%)' }),
          zIndex: 1001
        }}
        onMouseDown={(e) => {
          e.stopPropagation()
          handleResizeStart(e, element, handle)
        }}
      />
    ))
  }

  // Render shape based on type
  const renderShape = (element: CanvasElement) => {
    if (element.isConnector) {
      return (
        <div className="relative w-full h-full">
          <svg 
            width="100%" 
            height="100%" 
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            style={{ overflow: 'visible' }}
          >
            <path
              d={element.properties.icon}
              stroke={element.properties.style.color}
              strokeWidth={element.properties.style.width}
              fill="none"
              strokeDasharray={
                element.properties.style.strokeStyle === 'dashed'
                  ? '8,4'
                  : undefined
              }
              markerEnd={element.type !== 'bidirectional' ? 'url(#arrowhead)' : undefined}
              markerStart={element.type === 'bidirectional' ? 'url(#arrowhead-start)' : undefined}
            />
          </svg>
        </div>
      )
    }

    // For regular shapes
    return (
      <div className="relative w-full h-full">
        <svg 
          width="100%" 
          height="100%" 
          viewBox="0 0 100 100" 
          preserveAspectRatio="none"
        >
          <path
            d={element.properties.icon}
            fill={element.properties.style.fill}
            stroke={element.properties.style.stroke}
            strokeWidth={element.properties.style.strokeWidth}
          />
        </svg>
        
        {!element.isConnector && (
          element.isEditing ? (
            <textarea
              className="absolute inset-0 bg-transparent text-white text-center resize-none p-2 focus:outline-none"
              value={element.text}
              onChange={(e) => handleTextChange(element.id, e.target.value)}
              onBlur={() => handleTextBlur(element.id)}
              autoFocus
            />
          ) : (
            <div
              className="absolute inset-0 flex items-center justify-center text-white p-2 select-none"
              onDoubleClick={() => handleDoubleClick(element.id)}
            >
              {element.text}
            </div>
          )
        )}
      </div>
    )
  }

  // Add mouse event listeners
  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove)
      window.addEventListener('mouseup', () => {
        setIsDragging(false)
        setDraggedElement(null)
        addToHistory(elements)
      })
      
      return () => {
        window.removeEventListener('mousemove', handleMouseMove)
        window.removeEventListener('mouseup', () => {
          setIsDragging(false)
          setDraggedElement(null)
        })
      }
    }
  }, [isDragging, handleMouseMove, elements, addToHistory])

  return (
    <div
      ref={canvasRef}
      className="w-full h-full relative bg-gray-900"
      onDragOver={e => e.preventDefault()}
      onDrop={handleDrop}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onClick={handleCanvasClick}
    >
      {/* Add SVG Definitions for markers */}
      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <defs>
          <marker
            id="arrowhead"
            markerWidth="12"
            markerHeight="8"
            refX="10"
            refY="4"
            orient="auto"
            markerUnits="userSpaceOnUse"
          >
            <path d="M0,0 L0,8 L12,4 z" fill="rgba(255, 255, 255, 0.6)" />
          </marker>
          <marker
            id="arrowhead-start"
            markerWidth="12"
            markerHeight="8"
            refX="2"
            refY="4"
            orient="auto-start-reverse"
            markerUnits="userSpaceOnUse"
          >
            <path d="M0,0 L0,8 L12,4 z" fill="rgba(255, 255, 255, 0.6)" />
          </marker>
        </defs>
      </svg>

      {/* Grid */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="w-full h-full" style={{
          backgroundImage: `linear-gradient(to right, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
                           linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px)`,
          backgroundSize: `${gridSize}px ${gridSize}px`
        }} />
      </div>

      {/* Elements */}
      <AnimatePresence>
        {elements.map(element => (
          <motion.div
            key={element.id}
            className={`absolute ${selectedElements.includes(element.id) ? 'ring-2 ring-primary-purple' : ''}`}
            style={{
              left: element.x,
              top: element.y,
              width: element.width,
              height: element.height,
              transform: `rotate(${element.rotation}deg)`,
              cursor: isDragging ? 'grabbing' : 'grab',
              touchAction: 'none',
              position: 'absolute',
              userSelect: 'none',
              zIndex: selectedElements.includes(element.id) ? 1000 : 1
            }}
            initial={false}
            animate={{
              left: element.x,
              top: element.y,
              scale: 1,
              opacity: 1
            }}
            transition={{
              type: 'spring',
              stiffness: 500,
              damping: 30,
              mass: 1
            }}
            onClick={(e) => {
              e.stopPropagation()
              handleElementClick(e, element)
            }}
            onDoubleClick={() => {
              if (!element.isConnector) {
                handleDoubleClick(element.id)
              }
            }}
          >
            {renderShape(element)}
            {!element.isConnector && renderConnectionPoints(element)}
            {renderResizeHandles(element)}
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Selection Box */}
      {selectionBox.start && selectionBox.end && (
        <div
          className="absolute border-2 border-primary-purple bg-primary-purple/20 pointer-events-none"
          style={{
            left: Math.min(selectionBox.start.x, selectionBox.end.x),
            top: Math.min(selectionBox.start.y, selectionBox.end.y),
            width: Math.abs(selectionBox.end.x - selectionBox.start.x),
            height: Math.abs(selectionBox.end.y - selectionBox.start.y)
          }}
        />
      )}

      {/* Connectors */}
      {connectors.map(connector => {
        const source = elements.find(el => el.id === connector.sourceId);
        const target = elements.find(el => el.id === connector.targetId);
        if (!source || !target) return null;

        const sourcePoint = getConnectionPoint(source, connector.sourceHandle);
        const targetPoint = getConnectionPoint(target, connector.targetHandle);

        return (
          <svg
            key={connector.id}
            className="absolute top-0 left-0 w-full h-full pointer-events-none"
            style={{ zIndex: 0 }}
          >
            <path
              d={generatePath(sourcePoint, targetPoint, connector.type)}
              stroke="white"
              strokeWidth="2"
              fill="none"
              markerEnd="url(#arrowhead)"
            />
          </svg>
        );
      })}

      {/* Temporary connector while dragging */}
      {connecting && (
        <svg
          className="absolute top-0 left-0 w-full h-full pointer-events-none"
          style={{ zIndex: 1000 }}
        >
          <path
            d={generatePath(
              getConnectionPoint(
                elements.find(el => el.id === connecting.sourceId)!,
                connecting.sourceHandle
              ),
              { x: connecting.mousePosition.x, y: connecting.mousePosition.y },
              'straight'
            )}
            stroke="white"
            strokeWidth="2"
            strokeDasharray="5,5"
            fill="none"
          />
        </svg>
      )}
    </div>
  )
}