'use client'

import { motion } from 'framer-motion'
import { Users, UserPlus, Mail } from 'lucide-react'

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
}

export default function TeamPage() {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={{ animate: { transition: { staggerChildren: 0.1 } } }}
      className="space-y-8"
    >
      <motion.div variants={fadeInUp}>
        <h1 className="text-3xl font-bold text-white mb-2">Your Team</h1>
        <p className="text-white/60">Collaborate with your team members</p>
      </motion.div>

      <motion.div
        variants={fadeInUp}
        className="bg-white/10 backdrop-blur-xl rounded-xl border border-white/20 p-8"
      >
        <div className="max-w-md mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/5 mb-4">
            <Users className="w-8 h-8 text-white/40" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">Build Your Team</h3>
          <p className="text-white/60 mb-6">
            Invite team members to collaborate on your flowcharts in real-time
          </p>
          
          <div className="space-y-4">
            <motion.button
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <UserPlus className="w-4 h-4" />
              Invite Team Members
            </motion.button>
            
            <motion.button
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 bg-transparent hover:bg-white/5 rounded-lg text-white/60 hover:text-white transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Mail className="w-4 h-4" />
              Send Invitation Link
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
} 