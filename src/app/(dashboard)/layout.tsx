'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Home, 
  Clock, 
  FolderKanban, 
  Users, 
  ChevronLeft, 
  PlusCircle,
  MessageSquareMore,
  LogOut
} from 'lucide-react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'

const navItems = [
  { icon: Home, label: 'Home', href: '/dashboard' },
  { icon: Clock, label: 'Recents', href: '/dashboard/recents' },
  { icon: FolderKanban, label: 'Your Projects', href: '/dashboard/projects' },
  { icon: Users, label: 'Your Team', href: '/dashboard/team' },
]

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = () => {
    router.push('/auth/login')
  }

  const handleNewProject = () => {
    // Generate a unique project ID - in production this would come from your backend
    const projectId = Math.random().toString(36).substr(2, 9)
    router.push(`/workspace/${projectId}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-deep to-primary-purple">
      {/* Sidebar */}
      <motion.div 
        className={`fixed left-0 top-0 h-full bg-white/10 backdrop-blur-xl border-r border-white/20 transition-all duration-300 ${
          isCollapsed ? 'w-20' : 'w-64'
        }`}
        initial={false}
      >
        <div className="p-4">
          <motion.button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="absolute right-[-12px] top-8 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full p-1"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronLeft className={`w-4 h-4 text-white transition-transform ${
              isCollapsed ? 'rotate-180' : ''
            }`} />
          </motion.button>

          {/* New Project Button */}
          <motion.button
            onClick={handleNewProject}
            className="w-full bg-gradient-to-r from-primary-purple to-[#06B6D4] text-white rounded-lg p-3 flex items-center gap-2 mb-8"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <PlusCircle className="w-5 h-5" />
            {!isCollapsed && <span>New Project</span>}
          </motion.button>

          {/* Navigation Items */}
          <nav className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href

              return (
                <Link key={item.href} href={item.href}>
                  <motion.div
                    className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                      isActive 
                        ? 'bg-white/20 text-white' 
                        : 'text-white/70 hover:bg-white/10'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Icon className="w-5 h-5" />
                    {!isCollapsed && <span>{item.label}</span>}
                  </motion.div>
                </Link>
              )
            })}
          </nav>
        </div>

        {/* Add Logout Button */}
        <motion.button
          onClick={handleLogout}
          className={`p-4 flex items-center gap-3 text-white/70 hover:text-white hover:bg-white/10 transition-colors ${
            isCollapsed ? 'justify-center' : ''
          }`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <LogOut className="w-5 h-5" />
          {!isCollapsed && <span>Logout</span>}
        </motion.button>
      </motion.div>

      {/* Main Content */}
      <div className={`transition-all duration-300 ${
        isCollapsed ? 'ml-20' : 'ml-64'
      }`}>
        <main className="p-8">
          {children}
        </main>
      </div>

      {/* AI Assistant Chat Bubble */}
      <motion.button
        className="fixed bottom-8 right-8 bg-gradient-to-r from-primary-purple to-[#06B6D4] text-white rounded-full p-4 shadow-lg"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <MessageSquareMore className="w-6 h-6" />
      </motion.button>
    </div>
  )
} 