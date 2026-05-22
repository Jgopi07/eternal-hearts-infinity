'use client'

import { motion } from 'framer-motion'
import { useGameStore } from '@/lib/game-store'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import {
  ArrowLeft,
  Volume2,
  Mic,
  Type,
  Play,
  RotateCcw,
  Sparkles,
  Heart,
  Settings2
} from 'lucide-react'

export function SettingsScreen() {
  const {
    setScreen,
    isMuted,
    toggleMute,
    voiceEnabled,
    toggleVoice,
    musicVolume,
    setMusicVolume,
    voiceVolume,
    setVoiceVolume,
    textSpeed,
    setTextSpeed,
    autoPlay,
    toggleAutoPlay,
    resetGame,
    completedStories,
    favoriteStories
  } = useGameStore()

  return (
    <div className="min-h-screen min-h-dvh bg-[#fff7fb] relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,182,213,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,182,213,0.08)_1px,transparent_1px)] bg-[size:60px_60px]" />

        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-pink-100/60 via-white to-pink-200/60" />

        <div className="absolute top-20 left-10 w-96 h-96 bg-pink-300/30 rounded-full blur-3xl animate-pulse" />

        <div
          className="absolute bottom-10 right-10 w-[30rem] h-[30rem] bg-fuchsia-300/30 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: '1s' }}
        />

        <div
          className="absolute top-1/2 left-1/2 w-[20rem] h-[20rem] bg-rose-200/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: '2s' }}
        />
      </div>

      <div className="relative z-10 min-h-screen min-h-dvh p-3 sm:p-5 md:p-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-6 sm:mb-10"
        >
          <Button
            variant="ghost"
            onClick={() => setScreen('menu')}
            className="gap-2 text-sm sm:text-base hover:bg-pink-100/70 rounded-xl"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Back</span>
          </Button>

          <motion.h1
            animate={{
              textShadow: [
                '0 0 10px rgba(236,72,153,0.2)',
                '0 0 25px rgba(236,72,153,0.5)',
                '0 0 10px rgba(236,72,153,0.2)'
              ]
            }}
            transition={{ duration: 3, repeat: Infinity }}
            className="text-3xl sm:text-5xl font-black text-center"
          >
            <span className="bg-gradient-to-r from-pink-500 via-rose-500 to-fuchsia-500 bg-clip-text text-transparent">
              Settings
            </span>
          </motion.h1>

          <div className="w-10 sm:w-20" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-3xl mx-auto space-y-7"
        >
          <motion.div
            whileHover={{ y: -4 }}
            className="bg-white/75 backdrop-blur-xl rounded-3xl p-6 shadow-[0_10px_40px_rgba(236,72,153,0.12)] border border-pink-100"
          >
            <h2 className="text-2xl font-bold mb-7 flex items-center gap-3">
              <div className="p-2 rounded-xl bg-pink-100">
                <Volume2 className="w-5 h-5 text-pink-500" />
              </div>
              Audio Settings
            </h2>

            <div className="space-y-7">
              <div className="flex items-center justify-between">
                <Label
                  htmlFor="mute-toggle"
                  className="text-base font-medium"
                >
                  Mute All Sound
                </Label>

                <Switch
                  id="mute-toggle"
                  checked={isMuted}
                  onCheckedChange={toggleMute}
                />
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-base font-medium">
                    Music Volume
                  </Label>

                  <span className="text-sm font-semibold text-pink-500">
                    {Math.round(musicVolume * 100)}%
                  </span>
                </div>

                <Slider
                  value={[musicVolume]}
                  onValueChange={([val]) => setMusicVolume(val)}
                  max={1}
                  step={0.01}
                  disabled={isMuted}
                  className="w-full"
                />
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-base font-medium">
                    Voice Volume
                  </Label>

                  <span className="text-sm font-semibold text-pink-500">
                    {Math.round(voiceVolume * 100)}%
                  </span>
                </div>

                <Slider
                  value={[voiceVolume]}
                  onValueChange={([val]) => setVoiceVolume(val)}
                  max={1}
                  step={0.01}
                  disabled={isMuted || !voiceEnabled}
                  className="w-full"
                />
              </div>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ y: -4 }}
            className="bg-white/75 backdrop-blur-xl rounded-3xl p-6 shadow-[0_10px_40px_rgba(236,72,153,0.12)] border border-pink-100"
          >
            <h2 className="text-2xl font-bold mb-7 flex items-center gap-3">
              <div className="p-2 rounded-xl bg-pink-100">
                <Mic className="w-5 h-5 text-pink-500" />
              </div>
              Voice Settings
            </h2>

            <div className="flex items-center justify-between">
              <div>
                <Label
                  htmlFor="voice-toggle"
                  className="text-base font-medium"
                >
                  Voice Narration
                </Label>

                <p className="text-sm text-muted-foreground mt-1">
                  Characters speak their dialogue
                </p>
              </div>

              <Switch
                id="voice-toggle"
                checked={voiceEnabled}
                onCheckedChange={toggleVoice}
              />
            </div>
          </motion.div>

          <motion.div
            whileHover={{ y: -4 }}
            className="bg-white/75 backdrop-blur-xl rounded-3xl p-6 shadow-[0_10px_40px_rgba(236,72,153,0.12)] border border-pink-100"
          >
            <h2 className="text-2xl font-bold mb-7 flex items-center gap-3">
              <div className="p-2 rounded-xl bg-pink-100">
                <Type className="w-5 h-5 text-pink-500" />
              </div>
              Text Settings
            </h2>

            <div className="space-y-7">
              <div>
                <Label className="text-base font-medium mb-4 block">
                  Text Speed
                </Label>

                <div className="grid grid-cols-3 gap-3">
                  {(['slow', 'normal', 'fast'] as const).map((speed) => (
                    <Button
                      key={speed}
                      variant={textSpeed === speed ? 'default' : 'outline'}
                      onClick={() => setTextSpeed(speed)}
                      className={`capitalize rounded-2xl h-12 text-base transition-all duration-300 ${
                        textSpeed === speed
                          ? 'bg-gradient-to-r from-pink-500 to-fuchsia-500 text-white shadow-lg shadow-pink-300/40'
                          : 'hover:border-pink-300 hover:bg-pink-50'
                      }`}
                    >
                      {speed}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label
                    htmlFor="autoplay-toggle"
                    className="text-base font-medium"
                  >
                    Auto-Play
                  </Label>

                  <p className="text-sm text-muted-foreground mt-1">
                    Automatically advance dialogue
                  </p>
                </div>

                <Switch
                  id="autoplay-toggle"
                  checked={autoPlay}
                  onCheckedChange={toggleAutoPlay}
                />
              </div>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ y: -4 }}
            className="bg-white/75 backdrop-blur-xl rounded-3xl p-6 shadow-[0_10px_40px_rgba(236,72,153,0.12)] border border-pink-100"
          >
            <h2 className="text-2xl font-bold mb-7 flex items-center gap-3">
              <div className="p-2 rounded-xl bg-pink-100">
                <Play className="w-5 h-5 text-pink-500" />
              </div>
              Game Progress
            </h2>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <motion.div
                whileHover={{ scale: 1.03 }}
                className="text-center p-6 rounded-3xl bg-gradient-to-br from-pink-100 to-pink-50 border border-pink-200"
              >
                <div className="flex justify-center mb-3">
                  <Heart className="w-7 h-7 text-pink-500 fill-pink-300" />
                </div>

                <div className="text-4xl font-black text-pink-500">
                  {completedStories.length}
                </div>

                <div className="text-sm text-muted-foreground mt-1">
                  Stories Completed
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.03 }}
                className="text-center p-6 rounded-3xl bg-gradient-to-br from-orange-100 to-rose-50 border border-orange-200"
              >
                <div className="flex justify-center mb-3">
                  <Sparkles className="w-7 h-7 text-orange-500" />
                </div>

                <div className="text-4xl font-black text-orange-500">
                  {favoriteStories.length}
                </div>

                <div className="text-sm text-muted-foreground mt-1">
                  Favorite Stories
                </div>
              </motion.div>
            </div>

            <Button
              variant="destructive"
              onClick={resetGame}
              className="w-full h-12 rounded-2xl text-base gap-2 bg-gradient-to-r from-rose-500 to-red-500 hover:scale-[1.01] transition-all"
            >
              <RotateCcw className="w-4 h-4" />
              Reset Progress
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex items-center justify-center gap-2 py-4 text-sm text-muted-foreground"
          >
            <Settings2 className="w-4 h-4 text-pink-500" />
            Eternal Hearts Infinity v2.0 • Made with Love
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}