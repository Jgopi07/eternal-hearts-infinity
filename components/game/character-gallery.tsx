'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useGameStore } from '@/lib/game-store'
import { characters } from '@/lib/character-data'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Heart, Sparkles, X, Stars } from 'lucide-react'

export function CharacterGallery() {
  const { setScreen } = useGameStore()

  const [selectedCharacter, setSelectedCharacter] =
    useState<typeof characters[0] | null>(null)

  const [filter, setFilter] = useState<'all' | 'male' | 'female'>('all')

  const filteredCharacters = characters.filter((char) => {
    if (filter === 'all') return true
    return char.gender === filter
  })

  return (
    <div className="min-h-screen min-h-dvh relative overflow-hidden bg-gradient-to-br from-pink-50 via-rose-50 to-fuchsia-100">
      
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,0,128,0.15),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(236,72,153,0.18),transparent_35%)]" />

        <motion.div
          animate={{
            y: [0, -30, 0],
            x: [0, 20, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
          }}
          className="absolute top-20 right-10 w-72 h-72 rounded-full bg-pink-400/20 blur-3xl"
        />

        <motion.div
          animate={{
            y: [0, 25, 0],
            x: [0, -25, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
          }}
          className="absolute bottom-10 left-10 w-96 h-96 rounded-full bg-fuchsia-400/20 blur-3xl"
        />

        <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(to_right,#ec4899_1px,transparent_1px),linear-gradient(to_bottom,#ec4899_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      <div className="relative z-10 min-h-screen min-h-dvh p-3 sm:p-4 md:p-8">

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-4 sm:mb-8"
        >
          <Button
            variant="ghost"
            onClick={() => setScreen('menu')}
            className="gap-2 text-sm sm:text-base hover:bg-pink-100/70 rounded-full px-4"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Back</span>
          </Button>

          <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-center tracking-tight">
            <span className="bg-gradient-to-r from-pink-500 via-rose-500 to-fuchsia-500 bg-clip-text text-transparent drop-shadow-sm">
              Characters
            </span>
          </h1>

          <div className="w-10 sm:w-20" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex justify-center gap-2 mb-6 sm:mb-10"
        >
          {(['all', 'female', 'male'] as const).map((f) => (
            <Button
              key={f}
              variant={filter === f ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter(f)}
              className={`capitalize text-xs sm:text-sm px-4 sm:px-6 rounded-full transition-all duration-300 border-pink-200 ${
                filter === f
                  ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg shadow-pink-300/50'
                  : 'bg-white/70 backdrop-blur-md hover:bg-pink-50'
              }`}
            >
              {f === 'all' ? 'All' : f}
            </Button>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 max-w-7xl mx-auto"
        >
          {filteredCharacters.map((character, index) => (
            <motion.div
              key={character.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{
                scale: 1.04,
                y: -8,
              }}
              whileTap={{ scale: 0.96 }}
              onClick={() => setSelectedCharacter(character)}
              className="cursor-pointer group"
            >
              <div className="relative aspect-[3/4] rounded-3xl overflow-hidden border border-white/40 bg-white/25 backdrop-blur-xl shadow-[0_8px_40px_rgba(236,72,153,0.18)] transition-all duration-500 group-hover:shadow-pink-300/50 group-hover:border-pink-300/60">

                <div
                  className={`absolute inset-0 bg-gradient-to-br ${character.colors.primary} ${character.colors.secondary} opacity-25`}
                />

                <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-black/40" />

                <motion.div
                  animate={{
                    opacity: [0.4, 0.8, 0.4],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                  }}
                  className="absolute -top-20 -right-10 w-40 h-40 rounded-full bg-white/20 blur-3xl"
                />

                <div className="absolute top-3 left-3 z-20">
                  <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30">
                    <Stars className="w-3 h-3 text-yellow-300 fill-yellow-300" />

                    <span className="text-[10px] font-semibold text-white">
                      SSR
                    </span>
                  </div>
                </div>

                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.3 }}
                    className="relative w-24 h-24 md:w-32 md:h-32"
                  >
                    <motion.div
                      animate={{
                        rotate: [0, 360],
                      }}
                      transition={{
                        duration: 12,
                        repeat: Infinity,
                        ease: 'linear',
                      }}
                      className={`absolute inset-0 rounded-full bg-gradient-to-br ${character.colors.primary} ${character.colors.secondary} blur-sm`}
                    />

                    <div className="absolute inset-[6px] rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center border border-white/60 shadow-inner overflow-hidden">

                      <motion.div
                        animate={{
                          y: [0, -4, 0],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                        }}
                        className="w-full h-full rounded-full overflow-hidden bg-white"
                      >
                        <img
                          src={character.image}
                          alt={character.name}
                          className="w-full h-full object-cover rounded-full transition-transform duration-500 group-hover:scale-110"
                          onError={(e) => {
                            e.currentTarget.src = '/placeholder-user.jpg'
                          }}
                        />
                      </motion.div>

                    </div>
                  </motion.div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                  <h3 className="text-white font-bold text-sm truncate">
                    {character.name}
                  </h3>

                  <div className="flex items-center justify-between mt-1">
                    <p className="text-white/70 text-xs truncate">
                      {character.age} years
                    </p>

                    <div className="flex items-center gap-1">
                      <Heart className="w-3 h-3 text-pink-400 fill-pink-400" />

                      <span className="text-[10px] text-white/80">
                        98%
                      </span>
                    </div>
                  </div>
                </div>

                <motion.div
                  className="absolute top-3 right-3 text-pink-400"
                  animate={{
                    scale: [1, 1.25, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                >
                  <Heart className="w-5 h-5 fill-pink-400/30" />
                </motion.div>

              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedCharacter && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setSelectedCharacter(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', damping: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white/90 backdrop-blur-2xl rounded-[2rem] shadow-[0_20px_80px_rgba(236,72,153,0.35)] max-w-lg w-full overflow-hidden border border-white/40"
            >
              <div
                className={`relative h-56 bg-gradient-to-br ${selectedCharacter.colors.primary} ${selectedCharacter.colors.secondary}`}
              >
                <div className="absolute inset-0 bg-black/10" />

                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    animate={{
                      y: [0, -12, 0],
                      rotate: [0, 3, -3, 0],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                    }}
                    className="w-40 h-40 rounded-full overflow-hidden border-4 border-white/30 shadow-2xl"
                  >
                    <img
                      src={selectedCharacter.image}
                      alt={selectedCharacter.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = '/placeholder-user.jpg'
                      }}
                    />
                  </motion.div>
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSelectedCharacter(null)}
                  className="absolute top-4 right-4 text-white hover:bg-white/20 rounded-full"
                >
                  <X className="w-5 h-5" />
                </Button>

                <div className="absolute bottom-4 left-4 flex items-center gap-2 flex-wrap">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      selectedCharacter.gender === 'female'
                        ? 'bg-pink-500/80'
                        : 'bg-blue-500/80'
                    } text-white`}
                  >
                    {selectedCharacter.gender === 'female'
                      ? 'Female'
                      : 'Male'}
                  </span>

                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/20 text-white backdrop-blur-md">
                    {selectedCharacter.age} years old
                  </span>

                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-yellow-400/80 text-black">
                    SSR Character
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h2 className="text-3xl font-black mb-1 bg-gradient-to-r from-pink-500 to-fuchsia-500 bg-clip-text text-transparent">
                  {selectedCharacter.name}
                </h2>

                <p className="text-pink-500 text-sm font-medium mb-4">
                  {selectedCharacter.role}
                </p>

                <p className="text-gray-600 leading-relaxed mb-5">
                  {selectedCharacter.description}
                </p>

                <div className="mb-5">
                  <h3 className="text-sm font-bold mb-3 flex items-center gap-2 text-gray-800">
                    <Sparkles className="w-4 h-4 text-pink-500" />
                    Personality Traits
                  </h3>

                  <div className="flex flex-wrap gap-2">
                    {selectedCharacter.traits.map((trait) => (
                      <span
                        key={trait}
                        className="px-3 py-1 rounded-full text-xs bg-pink-100 text-pink-600 border border-pink-200 font-medium"
                      >
                        {trait}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mb-5">
                  <h3 className="text-sm font-bold mb-3 flex items-center gap-2 text-gray-800">
                    <Heart className="w-4 h-4 text-rose-500 fill-rose-500/30" />
                    Interests
                  </h3>

                  <div className="flex flex-wrap gap-2">
                    {selectedCharacter.interests.map((interest) => (
                      <span
                        key={interest}
                        className="px-3 py-1 rounded-full text-xs bg-fuchsia-100 text-fuchsia-600 border border-fuchsia-200 font-medium"
                      >
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-5 border-t border-pink-100">
                  <p className="text-sm italic text-gray-500 leading-relaxed">
                    &quot;{selectedCharacter.quote}&quot;
                  </p>
                </div>

              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}