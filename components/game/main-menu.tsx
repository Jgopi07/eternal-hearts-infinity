'use client'

import { motion } from 'framer-motion'
import { useGameStore } from '@/lib/game-store'
import { Button } from '@/components/ui/button'
import {
  Heart,
  Users,
  Settings,
  Volume2,
  VolumeX,
  Sparkles
} from 'lucide-react'
import { stories } from '@/lib/story-data'
import { characters } from '@/lib/character-data'

export function MainMenu() {
  const {
    setScreen,
    isMuted,
    toggleMute,
    completedStories,
    favoriteStories
  } = useGameStore()

  const stats = {
    totalStories: stories.length,
    completedStories: completedStories.length,
    totalCharacters: characters.length,
    favoriteStories: favoriteStories.length
  }

  const floatingHearts = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    left: `${(i * 9.1) % 100}%`,
    top: `${(i * 13.4) % 100}%`,
    size: i % 3 === 0 ? 'text-lg' : i % 2 === 0 ? 'text-sm' : 'text-base',
    duration: 4 + (i % 4),
    delay: i * 0.2
  }))

  return (
    <div className="relative min-h-screen min-h-dvh overflow-hidden bg-[#f7eef3]">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 h-full w-full bg-gradient-to-br from-pink-200/40 via-[#f7eef3] to-rose-200/30" />

        <div className="absolute top-20 left-20 h-72 w-72 rounded-full bg-pink-300/30 blur-3xl animate-pulse" />

        <div
          className="absolute bottom-20 right-20 h-96 w-96 rounded-full bg-rose-300/20 blur-3xl animate-pulse"
          style={{ animationDelay: '1s' }}
        />

        <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-pink-100/40 blur-3xl" />
      </div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {floatingHearts.map((heart) => (
          <motion.div
            key={heart.id}
            className={`absolute text-pink-300/20 ${heart.size}`}
            style={{
              left: heart.left,
              top: heart.top
            }}
            animate={{
              y: [0, -15, 0],
              opacity: [0.2, 0.45, 0.2],
              rotate: [0, 8, 0]
            }}
            transition={{
              duration: heart.duration,
              repeat: Infinity,
              delay: heart.delay
            }}
          >
            ♡
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 flex min-h-screen min-h-dvh flex-col items-center justify-center px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12 text-center"
        >
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="mb-4 inline-block"
          >
            <Heart className="mx-auto h-16 w-16 fill-pink-400/20 text-pink-500 drop-shadow-[0_0_20px_rgba(236,72,153,0.4)]" />
          </motion.div>

          <h1 className="mb-4 text-4xl font-bold sm:text-5xl md:text-7xl">
            <span className="bg-gradient-to-r from-pink-500 via-rose-400 to-pink-500 bg-clip-text text-transparent">
              Eternal Hearts
            </span>
          </h1>

          <p className="mx-auto max-w-md px-4 text-base leading-relaxed text-zinc-600 sm:text-lg md:text-xl">
            Experience beautiful love stories with stunning characters,
            emotional conversations, and immersive storytelling
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex w-full max-w-xs flex-col gap-4"
        >
          <Button
            onClick={() => setScreen('stories')}
            size="lg"
            className="group h-14 w-full rounded-2xl bg-gradient-to-r from-pink-500 to-rose-400 text-lg text-white shadow-lg shadow-pink-300/40 transition-all duration-300 hover:scale-[1.02] hover:from-pink-400 hover:to-rose-300"
          >
            <Sparkles className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
            Start Playing
          </Button>

          <Button
            onClick={() => setScreen('gallery')}
            variant="outline"
            size="lg"
            className="h-12 w-full rounded-2xl border-pink-200 bg-white/50 text-zinc-700 backdrop-blur-md hover:bg-pink-100/40"
          >
            <Users className="mr-2 h-5 w-5 transition-transform group-hover:scale-110" />
            Character Gallery
          </Button>

          <Button
            onClick={() => setScreen('settings')}
            variant="ghost"
            size="lg"
            className="h-12 w-full rounded-2xl text-zinc-700 hover:bg-pink-100/40"
          >
            <Settings className="mr-2 h-5 w-5" />
            Settings
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 grid grid-cols-2 gap-4 text-center md:grid-cols-4 md:gap-8"
        >
          <div className="p-4">
            <div className="text-3xl font-bold text-pink-500 md:text-4xl">
              {stats.totalStories}+
            </div>

            <div className="text-sm text-zinc-500">
              Love Stories
            </div>
          </div>

          <div className="p-4">
            <div className="text-3xl font-bold text-rose-400 md:text-4xl">
              {stats.totalCharacters}
            </div>

            <div className="text-sm text-zinc-500">
              Characters
            </div>
          </div>

          <div className="p-4">
            <div className="text-3xl font-bold text-pink-500 md:text-4xl">
              {stats.completedStories}
            </div>

            <div className="text-sm text-zinc-500">
              Completed
            </div>
          </div>

          <div className="p-4">
            <div className="text-3xl font-bold text-rose-400 md:text-4xl">
              {stats.favoriteStories}
            </div>

            <div className="text-sm text-zinc-500">
              Favorites
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="absolute bottom-6 right-6"
        >
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMute}
            className="rounded-full text-zinc-700 hover:bg-pink-100/40"
          >
            {isMuted ? (
              <VolumeX className="h-5 w-5" />
            ) : (
              <Volume2 className="h-5 w-5" />
            )}
          </Button>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="absolute bottom-6 left-6 text-xs text-zinc-500"
        >
          © 2026 Eternal Hearts • Gopi Varma ❤️
        </motion.p>
      </div>
    </div>
  )
}