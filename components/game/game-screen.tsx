'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useGameStore } from '@/lib/game-store'
import { AnimatedCharacter } from './animated-character'
import { DialogueBox } from './dialogue-box'
import { characters } from '@/lib/character-data'
import { ArrowLeft } from 'lucide-react'


export function GameScreen() {
  const {
    selectedStory,
    currentConversationIndex,
    characterMood,
    isTyping,
    setScreen,
  } = useGameStore()

  const [particles, setParticles] = useState<
    Array<{
      id: number
      x: number
      y: number
      delay: number
    }>
  >([])

  const currentConversation =
    selectedStory?.conversations[currentConversationIndex]

  const currentChar = currentConversation
    ? characters.find(
        (c) => c.id === currentConversation.characterId
      )
    : null

const backgroundImage =
  selectedStory?.background ||
  '/backgrounds/cozy-cafe.jpg'

  useEffect(() => {
    const newParticles = Array.from(
      { length: 25 },
      (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 5,
      })
    )

    setParticles(newParticles)
  }, [])

  if (!selectedStory) return null

  return (
    <div className="fixed inset-0 overflow-hidden bg-black">
      {/* BACKGROUND IMAGE */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}animate={{
  scale: [1.05, 1.1, 1.05],
}}
transition={{
  duration: 20,
  repeat: Infinity,
  ease: 'easeInOut',
}}
        transition={{ duration: 8 }}
      >
        <img
  src={backgroundImage}
  alt="background"
  className="
    w-full
    h-full
    object-cover
    scale-105
    blur-[1px]
    brightness-75
    contrast-110
    saturate-125
    transition-all
    duration-1000
  "
/>
      </motion.div>

      {/* DARK OVERLAY */}
      {/* CINEMATIC OVERLAY */}
<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/40" />

{/* SOFT COLOR OVERLAY */}
<div className="absolute inset-0 bg-pink-500/5" />

      {/* CINEMATIC GRADIENT */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/40" />

      {/* SOFT COLOR GLOW */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-pink-500/10 blur-3xl rounded-full" />

        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-violet-500/10 blur-3xl rounded-full" />
      </div>

      {/* PARTICLES */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute w-1 h-1 bg-white/30 rounded-full"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.4, 1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: particle.delay,
            }}
          />
        ))}
      </div>

      {/* LOVE EFFECT */}
      {(characterMood === 'love' ||
        characterMood === 'happy') && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 10 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-2xl"
              style={{
                left: `${10 + Math.random() * 80}%`,
                top: `${Math.random() * 80}%`,
              }}
              animate={{
                y: [0, -120],
                opacity: [0, 1, 0],
                scale: [0.6, 1, 0.6],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: i * 0.5,
              }}
            >
              💕
            </motion.div>
          ))}
        </div>
      )}

      {/* RAIN EFFECT */}
      {selectedStory.background.includes('rain') && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 80 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-[1px] h-12 bg-blue-200/40"
              style={{
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                y: ['-10%', '120%'],
              }}
              transition={{
                duration: 0.6 + Math.random() * 0.4,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
          <motion.div
  className="absolute inset-0 bg-white"
  animate={{
    opacity: [0, 0.15, 0],
  }}
  transition={{
    duration: 0.2,
    repeat: Infinity,
    repeatDelay: 6,
  }}
/>
        </div>
      )}

{/* BACK BUTTON */}
<motion.button
  initial={{ opacity: 0, x: -20 }}
  animate={{ opacity: 1, x: 0 }}
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  onClick={() => setScreen('stories')}
  className="
    absolute
    top-5
    right-5
    z-50
    flex
    items-center
    gap-2
    px-5
    py-3
    rounded-2xl
    backdrop-blur-xl
    bg-black/30
    border
    border-white/20
    text-white
    shadow-2xl
    hover:bg-pink-500/20
    transition-all
    duration-300
  "
>
  <ArrowLeft className="w-5 h-5" />
  <span className="hidden sm:block font-medium">
    Back
  </span>
</motion.button>

     {/* TOP STORY INFO */}
<motion.div
  initial={{ opacity: 0, y: -15 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.4 }}
  className="absolute top-4 left-4 z-40"
>
  <div className="px-5 py-3 rounded-2xl bg-black/30 backdrop-blur-lg border border-white/10 shadow-xl max-w-sm">
    
    <h2 className="text-white text-2xl md:text-3xl font-bold leading-tight">
      {selectedStory.title}
    </h2>

    <p className="text-white/70 text-sm mt-1">
      {selectedStory.subtitle}
    </p>

  </div>
</motion.div>

      {/* CHARACTER SECTION */}
      <div className="absolute inset-0 flex items-end justify-center pb-[180px] md:pb-[220px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentChar?.id}
            initial={{
              opacity: 0,
              y: 40,
              scale: 0.9,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: -40,
              scale: 0.9,
            }}
            transition={{
              duration: 0.5,
            }}
            className="relative"
          >
            {/* CHARACTER GLOW */}
            <div className="absolute inset-0 bg-pink-500/20 blur-[120px] rounded-full scale-125" />

            <AnimatedCharacter
              character={currentChar || null}
              mood={characterMood}
              isTyping={isTyping}
              position="center"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* DIALOGUE BOX */}
      <DialogueBox />

      {/* FOOTER 
      <motion.div
        className="absolute bottom-3 left-3 text-white/40 text-xs"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        Eternal Hearts © 2026 • Gopi Varma ❤️
      </motion.div>   */}
    </div>
  )
}