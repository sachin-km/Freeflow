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
  isConnector?: boolean
} 