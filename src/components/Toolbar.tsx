import React from 'react';

interface ToolbarProps {
  onToolChange: (tool: 'select' | 'pan' | 'connect') => void;
  currentTool: string;
}

// ... rest of the Toolbar code 