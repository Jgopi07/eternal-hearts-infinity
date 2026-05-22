'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useGameStore } from '@/lib/game-store'
import { SplashScreen } from '@/components/game/splash-screen'
import { MainMenu } from '@/components/game/main-menu'
import { StorySelection } from '@/components/game/story-selection'
import { GameScreen } from '@/components/game/game-screen'
import { CharacterGallery } from '@/components/game/character-gallery'
import { SettingsScreen } from '@/components/game/settings-screen'
import { MusicProvider } from '@/components/game/music-provider'

export default function Home() {
  const { currentScreen } = useGameStore()

  return (
    <MusicProvider>
      <main className="min-h-screen min-h-dvh bg-background overflow-hidden">
        <AnimatePresence mode="wait">
        {currentScreen === 'splash' && (
          <motion.div
            key="splash"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <SplashScreen />
          </motion.div>
        )}

        {currentScreen === 'menu' && (
          <motion.div
            key="menu"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.5 }}
          >
            <MainMenu />
          </motion.div>
        )}

        {currentScreen === 'stories' && (
          <motion.div
            key="stories"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
          >
            <StorySelection />
          </motion.div>
        )}

        {currentScreen === 'game' && (
          <motion.div
            key="game"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5 }}
          >
            <GameScreen />
          </motion.div>
        )}

        {currentScreen === 'gallery' && (
          <motion.div
            key="gallery"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
          >
            <CharacterGallery />
          </motion.div>
        )}

        {currentScreen === 'settings' && (
          <motion.div
            key="settings"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
          >
            <SettingsScreen />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
    </MusicProvider>
  )
}
