import { ConnectorDefinition } from '@/types/shapes'

export const connectorDefinitions: Record<string, ConnectorDefinition> = {
  // Basic Arrows
  simpleRight: {
    id: 'simpleRight',
    type: 'straight',
    label: 'Right Arrow',
    category: 'basic',
    icon: 'M 10,50 L 80,50 L 70,40 M 80,50 L 70,60',
    isConnector: true,
    properties: {
      type: 'straight',
      style: {
        strokeStyle: 'solid',
        arrowStart: 'none',
        arrowEnd: 'arrow',
        color: 'rgba(255, 255, 255, 0.6)',
        width: 2
      },
      routing: {
        autoRoute: false,
        jumpOver: false,
        smartAnchors: true
      }
    }
  },
  bidirectional: {
    id: 'bidirectional',
    label: 'Bidirectional',
    category: 'basic',
    icon: 'M 10,50 L 90,50 M 20,40 L 10,50 L 20,60 M 80,40 L 90,50 L 80,60',
    properties: {
      type: 'straight',
      style: {
        strokeStyle: 'solid',
        arrowStart: 'arrow',
        arrowEnd: 'arrow',
        color: 'rgba(255, 255, 255, 0.6)',
        width: 2
      },
      routing: {
        autoRoute: false,
        jumpOver: false,
        smartAnchors: true
      }
    }
  },
  curved: {
    id: 'curved',
    label: 'Curved',
    category: 'basic',
    icon: 'M 10,50 C 50,10 50,90 90,50 M 80,40 L 90,50 L 80,60',
    properties: {
      type: 'curved',
      style: {
        strokeStyle: 'solid',
        arrowStart: 'none',
        arrowEnd: 'arrow',
        color: 'rgba(255, 255, 255, 0.6)',
        width: 2
      },
      routing: {
        autoRoute: false,
        jumpOver: false,
        smartAnchors: true
      }
    }
  },
  elbow: {
    id: 'elbow',
    label: 'Elbow',
    category: 'basic',
    icon: 'M 10,30 L 50,30 L 50,70 L 90,70 M 80,60 L 90,70 L 80,80',
    properties: {
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
  },

  // Flow Arrows
  processFlow: {
    id: 'processFlow',
    label: 'Process Flow',
    category: 'flow',
    icon: 'M 10,50 L 80,50 L 70,40 M 80,50 L 70,60',
    properties: {
      type: 'straight',
      style: {
        strokeStyle: 'solid',
        arrowStart: 'none',
        arrowEnd: 'arrow',
        color: 'rgba(255, 255, 255, 0.6)',
        width: 3
      },
      routing: {
        autoRoute: true,
        jumpOver: true,
        smartAnchors: true
      }
    }
  },
  dataFlow: {
    id: 'dataFlow',
    label: 'Data Flow',
    category: 'flow',
    icon: 'M 10,50 L 80,50 L 70,40 M 80,50 L 70,60',
    properties: {
      type: 'straight',
      style: {
        strokeStyle: 'dashed',
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
  },

  // Special Connectors
  association: {
    id: 'association',
    label: 'Association',
    category: 'special',
    icon: 'M 10,50 L 90,50',
    properties: {
      type: 'straight',
      style: {
        strokeStyle: 'solid',
        arrowStart: 'none',
        arrowEnd: 'none',
        color: 'rgba(255, 255, 255, 0.6)',
        width: 2
      },
      routing: {
        autoRoute: false,
        jumpOver: true,
        smartAnchors: true
      }
    }
  },
  inheritance: {
    id: 'inheritance',
    label: 'Inheritance',
    category: 'special',
    icon: 'M 10,50 L 80,50 M 70,30 L 90,50 L 70,70',
    properties: {
      type: 'straight',
      style: {
        strokeStyle: 'solid',
        arrowStart: 'none',
        arrowEnd: 'triangle',
        color: 'rgba(255, 255, 255, 0.6)',
        width: 2
      },
      routing: {
        autoRoute: true,
        jumpOver: true,
        smartAnchors: true
      }
    }
  }
}

export const connectorCategories = [
  {
    id: 'basic',
    label: 'Basic Arrows',
    connectors: ['simpleRight', 'bidirectional', 'curved', 'elbow']
  },
  {
    id: 'flow',
    label: 'Flow Arrows',
    connectors: ['processFlow', 'dataFlow']
  },
  {
    id: 'special',
    label: 'Special Connectors',
    connectors: ['association', 'inheritance']
  }
] 