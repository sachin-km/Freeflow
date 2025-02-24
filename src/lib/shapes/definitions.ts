import { ShapeDefinition, ConnectorDefinition } from '@/types/shapes'

export const shapeDefinitions: Record<string, ShapeDefinition | ConnectorDefinition> = {
  process: {
    type: 'process',
    label: 'Process',
    description: 'Basic process or action step',
    icon: 'M 10,10 H 90 V 90 H 10 Z',
    category: 'basic',
    defaultProperties: {
      dimensions: { width: 160, height: 80 },
      style: {
        fill: 'rgba(255, 255, 255, 0.1)',
        stroke: 'rgba(255, 255, 255, 0.2)',
        strokeWidth: 2,
        opacity: 1
      },
      text: {
        content: 'Process',
        alignment: 'center',
        fontSize: 14,
        fontFamily: 'Inter',
        color: 'white'
      },
      behavior: {
        resizable: true,
        connectable: true,
        rotatable: false
      }
    }
  },
  decision: {
    type: 'decision',
    label: 'Decision',
    description: 'Decision point or condition',
    icon: 'M 50,10 L 90,50 L 50,90 L 10,50 Z',
    category: 'basic',
    defaultProperties: {
      dimensions: { width: 160, height: 160 },
      style: {
        fill: 'rgba(255, 255, 255, 0.1)',
        stroke: 'rgba(255, 255, 255, 0.2)',
        strokeWidth: 2,
        opacity: 1
      },
      text: {
        content: 'Decision',
        alignment: 'center',
        fontSize: 14,
        fontFamily: 'Inter',
        color: 'white'
      },
      behavior: {
        resizable: true,
        connectable: true,
        rotatable: false
      }
    }
  },
  terminal: {
    type: 'terminal',
    label: 'Terminal',
    description: 'Start or end point',
    icon: 'M 10,50 C 10,27 27,10 50,10 C 73,10 90,27 90,50 C 90,73 73,90 50,90 C 27,90 10,73 10,50',
    category: 'basic',
    defaultProperties: {
      dimensions: { width: 160, height: 80 },
      style: {
        fill: 'rgba(255, 255, 255, 0.1)',
        stroke: 'rgba(255, 255, 255, 0.2)',
        strokeWidth: 2,
        opacity: 1
      },
      text: {
        content: 'Start/End',
        alignment: 'center',
        fontSize: 14,
        fontFamily: 'Inter',
        color: 'white'
      },
      behavior: {
        resizable: true,
        connectable: true,
        rotatable: false
      }
    }
  },
  input: {
    type: 'input',
    label: 'Input/Output',
    description: 'Input or output data',
    icon: 'M 20,10 L 80,10 L 90,50 L 80,90 L 20,90 L 10,50 Z',
    category: 'basic',
    defaultProperties: {
      dimensions: { width: 160, height: 80 },
      style: {
        fill: 'rgba(255, 255, 255, 0.1)',
        stroke: 'rgba(255, 255, 255, 0.2)',
        strokeWidth: 2,
        opacity: 1
      },
      text: {
        content: 'Input/Output',
        alignment: 'center',
        fontSize: 14,
        fontFamily: 'Inter',
        color: 'white'
      },
      behavior: {
        resizable: true,
        connectable: true,
        rotatable: false
      }
    }
  },
  document: {
    type: 'document',
    label: 'Document',
    description: 'Document or report',
    icon: 'M 10,10 H 90 V 70 Q 50,100 10,70 Z',
    category: 'basic',
    defaultProperties: {
      dimensions: { width: 160, height: 100 },
      style: {
        fill: 'rgba(255, 255, 255, 0.1)',
        stroke: 'rgba(255, 255, 255, 0.2)',
        strokeWidth: 2,
        opacity: 1
      },
      text: {
        content: 'Document',
        alignment: 'center',
        fontSize: 14,
        fontFamily: 'Inter',
        color: 'white'
      },
      behavior: {
        resizable: true,
        connectable: true,
        rotatable: false
      }
    }
  },
  data: {
    type: 'data',
    label: 'Data',
    description: 'Data storage',
    icon: 'M 10,30 V 70 C 10,85 90,85 90,70 V 30 C 90,15 10,15 10,30 C 10,45 90,45 90,30',
    category: 'storage',
    defaultProperties: {
      dimensions: { width: 160, height: 100 },
      style: {
        fill: 'rgba(255, 255, 255, 0.1)',
        stroke: 'rgba(255, 255, 255, 0.2)',
        strokeWidth: 2,
        opacity: 1
      },
      text: {
        content: 'Data',
        alignment: 'center',
        fontSize: 14,
        fontFamily: 'Inter',
        color: 'white'
      },
      behavior: {
        resizable: true,
        connectable: true,
        rotatable: false
      }
    }
  },
  predefinedProcess: {
    type: 'predefinedProcess',
    label: 'Predefined Process',
    description: 'Predefined process or subroutine',
    icon: 'M 10,10 H 90 V 90 H 10 Z M 20,10 V 90 M 80,10 V 90',
    category: 'basic',
    defaultProperties: {
      dimensions: { width: 160, height: 80 },
      style: {
        fill: 'rgba(255, 255, 255, 0.1)',
        stroke: 'rgba(255, 255, 255, 0.2)',
        strokeWidth: 2,
        opacity: 1
      },
      text: {
        content: 'Predefined',
        alignment: 'center',
        fontSize: 14,
        fontFamily: 'Inter',
        color: 'white'
      },
      behavior: {
        resizable: true,
        connectable: true,
        rotatable: false
      }
    }
  },
  preparation: {
    type: 'preparation',
    label: 'Preparation',
    description: 'Preparation step',
    icon: 'M 10,50 L 30,10 H 70 L 90,50 L 70,90 H 30 Z',
    category: 'basic',
    defaultProperties: {
      dimensions: { width: 160, height: 80 },
      style: {
        fill: 'rgba(255, 255, 255, 0.1)',
        stroke: 'rgba(255, 255, 255, 0.2)',
        strokeWidth: 2,
        opacity: 1
      },
      text: {
        content: 'Preparation',
        alignment: 'center',
        fontSize: 14,
        fontFamily: 'Inter',
        color: 'white'
      },
      behavior: {
        resizable: true,
        connectable: true,
        rotatable: false
      }
    }
  },
  swimlane: {
    type: 'swimlane',
    label: 'Swimlane',
    description: 'Vertical or horizontal swimlane',
    icon: 'M 10,10 H 90 V 90 H 10 Z M 50,10 V 90',
    category: 'containers',
    defaultProperties: {
      dimensions: { width: 800, height: 400 },
      style: {
        fill: 'rgba(255, 255, 255, 0.05)',
        stroke: 'rgba(255, 255, 255, 0.2)',
        strokeWidth: 2,
        opacity: 1
      },
      text: {
        content: 'Swimlane',
        alignment: 'left',
        fontSize: 14,
        fontFamily: 'Inter',
        color: 'white'
      },
      behavior: {
        resizable: true,
        connectable: false,
        rotatable: false,
        container: true
      }
    }
  },
  container: {
    type: 'container',
    label: 'Container',
    description: 'Group container',
    icon: 'M 10,20 H 90 V 90 H 10 Z M 10,10 H 70',
    category: 'containers',
    defaultProperties: {
      dimensions: { width: 320, height: 240 },
      style: {
        fill: 'rgba(255, 255, 255, 0.05)',
        stroke: 'rgba(255, 255, 255, 0.2)',
        strokeWidth: 2,
        opacity: 1
      },
      text: {
        content: 'Container',
        alignment: 'left',
        fontSize: 14,
        fontFamily: 'Inter',
        color: 'white'
      },
      behavior: {
        resizable: true,
        connectable: false,
        rotatable: false,
        container: true
      }
    }
  },
  note: {
    type: 'note',
    label: 'Note',
    description: 'Comment or note',
    icon: 'M 10,10 H 70 L 90,30 V 90 H 10 Z M 70,10 V 30 H 90',
    category: 'annotations',
    defaultProperties: {
      dimensions: { width: 200, height: 120 },
      style: {
        fill: 'rgba(255, 255, 255, 0.05)',
        stroke: 'rgba(255, 255, 255, 0.2)',
        strokeWidth: 2,
        opacity: 1
      },
      text: {
        content: 'Note',
        alignment: 'left',
        fontSize: 14,
        fontFamily: 'Inter',
        color: 'white'
      },
      behavior: {
        resizable: true,
        connectable: true,
        rotatable: false
      }
    }
  },
  manualOperation: {
    type: 'manualOperation',
    label: 'Manual Operation',
    description: 'Manual operation or user interaction',
    icon: 'M 10,30 L 30,10 H 90 L 70,90 H 10 L 30,70 Z',
    category: 'basic',
    defaultProperties: {
      dimensions: { width: 160, height: 80 },
      style: {
        fill: 'rgba(255, 255, 255, 0.1)',
        stroke: 'rgba(255, 255, 255, 0.2)',
        strokeWidth: 2,
        opacity: 1
      },
      text: {
        content: 'Manual',
        alignment: 'center',
        fontSize: 14,
        fontFamily: 'Inter',
        color: 'white'
      },
      behavior: {
        resizable: true,
        connectable: true,
        rotatable: false
      }
    }
  },
  display: {
    type: 'display',
    label: 'Display',
    description: 'Display or output',
    icon: 'M 10,50 C 10,10 90,10 90,50 C 90,90 10,90 10,50',
    category: 'basic',
    defaultProperties: {
      dimensions: { width: 160, height: 80 },
      style: {
        fill: 'rgba(255, 255, 255, 0.1)',
        stroke: 'rgba(255, 255, 255, 0.2)',
        strokeWidth: 2,
        opacity: 1
      },
      text: {
        content: 'Display',
        alignment: 'center',
        fontSize: 14,
        fontFamily: 'Inter',
        color: 'white'
      },
      behavior: {
        resizable: true,
        connectable: true,
        rotatable: false
      }
    }
  },
  manualInput: {
    type: 'manualInput',
    label: 'Manual Input',
    description: 'Manual data input',
    icon: 'M 10,90 H 90 L 90,30 L 50,10 L 10,30 Z',
    category: 'basic',
    defaultProperties: {
      dimensions: { width: 160, height: 80 },
      style: {
        fill: 'rgba(255, 255, 255, 0.1)',
        stroke: 'rgba(255, 255, 255, 0.2)',
        strokeWidth: 2,
        opacity: 1
      },
      text: {
        content: 'Input',
        alignment: 'center',
        fontSize: 14,
        fontFamily: 'Inter',
        color: 'white'
      },
      behavior: {
        resizable: true,
        connectable: true,
        rotatable: false
      }
    }
  },
  delay: {
    type: 'delay',
    label: 'Delay',
    description: 'Process delay or wait',
    icon: 'M 10,10 H 70 Q 90,50 70,90 H 10 V 10',
    category: 'specialized',
    defaultProperties: {
      dimensions: { width: 120, height: 80 },
      style: {
        fill: 'rgba(255, 255, 255, 0.1)',
        stroke: 'rgba(255, 255, 255, 0.2)',
        strokeWidth: 2,
        opacity: 1
      },
      text: {
        content: 'Delay',
        alignment: 'center',
        fontSize: 14,
        fontFamily: 'Inter',
        color: 'white'
      },
      behavior: {
        resizable: true,
        connectable: true,
        rotatable: false
      }
    }
  },
  merge: {
    type: 'merge',
    label: 'Merge',
    description: 'Merge or combine',
    icon: 'M 50,10 L 90,50 L 50,90 L 10,50 Z',
    category: 'specialized',
    defaultProperties: {
      dimensions: { width: 100, height: 100 },
      style: {
        fill: 'rgba(255, 255, 255, 0.1)',
        stroke: 'rgba(255, 255, 255, 0.2)',
        strokeWidth: 2,
        opacity: 1
      },
      text: {
        content: 'Merge',
        alignment: 'center',
        fontSize: 14,
        fontFamily: 'Inter',
        color: 'white'
      },
      behavior: {
        resizable: true,
        connectable: true,
        rotatable: true
      }
    }
  },
  cloud: {
    type: 'cloud',
    label: 'Cloud',
    description: 'External process or system',
    icon: 'M 25,60 C 10,60 10,30 25,30 C 25,10 60,10 60,30 C 80,20 95,35 85,50 C 95,65 80,80 60,70 C 60,90 25,90 25,70 C 10,70 10,60 25,60',
    category: 'specialized',
    defaultProperties: {
      dimensions: { width: 160, height: 100 },
      style: {
        fill: 'rgba(255, 255, 255, 0.1)',
        stroke: 'rgba(255, 255, 255, 0.2)',
        strokeWidth: 2,
        opacity: 1
      },
      text: {
        content: 'External',
        alignment: 'center',
        fontSize: 14,
        fontFamily: 'Inter',
        color: 'white'
      },
      behavior: {
        resizable: true,
        connectable: true,
        rotatable: false
      }
    }
  },
  simpleArrow: {
    id: 'simpleArrow',
    type: 'straight',
    label: 'Arrow',
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
    type: 'straight',
    label: 'Bidirectional',
    category: 'basic',
    icon: 'M 10,50 L 90,50 M 20,40 L 10,50 L 20,60 M 80,40 L 90,50 L 80,60',
    isConnector: true,
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
  dataFlow: {
    id: 'dataFlow',
    type: 'orthogonal',
    label: 'Data Flow',
    category: 'storage',
    icon: 'M 10,50 L 80,50 L 70,40 M 80,50 L 70,60',
    isConnector: true,
    properties: {
      type: 'orthogonal',
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
  containerFlow: {
    id: 'containerFlow',
    type: 'orthogonal',
    label: 'Container Flow',
    category: 'containers',
    icon: 'M 10,30 L 50,30 L 50,70 L 90,70 M 80,60 L 90,70 L 80,80',
    isConnector: true,
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
  inheritance: {
    id: 'inheritance',
    type: 'straight',
    label: 'Inheritance',
    category: 'specialized',
    icon: 'M 10,50 L 80,50 M 70,30 L 90,50 L 70,70',
    isConnector: true,
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

export const shapeCategories = [
  {
    id: 'basic',
    label: 'Basic Shapes',
    shapes: [
      'process', 
      'decision', 
      'terminal', 
      'input', 
      'document', 
      'predefinedProcess',
      'preparation',
      'manualOperation',
      'display',
      'manualInput'
    ]
  },
  {
    id: 'arrows',
    label: 'Arrows & Connectors',
    shapes: [
      'simpleArrow',
      'bidirectional'
    ]
  },
  {
    id: 'storage',
    label: 'Storage & Data Flow',
    shapes: [
      'data',
      'dataFlow'
    ]
  },
  {
    id: 'containers',
    label: 'Containers & Groups',
    shapes: [
      'swimlane',
      'container',
      'containerFlow'
    ]
  },
  {
    id: 'specialized',
    label: 'Specialized Elements',
    shapes: [
      'inheritance',
      'cloud',
      'note',
      'delay',
      'merge'
    ]
  }
] 