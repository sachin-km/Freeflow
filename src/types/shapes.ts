export type ShapeType = 
  | 'process'
  | 'decision'
  | 'terminal'
  | 'input'
  | 'document'
  | 'data'
  | 'predefinedProcess'
  | 'manualOperation'
  | 'preparation'
  | 'display'
  | 'manualInput'
  | 'storedData'
  | 'container'
  | 'swimlane'

export type ConnectorType = 
  | 'straight'
  | 'curved'
  | 'orthogonal'
  | 'smartOrthogonal'

export type ArrowStyle = 
  | 'none'
  | 'arrow'
  | 'circle'
  | 'diamond'

export interface ShapeProperties {
  dimensions: {
    width: number
    height: number
  }
  style: {
    fill: string
    stroke: string
    strokeWidth: number
    opacity: number
    dashArray?: string
  }
  text: {
    content: string
    alignment: 'left' | 'center' | 'right'
    fontSize: number
    fontFamily: string
    color: string
  }
  behavior: {
    resizable: boolean
    connectable: boolean
    rotatable: boolean
    container?: boolean
  }
}

export interface ConnectorProperties {
  type: ConnectorType
  style: {
    strokeStyle: 'solid' | 'dashed' | 'dotted'
    arrowStart: ArrowStyle
    arrowEnd: ArrowStyle
    color: string
    width: number
  }
  routing: {
    autoRoute: boolean
    jumpOver: boolean
    smartAnchors: boolean
  }
}

export type ConnectorCategory = 
  | 'basic'
  | 'storage'
  | 'container'
  | 'specialized'

export interface ConnectorDefinition {
  id: string
  type: ConnectorType
  label: string
  description?: string
  category: ConnectorCategory
  icon: string
  properties: ConnectorProperties
  isConnector: true // To distinguish from regular shapes
}

export interface ShapeCategory {
  id: string
  label: string
  shapes: ShapeDefinition[]
}

export interface ShapeDefinition {
  type: ShapeType
  label: string
  description?: string
  icon: string
  category: string
  defaultProperties: ShapeProperties
  isConnector?: false // Default shapes are not connectors
} 