'use client'

import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Loader2, ArrowLeft, Sparkles } from 'lucide-react'

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

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

export default function VerifyPage() {
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [isLoading, setIsLoading] = useState(false)
  const inputs = useRef<(HTMLInputElement | null)[]>([])
  const router = useRouter()

  const handleChange = (element: HTMLInputElement, index: number) => {
    if (isNaN(Number(element.value))) return false

    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))])

    if (element.value && index < 5) {
      inputs.current[index + 1]?.focus()
    }

    if (index === 5 && element.value) {
      handleSubmit()
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputs.current[index - 1]?.focus()
    }
  }

  const handleSubmit = async () => {
    try {
      setIsLoading(true)
      await new Promise(resolve => setTimeout(resolve, 2000))
      toast.success('Successfully verified!')
      router.push('/dashboard')
    } catch (error) {
      toast.error('Invalid verification code')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-deep via-primary-purple to-primary-deep overflow-hidden relative">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-white/5 rounded-full"
            style={{
              width: Math.random() * 300 + 50,
              height: Math.random() * 300 + 50,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [1, 1.2, 1],
              x: [0, Math.random() * 100 - 50, 0],
              y: [0, Math.random() * 100 - 50, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>

      <motion.div 
        className="relative z-10 flex items-center justify-center min-h-screen p-4"
        initial="initial"
        animate="animate"
        variants={stagger}
      >
        <div className="w-full max-w-md">
          <motion.div 
            className="backdrop-blur-xl bg-white/10 rounded-2xl shadow-2xl p-8 border border-white/20"
            variants={fadeInUp}
          >
            <motion.button
              variants={fadeInUp}
              onClick={() => router.back()}
              className="text-white/80 hover:text-white flex items-center gap-2 mb-8 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to login
            </motion.button>

            <motion.div variants={fadeInUp} className="text-center mb-8">
              <h1 className="text-4xl font-bold text-white mb-2 flex items-center justify-center gap-2">
                Verify Email <Sparkles className="w-6 h-6 text-yellow-300" />
              </h1>
              <p className="text-white/80">
                Enter the verification code sent to your email
              </p>
            </motion.div>

            <motion.div variants={fadeInUp} className="flex gap-2 mb-8 justify-center">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength={1}
                  ref={el => inputs.current[index] = el}
                  value={digit}
                  onChange={e => handleChange(e.target, index)}
                  onKeyDown={e => handleKeyDown(e, index)}
                  className="w-12 h-14 text-center bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-primary-purple focus:border-transparent text-white text-lg backdrop-blur-sm transition-all"
                  disabled={isLoading}
                />
              ))}
            </motion.div>

            <motion.div variants={fadeInUp} className="space-y-4">
              <button
                onClick={handleSubmit}
                disabled={isLoading || otp.some(digit => !digit)}
                className="w-full bg-white/10 hover:bg-white/20 text-white py-3 px-4 rounded-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] backdrop-blur-sm border border-white/20 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin mx-auto" />
                ) : (
                  'Verify'
                )}
              </button>

              <button
                onClick={() => toast.success('New code sent!')}
                disabled={isLoading}
                className="w-full text-white/80 hover:text-white py-2 transition-colors text-sm"
              >
                Resend code
              </button>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
} 