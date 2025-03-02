'use client'

import { motion } from 'framer-motion'
import { FolderKanban, Plus, ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'

const fadeInUp = {
  initial: { 
    opacity: 0, 
    y: 20 
  },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5 }
  }
}

export default function ProjectsPage() {
  const router = useRouter()

  const handleNewProject = () => {
    const projectId = Math.random().toString(36).substr(2, 9)
    router.push(`/workspace/${projectId}`)
  }

  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={{ animate: { transition: { staggerChildren: 0.1 } } }}
      className="space-y-8"
    >
      <motion.div variants={fadeInUp}>
        <h1 className="text-3xl font-bold text-white mb-2">Your Projects</h1>
        <p className="text-white/60">Manage all your flowchart projects</p>
      </motion.div>

      <motion.div
        variants={fadeInUp}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {/* New Project Card */}
        <motion.div
          onClick={handleNewProject}
          className="aspect-video bg-white/10 backdrop-blur-xl rounded-xl border border-white/20 p-6 flex flex-col items-center justify-center cursor-pointer group"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-4 group-hover:bg-white/10 transition-colors">
            <Plus className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">Create New Project</h3>
          <p className="text-white/60 text-sm text-center">
            Start a new flowchart from scratch
          </p>
        </motion.div>

        {/* Empty State */}
        <motion.div
          onClick={handleNewProject}
          className="aspect-video bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-white/10 transition-colors"
          variants={fadeInUp}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-4">
            <FolderKanban className="w-6 h-6 text-white/40" />
          </div>
          <p className="text-white/40 text-sm text-center">
            No projects yet - Click to create one
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  )
} 