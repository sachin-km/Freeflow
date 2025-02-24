interface Point {
  x: number
  y: number
}

export const getConnectionPoint = (element: any, handle: string): Point => {
  switch (handle) {
    case 'top':
      return { x: element.x + element.width / 2, y: element.y }
    case 'right':
      return { x: element.x + element.width, y: element.y + element.height / 2 }
    case 'bottom':
      return { x: element.x + element.width / 2, y: element.y + element.height }
    case 'left':
      return { x: element.x, y: element.y + element.height / 2 }
    default:
      return { x: element.x, y: element.y }
  }
}

export const generatePath = (start: Point, end: Point, type: string): string => {
  switch (type) {
    case 'straight':
      return `M ${start.x},${start.y} L ${end.x},${end.y}`
    
    case 'curved':
      const midX = (start.x + end.x) / 2
      return `M ${start.x},${start.y} C ${midX},${start.y} ${midX},${end.y} ${end.x},${end.y}`
    
    case 'orthogonal':
      const midY = (start.y + end.y) / 2
      return `M ${start.x},${start.y} L ${start.x},${midY} L ${end.x},${midY} L ${end.x},${end.y}`
    
    default:
      return `M ${start.x},${start.y} L ${end.x},${end.y}`
  }
} 