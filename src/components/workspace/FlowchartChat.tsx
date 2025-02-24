'use client'

import { useState, useRef, useEffect } from 'react'
import { IoSend } from 'react-icons/io5'
import { FiEdit2 } from 'react-icons/hi'

interface Message {
  id: string
  type: 'user' | 'assistant'
  content: string
  mermaidCode?: string
}

interface FlowchartChatProps {
  onGenerateFlowchart: (mermaidCode: string) => void
}

export function FlowchartChat({ onGenerateFlowchart }: FlowchartChatProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      type: 'assistant',
      content: 'Hi! I can help you create flowcharts. Please describe what kind of flowchart you want to create.'
    }
  ])
  const [isLoading, setIsLoading] = useState(false)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: crypto.randomUUID(),
      type: 'user',
      content: input
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/generate-flowchart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: input,
          context: messages.map(msg => ({
            role: msg.type === 'user' ? 'user' : 'assistant',
            content: msg.content + (msg.mermaidCode ? `\n${msg.mermaidCode}` : '')
          }))
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to generate flowchart')
      }

      const { mermaidCode } = await response.json()

      const assistantMessage: Message = {
        id: crypto.randomUUID(),
        type: 'assistant',
        content: "I've created your flowchart. You can ask for any modifications if needed.",
        mermaidCode
      }

      setMessages(prev => [...prev, assistantMessage])
      onGenerateFlowchart(mermaidCode)
    } catch (error) {
      console.error('Failed:', error)
      setMessages(prev => [...prev, {
        id: crypto.randomUUID(),
        type: 'assistant',
        content: 'Sorry, I encountered an error while generating the flowchart. Please try again.'
      }])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col h-full">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-4 min-h-full">
          {messages.map(message => (
            <div
              key={message.id}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-3 relative group ${
                  message.type === 'user'
                    ? 'bg-purple-500 text-white'
                    : 'bg-[#2a2d31] text-gray-200'
                }`}
              >
                <div className="whitespace-pre-wrap">{message.content}</div>
                {message.mermaidCode && (
                  <div className="mt-2 p-2 bg-[#1a1d21] rounded text-xs font-mono overflow-x-auto">
                    {message.mermaidCode}
                  </div>
                )}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-[#2a2d31] rounded-lg p-3">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area - Fixed at bottom */}
      <div className="border-t border-gray-800 bg-[#1a1d21]">
        <form onSubmit={handleSubmit} className="p-4">
          <div className="relative">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  handleSubmit(e)
                }
              }}
              placeholder="Describe your flowchart in natural language..."
              className="w-full p-3 pr-12 rounded-lg bg-[#2a2d31] border-none text-gray-200 placeholder-gray-500 resize-none focus:ring-2 focus:ring-purple-500 focus:outline-none"
              rows={3}
            />
            <button
              type="submit"
              disabled={isLoading}
              className="absolute right-3 bottom-3 p-2 text-purple-400 hover:text-purple-300 disabled:opacity-50 transition-colors"
            >
              <IoSend className="w-5 h-5" />
            </button>
          </div>
        </form>
      </div>
    </div>
  )
} 