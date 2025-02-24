import { useState, useCallback } from 'react'

export default function useUndoRedo<T>(initialState: T) {
  const [history, setHistory] = useState<T[]>([initialState])
  const [currentIndex, setCurrentIndex] = useState(0)

  const addToHistory = useCallback((state: T) => {
    setHistory(prev => {
      const newHistory = prev.slice(0, currentIndex + 1)
      return [...newHistory, state]
    })
    setCurrentIndex(prev => prev + 1)
  }, [currentIndex])

  const undo = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1)
      return history[currentIndex - 1]
    }
    return history[currentIndex]
  }, [currentIndex, history])

  const redo = useCallback(() => {
    if (currentIndex < history.length - 1) {
      setCurrentIndex(prev => prev + 1)
      return history[currentIndex + 1]
    }
    return history[currentIndex]
  }, [currentIndex, history])

  return { addToHistory, undo, redo }
} 