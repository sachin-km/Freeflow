import { ConnectorProperties } from '@/types/shapes'

export const connectorTypes = {
  straight: {
    id: 'straight',
    label: 'Straight',
    description: 'Direct line connection'
  },
  curved: {
    id: 'curved',
    label: 'Curved',
    description: 'Smooth curved connection'
  },
  orthogonal: {
    id: 'orthogonal',
    label: 'Orthogonal',
    description: 'Right-angled connection'
  },
  smartOrthogonal: {
    id: 'smartOrthogonal',
    label: 'Smart Orthogonal',
    description: 'Auto-routing orthogonal connection'
  }
}

export const arrowStyles = {
  none: {
    id: 'none',
    label: 'None',
    path: ''
  },
  arrow: {
    id: 'arrow',
    label: 'Arrow',
    path: 'M -10,-5 L 0,0 L -10,5'
  },
  circle: {
    id: 'circle',
    label: 'Circle',
    path: 'M -6,0 A 6,6 0 1,0 6,0 A 6,6 0 1,0 -6,0'
  },
  diamond: {
    id: 'diamond',
    label: 'Diamond',
    path: 'M -10,0 L 0,-5 L 10,0 L 0,5 Z'
  }
}

export const defaultConnectorProperties: ConnectorProperties = {
  type: 'orthogonal',
  style: {
    strokeStyle: 'solid',
    arrowStart: 'none',
    arrowEnd: 'arrow',
    color: 'rgba(255, 255, 255, 0.6)',
    width: 2
  },
  routing: {
    autoRoute: true,
    jumpOver: true,
    smartAnchors: true
  }
} 