export interface Shape {
  id: string;
  type: 'rectangle' | 'circle' | 'diamond';
  x: number;
  y: number;
  width?: number;
  height?: number;
} 