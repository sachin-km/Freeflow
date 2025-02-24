import { shapeDefinitions } from '@/lib/shapes/definitions'
import { connectorDefinitions } from '@/lib/connectors/categories'
import { cn } from '@/lib/utils'

interface ShapePreviewProps {
  itemId: string
  onDragStart: (itemId: string) => (e: React.DragEvent<HTMLDivElement>) => void
  size?: 'small' | 'normal'
}

export function ShapePreview({ itemId, onDragStart, size = 'normal' }: ShapePreviewProps) {
  const item = shapeDefinitions[itemId] || connectorDefinitions[itemId]
  if (!item) return null

  const isConnector = 'isConnector' in item

  const getStyles = () => {
    if (isConnector) {
      return {
        stroke: item.properties?.style?.color || 'rgba(255, 255, 255, 0.6)',
        strokeWidth: item.properties?.style?.width || 2,
        fill: 'none'
      }
    }

    // For shapes, use default styles if properties are not defined
    const defaultStyles = {
      fill: 'rgba(255, 255, 255, 0.1)',
      stroke: 'rgba(255, 255, 255, 0.6)',
      strokeWidth: 2
    }

    return {
      fill: item.defaultProperties?.style?.fill || defaultStyles.fill,
      stroke: item.defaultProperties?.style?.stroke || defaultStyles.stroke,
      strokeWidth: item.defaultProperties?.style?.strokeWidth || defaultStyles.strokeWidth
    }
  }
  
  return (
    <div
      className={cn(
        "bg-white/5 rounded-lg p-4 flex flex-col items-center justify-center cursor-move hover:bg-white/10 transition-colors",
        size === 'small' ? 'aspect-square' : 'aspect-[4/3]'
      )}
      draggable
      onDragStart={onDragStart(itemId)}
    >
      <svg
        viewBox="0 0 100 100"
        className={size === 'small' ? 'w-8 h-8' : 'w-12 h-12 mb-2'}
        style={getStyles()}
      >
        <path
          d={item.icon}
          strokeDasharray={
            isConnector && item.properties?.style?.strokeStyle === 'dashed'
              ? '8,4'
              : undefined
          }
        />
      </svg>
      {size === 'normal' && (
        <span className="text-sm text-white/80 text-center">
          {item.label}
        </span>
      )}
    </div>
  )
} 