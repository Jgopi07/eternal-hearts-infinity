'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart } from 'lucide-react'
import { useGameStore } from '@/lib/game-store'

export function SplashScreen() {
  const { setScreen } = useGameStore()

  const [progress, setProgress] = useState(0)
  const [showContinue, setShowContinue] = useState(false)

  const [particles, setParticles] = useState<
    {
      id: number
      left: string
      top: string
      size: number
      duration: number
      delay: number
    }[]
  >([])

  useEffect(() => {
    const generatedParticles = Array.from({ length: 55 }, (_, i) => ({
      id: i,
      left: `${(i * 8.2) % 100}%`,
      top: `${(i * 12.4) % 100}%`,
      size: (i % 3) + 2,
      duration: 3 + (i % 4),
      delay: i * 0.06
    }))

    setParticles(generatedParticles)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setShowContinue(true)
          return 100
        }

        return prev + 1
      })
    }, 35)

    return () => clearInterval(interval)
  }, [])

  const handleContinue = () => {
    setScreen('menu')
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="fixed inset-0 overflow-hidden bg-black"
    >
     <div
  className="absolute inset-0 bg-cover bg-center bg-no-repeat"
  style={{
    backgroundImage: "url('/backgrounds/romance-bg.jpeg')"
  }}
/>

<div className="absolute inset-0 bg-black/60" />

<div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/40" />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(244,63,94,0.2),transparent_40%)]" />

      <div className="absolute inset-0 overflow-hidden">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-white"
            style={{
              left: particle.left,
              top: particle.top,
              width: particle.size,
              height: particle.size
            }}
            animate={{
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.4, 1]
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay
            }}
          />
        ))}
      </div>

      <motion.div
        className="absolute left-1/2 top-1/2 h-[450px] w-[450px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-rose-500/10 blur-[120px]"
        animate={{
          scale: [1, 1.1, 1]
        }}
        transition={{
          duration: 4,
          repeat: Infinity
        }}
      />

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            duration: 1.4,
            type: 'spring'
          }}
          className="relative"
        >
          <motion.div
            animate={{
              scale: [1, 1.08, 1]
            }}
            transition={{
              duration: 2,
              repeat: Infinity
            }}
          >
            <Heart className="h-24 w-24 text-rose-500 drop-shadow-[0_0_45px_rgba(244,63,94,0.8)] md:h-32 md:w-32" />
          </motion.div>

          <motion.div
            className="absolute inset-0 rounded-full bg-rose-500/20 blur-3xl"
            animate={{
              opacity: [0.3, 0.7, 0.3],
              scale: [1, 1.3, 1]
            }}
            transition={{
              duration: 3,
              repeat: Infinity
            }}
          />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.4,
            duration: 1
          }}
          className="mt-8 text-center text-5xl font-black tracking-tight md:text-7xl"
        >
          <span className="bg-gradient-to-r from-rose-300 via-pink-200 to-rose-400 bg-clip-text text-transparent">
            Eternal Hearts
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: 0.8,
            duration: 1
          }}
          className="mt-5 max-w-2xl text-center text-sm leading-relaxed text-rose-100/60 md:text-xl"
        >
          Enter a cinematic emotional universe filled with romance,
          unforgettable memories, and beautiful love stories.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: 1
          }}
          className="mt-12 w-full max-w-md"
        >
          <div className="relative h-2 overflow-hidden rounded-full bg-white/10">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-rose-500 via-pink-400 to-rose-300"
              style={{
                width: `${progress}%`
              }}
            />

            <motion.div
              className="absolute top-0 h-full w-24 bg-white/30 blur-xl"
              animate={{
                x: ['-120%', '500%']
              }}
              transition={{
                duration: 2,
                repeat: Infinity
              }}
            />
          </div>

          <div className="mt-3 flex items-center justify-between text-xs text-rose-100/40 md:text-sm">
            <span>
              {progress < 100
                ? 'Building Emotional Universe...'
                : 'Experience Ready'}
            </span>

            <span>{progress}%</span>
          </div>
        </motion.div>

        <AnimatePresence>
          {showContinue && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 0.8
              }}
              className="mt-10"
            >
              <motion.button
                onClick={handleContinue}
                whileHover={{
                  scale: 1.05
                }}
                whileTap={{
                  scale: 0.96
                }}
                animate={{
                  y: [0, -4, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity
                }}
                className="rounded-full border border-rose-400/30 bg-white/10 px-10 py-4 text-sm font-semibold text-rose-100 backdrop-blur-xl transition-all duration-300 hover:bg-white/20 md:px-14 md:text-base"
              >
                Tap to Continue
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: 1.5
          }}
          className="mt-16 text-center"
        >
          <p className="text-[10px] tracking-[0.3em] text-rose-100/50 md:text-xs">
            A CINEMATIC ROMANCE EXPERIENCE BY JANGILI GOPI
          </p>

          <p className="mt-2 text-[10px] text-rose-100/40 md:text-xs">
            55+ STORIES • EMOTIONAL UNIVERSE • AAA EXPERIENCE
          </p>
        </motion.div>
      </div>
    </motion.div>
  )
}