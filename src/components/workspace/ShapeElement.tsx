import React from 'react'
import { Shape as ShapeType } from '@/types'

interface ShapeElementProps {
  type: ShapeType['type']
}

export function ShapeElement({ type }: ShapeElementProps) {
  switch (type) {
    case 'rectangle':
      return (
        <div className="w-24 h-16 bg-blue-500 rounded" />
      )
    case 'circle':
      return (
        <div className="w-20 h-20 bg-green-500 rounded-full" />
      )
    case 'diamond':
      return (
        <div className="w-20 h-20 bg-purple-500 rotate-45" />
      )
    default:
      return null
  }
} 