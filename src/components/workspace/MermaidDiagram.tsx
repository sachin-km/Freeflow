'use client'

import { useEffect, useRef, useState } from 'react'

interface MermaidDiagramProps {
  code: string
  scale?: number
}

export function MermaidDiagram({ code, scale = 1 }: MermaidDiagramProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [svgContent, setSvgContent] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  useEffect(() => {
    const initializeMermaid = async () => {
      setIsLoading(true)
      setError(null)
      
      try {
        const mermaid = (await import('mermaid')).default
        mermaid.initialize({
          startOnLoad: true,
          theme: 'default',
          securityLevel: 'loose',
        })
        
        if (code.trim()) {
          const { svg } = await mermaid.render('mermaid-diagram', code)
          setSvgContent(svg)
        }
      } catch (error) {
        console.error('Failed to initialize or render mermaid:', error)
        setError('Failed to generate diagram. Please try again.')
      } finally {
        setIsLoading(false)
      }
    }
    
    initializeMermaid()
  }, [code])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full text-red-500">
        {error}
      </div>
    )
  }

  return (
    <div 
      ref={containerRef}
      className="mermaid-container w-full h-full overflow-auto"
      style={{
        transform: `scale(${scale})`,
        transformOrigin: 'center center'
      }}
      dangerouslySetInnerHTML={{ __html: svgContent }}
    />
  )
} 