'use client'

import { motion } from 'framer-motion'
import { FileIcon, Clock, ArrowRight, Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 }
}

export default function RecentsPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleNewProject = async () => {
    try {
      setIsLoading(true)
      const projectId = Math.random().toString(36).substr(2, 9)
      console.log('Navigating to:', `/workspace/${projectId}`)
      await router.push(`/workspace/${projectId}`)
    } catch (error) {
      console.error('Navigation error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={{ animate: { transition: { staggerChildren: 0.1 } } }}
      className="space-y-8"
    >
      <motion.div variants={fadeInUp}>
        <h1 className="text-3xl font-bold text-white mb-2">Recent Projects</h1>
        <p className="text-white/60">Access your recently edited flowcharts</p>
      </motion.div>

      {/* Empty State */}
      <motion.div
        variants={fadeInUp}
        className="bg-white/10 backdrop-blur-xl rounded-xl border border-white/20 p-12 text-center"
      >
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/5 mb-4">
          <Clock className="w-8 h-8 text-white/40" />
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">No recent projects</h3>
        <p className="text-white/60 mb-6">
          Your recently edited projects will appear here
        </p>
        <motion.button
          onClick={handleNewProject}
          disabled={isLoading}
          className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          whileHover={{ scale: isLoading ? 1 : 1.02 }}
          whileTap={{ scale: isLoading ? 1 : 0.98 }}
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Creating...
            </>
          ) : (
            <>
              Create New Project
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </motion.button>
      </motion.div>
    </motion.div>
  )
} 