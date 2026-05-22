'use client'

import { useEffect, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useGameStore } from '@/lib/game-store'
import { useVoiceSynthesis } from '@/hooks/use-voice-synthesis'
import { characters } from '@/lib/character-data'
import {
  ChevronRight,
  ChevronLeft,
  Volume2,
  VolumeX,
  SkipForward,
  Settings,
  Home,
  Heart,
  Sparkles,
  Music,
  Music2,
} from 'lucide-react'

import { Button } from '@/components/ui/button'

export function DialogueBox() {
  const {
  selectedStory,
  currentConversationIndex,
  textSpeed,
  isTyping,
  displayedText,
  autoPlay,
  voiceEnabled,
  isMuted,
  toggleMute,
  setIsTyping,
  setDisplayedText,
  nextConversation,
  previousConversation,
  toggleVoice,
  toggleAutoPlay,
  setScreen,
  resetGame,
} = useGameStore()
  

  const { speak, stop } = useVoiceSynthesis()

  const [showSettings, setShowSettings] = useState(false)

  const currentConversation =
    selectedStory?.conversations[currentConversationIndex]

  const currentChar = currentConversation
    ? characters.find(
        (c) => c.id === currentConversation.characterId
      )
    : null

  const getTypeSpeed = () => {
    switch (textSpeed) {
      case 'slow':
        return 60
      case 'fast':
        return 18
      default:
        return 30
    }
  }

  const typeText = useCallback(() => {
    if (!currentConversation) return

    const fullText = currentConversation.text

    let index = 0

    setIsTyping(true)
    setDisplayedText('')

    if (voiceEnabled && currentChar) {
      speak(fullText, currentChar)
    }

    const interval = setInterval(() => {
      if (index < fullText.length) {
        setDisplayedText(fullText.slice(0, index + 1))
        index++
      } else {
        clearInterval(interval)
        setIsTyping(false)
      }
    }, getTypeSpeed())

    return () => clearInterval(interval)
  }, [
    currentConversation,
    currentChar,
    voiceEnabled,
    speak,
    setIsTyping,
    setDisplayedText,
    textSpeed,
  ])

  useEffect(() => {
    const cleanup = typeText()

    return () => {
      cleanup?.()
      stop()
    }
  }, [currentConversationIndex, typeText, stop])

  useEffect(() => {
    if (autoPlay && !isTyping && currentConversation) {
      const timeout = setTimeout(() => {
        nextConversation()
      }, 2500)

      return () => clearTimeout(timeout)
    }
  }, [
    autoPlay,
    isTyping,
    currentConversation,
    nextConversation,
  ])

  const handleNext = () => {
    if (isTyping) {
      setDisplayedText(currentConversation?.text || '')
      setIsTyping(false)
    } else {
      stop()
      nextConversation()
    }
  }

  const handleSkip = () => {
    if (currentConversation) {
      setDisplayedText(currentConversation.text)
      setIsTyping(false)
    }
  }
  

  if (!currentConversation || !currentChar) return null

  const progress =
    ((currentConversationIndex + 1) /
      (selectedStory?.conversations.length || 1)) *
    100

  const isLastConversation =
    selectedStory &&
    currentConversationIndex >=
      selectedStory.conversations.length - 1

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">

      {/* PROGRESS BAR */}
      <div className="h-[3px] bg-white/10">
        <motion.div
          className="h-full bg-gradient-to-r from-pink-500 to-violet-500"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.4 }}
        />
      </div>

      {/* MAIN DIALOG BOX */}
      <motion.div
        initial={{ y: 120, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="
          relative
          mx-3
          sm:mx-5
          mb-3
          rounded-[28px]
          overflow-hidden
          backdrop-blur-2xl
          bg-black/35
          border
          border-white/10
          shadow-[0_0_50px_rgba(0,0,0,0.5)]
        "
      >

        {/* TOP GLOW */}
        <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 via-transparent to-violet-500/10 pointer-events-none" />

        {/* HEADER */}
        <div className="flex items-center justify-between px-4 sm:px-6 pt-4">

          {/* CHARACTER INFO */}
          <div className="flex items-center gap-3">

          <motion.div
  animate={{
    scale: isTyping ? [1, 1.06, 1] : 1,
  }}
  transition={{
    duration: 1,
    repeat: isTyping ? Infinity : 0,
  }}
  className="
    relative
    w-14
    h-14
    rounded-full
    overflow-hidden
    border-2
    border-pink-400/40
    shadow-[0_0_25px_rgba(236,72,153,0.35)]
    flex-shrink-0
  "
>
  <img
    src={currentChar.image}
    alt={currentChar.name}
    className="
      w-full
      h-full
      object-cover
    "
  />

  {/* Glow Overlay */}
  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
</motion.div>

            <div>
              <h3 className="text-white font-bold text-lg">
                {currentChar.name}
              </h3>

              <p className="text-white/50 text-xs">
                {currentConversation.action && (
                  <span>
                    ✦ {currentConversation.action}
                  </span>
                )}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1">

  {/* VOICE */}
  <Button
    variant="ghost"
    size="icon"
    onClick={toggleVoice}
    className="text-white/70 hover:text-white hover:bg-white/10 rounded-full"
  >
    {voiceEnabled ? (
      <Volume2 className="w-5 h-5" />
    ) : (
      <VolumeX className="w-5 h-5" />
    )}
  </Button>

  {/* MUSIC */}
<Button
  variant="ghost"
  size="icon"
  onClick={toggleMute}
  className="
    rounded-full
    text-white/70
    hover:text-white
    hover:bg-white/10
  "
>
  {!isMuted ? (
    <Music2 className="w-5 h-5 text-pink-400" />
  ) : (
    <Music className="w-5 h-5" />
  )}
</Button>

  {/* AUTOPLAY */}
  <Button
    variant="ghost"
    size="icon"
    onClick={toggleAutoPlay}
    className={`rounded-full ${
      autoPlay
        ? 'text-pink-400'
        : 'text-white/70'
    }`}
  >
    <SkipForward className="w-5 h-5" />
  </Button>

  {/* SETTINGS */}
  <Button
    variant="ghost"
    size="icon"
    onClick={() =>
      setShowSettings(!showSettings)
    }
    className="text-white/70 hover:text-white rounded-full"
  >
    <Settings className="w-5 h-5" />
  </Button>
</div>
        </div>

        {/* DIALOGUE TEXT */}
        <div className="px-5 sm:px-6 py-5 min-h-[130px] flex items-center">

          <AnimatePresence mode="wait">
            <motion.div
              key={currentConversationIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="w-full"
            >
              <p className="text-white text-[15px] sm:text-lg leading-8 font-medium tracking-wide">
                {displayedText}

                {isTyping && (
                  <motion.span
                    animate={{
                      opacity: [1, 0, 1],
                    }}
                    transition={{
                      duration: 0.7,
                      repeat: Infinity,
                    }}
                    className="
                      inline-block
                      ml-1
                      w-[3px]
                      h-5
                      bg-pink-400
                      rounded-full
                      align-middle
                    "
                  />
                )}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* FOOTER */}
        <div className="flex items-center justify-between px-4 sm:px-6 pb-4 pt-2 border-t border-white/10">

          {/* LEFT */}
          <div className="flex items-center gap-3">

            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                resetGame()
                setScreen('menu')
              }}
              className="
                text-white/60
                hover:text-white
                hover:bg-white/10
                rounded-xl
              "
            >
              <Home className="w-4 h-4 mr-1" />
              Menu
            </Button>

            <div className="text-white/40 text-sm">
              {currentConversationIndex + 1} /{' '}
              {selectedStory?.conversations.length}
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-2">

            <Button
              variant="ghost"
              size="icon"
              onClick={previousConversation}
              disabled={currentConversationIndex === 0}
              className="
                text-white/70
                hover:text-white
                hover:bg-white/10
                rounded-full
                disabled:opacity-30
              "
            >
              <ChevronLeft className="w-6 h-6" />
            </Button>

            {isTyping ? (
              <Button
                onClick={handleSkip}
                className="
                  bg-white/10
                  hover:bg-white/20
                  text-white
                  rounded-2xl
                  px-5
                "
              >
                Skip
              </Button>
            ) : isLastConversation ? (
              <Button
                onClick={() => {
                  resetGame()
                  setScreen('stories')
                }}
                className="
                  bg-gradient-to-r
                  from-pink-500
                  to-violet-500
                  hover:opacity-90
                  text-white
                  rounded-2xl
                  px-5
                  shadow-lg
                "
              >
                <Heart className="w-4 h-4 mr-2" />
                Complete
              </Button>
            ) : (
              <Button
                onClick={handleNext}
                className="
                  bg-gradient-to-r
                  from-pink-500
                  to-violet-500
                  hover:opacity-90
                  text-white
                  rounded-2xl
                  px-5
                  shadow-lg
                "
              >
                Next
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            )}
          </div>
        </div>
      </motion.div>

      {/* SETTINGS POPUP */}
      <AnimatePresence>
        {showSettings && (
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
              scale: 0.9,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: 20,
              scale: 0.9,
            }}
            className="
              absolute
              bottom-full
              right-5
              mb-3
              w-[230px]
              rounded-3xl
              border
              border-white/10
              bg-black/60
              backdrop-blur-2xl
              p-5
              shadow-2xl
            "
          >

            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-4 h-4 text-pink-400" />
              <h4 className="text-white font-semibold">
                Settings
              </h4>
            </div>

            <div className="space-y-4">

              <div className="flex items-center justify-between">
                <span className="text-white/70 text-sm">
                  Auto Play
                </span>

                <Button
                  size="sm"
                  variant={autoPlay ? 'default' : 'outline'}
                  onClick={toggleAutoPlay}
                  className="rounded-xl"
                >
                  {autoPlay ? 'ON' : 'OFF'}
                </Button>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-white/70 text-sm">
                  Voice
                </span>

                <Button
                  size="sm"
                  variant={
                    voiceEnabled
                      ? 'default'
                      : 'outline'
                  }
                  onClick={toggleVoice}
                  className="rounded-xl"
                >
                  {voiceEnabled ? 'ON' : 'OFF'}
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}