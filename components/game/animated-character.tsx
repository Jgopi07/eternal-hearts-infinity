'use client'

import { motion, AnimatePresence } from 'framer-motion'
import type { Character } from '@/lib/character-data'
import type { CharacterMood } from '@/lib/game-store'

interface AnimatedCharacterProps {
  character: Character | null
  mood: CharacterMood
  isTyping: boolean
  position?: 'left' | 'center' | 'right'
}

export function AnimatedCharacter({ character, mood, isTyping, position = 'center' }: AnimatedCharacterProps) {
  if (!character) return null

  const getMoodStyles = () => {
    switch (mood) {
      case 'happy':
        return { eyeScale: 1.1, mouthCurve: 25, blushOpacity: 0.3 }
      case 'sad':
        return { eyeScale: 0.9, mouthCurve: -15, blushOpacity: 0 }
      case 'shy':
        return { eyeScale: 0.85, mouthCurve: 5, blushOpacity: 0.5 }
      case 'angry':
        return { eyeScale: 0.8, mouthCurve: -10, blushOpacity: 0 }
      case 'surprised':
        return { eyeScale: 1.3, mouthCurve: 0, blushOpacity: 0.2 }
      case 'love':
        return { eyeScale: 1.2, mouthCurve: 20, blushOpacity: 0.6 }
      case 'blush':
        return { eyeScale: 0.95, mouthCurve: 10, blushOpacity: 0.8 }
      default:
        return { eyeScale: 1, mouthCurve: 5, blushOpacity: 0 }
    }
  }

  const moodStyles = getMoodStyles()
  const isFemale = character.gender === 'female'

  const positionClasses = {
    left: 'left-[10%]',
    center: 'left-1/2 -translate-x-1/2',
    right: 'right-[10%]'
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={character.id}
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -50, scale: 0.9 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={`
  absolute bottom-3
  ${position === 'center'
    ? 'left-1/2 -translate-x-1/2'
    : positionClasses[position]}
  z-10
`}
      >
        <motion.div
          animate={{ 
            y: [0, -5, 0],
            scale: isTyping ? [1, 1.02, 1] : 1
          }}
          transition={{ 
            y: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
            scale: { duration: 0.5, repeat: isTyping ? Infinity : 0 }
          }}
          className="relative"
        >
          <svg
            viewBox="0 0 300 500"
            className="w-56 h-[420px] sm:w-64 sm:h-[480px] md:w-72 md:h-[540px] lg:w-[380px] lg:h-[370px] drop-shadow-2xl"
            style={{ filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.3))' }}
          >
            <defs>
              <linearGradient id={`skinGrad-${character.id}`} x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style={{ stopColor: character.skinTone }} />
                <stop offset="100%" style={{ stopColor: adjustColor(character.skinTone, -20) }} />
              </linearGradient>
              <linearGradient id={`hairGrad-${character.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: adjustColor(character.hairColor, 30) }} />
                <stop offset="100%" style={{ stopColor: character.hairColor }} />
              </linearGradient>
              <filter id="softGlow">
                <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>

            {isFemale ? (
              <g className="animate-breathe origin-bottom">
                <path
                  d={`M100,500 L100,320 Q90,280 110,250 L110,220 Q80,230 70,300 Q60,380 80,500 Z`}
                  fill={character.outfit.includes('pink') ? '#f9a8d4' : character.outfit.includes('white') ? '#fafafa' : character.outfit.includes('black') ? '#1f1f1f' : '#e8b4d9'}
                />
                <path
                  d={`M200,500 L200,320 Q210,280 190,250 L190,220 Q220,230 230,300 Q240,380 220,500 Z`}
                  fill={character.outfit.includes('pink') ? '#f9a8d4' : character.outfit.includes('white') ? '#fafafa' : character.outfit.includes('black') ? '#1f1f1f' : '#e8b4d9'}
                />
                <ellipse cx="150" cy="320" rx="60" ry="80" fill={character.outfit.includes('pink') ? '#fce7f3' : character.outfit.includes('white') ? '#ffffff' : character.outfit.includes('black') ? '#262626' : '#fce7f3'} />
                <ellipse cx="150" cy="280" rx="45" ry="30" fill={`url(#skinGrad-${character.id})`} />
              </g>
            ) : (
              <g className="animate-breathe origin-bottom">
                <path
                  d={`M95,500 L95,320 Q85,280 105,250 L105,220 Q70,230 65,300 Q55,380 75,500 Z`}
                  fill={character.outfit.includes('leather') ? '#292524' : character.outfit.includes('suit') ? '#1f2937' : '#374151'}
                />
                <path
                  d={`M205,500 L205,320 Q215,280 195,250 L195,220 Q230,230 235,300 Q245,380 225,500 Z`}
                  fill={character.outfit.includes('leather') ? '#292524' : character.outfit.includes('suit') ? '#1f2937' : '#374151'}
                />
                <rect x="100" y="220" width="100" height="150" rx="10" fill={character.outfit.includes('white') ? '#f5f5f5' : character.outfit.includes('leather') ? '#1c1917' : '#4b5563'} />
                <ellipse cx="150" cy="280" rx="50" ry="35" fill={`url(#skinGrad-${character.id})`} />
              </g>
            )}

            <ellipse cx="150" cy="280" rx="50" ry="35" fill={`url(#skinGrad-${character.id})`} />

            <ellipse cx="150" cy="130" rx="55" ry="70" fill={`url(#skinGrad-${character.id})`} />

            {isFemale ? (
              <g>
                <ellipse cx="150" cy="85" rx="65" ry="55" fill={`url(#hairGrad-${character.id})`} />
                <path
                  d={`M85,100 Q70,150 75,220 Q78,250 85,280 L95,280 Q90,220 95,150 Q100,100 130,80 Z`}
                  fill={`url(#hairGrad-${character.id})`}
                />
                <path
                  d={`M215,100 Q230,150 225,220 Q222,250 215,280 L205,280 Q210,220 205,150 Q200,100 170,80 Z`}
                  fill={`url(#hairGrad-${character.id})`}
                />
                <motion.path
                  d={`M90,120 Q85,200 95,300`}
                  stroke={character.hairColor}
                  strokeWidth="8"
                  fill="none"
                  animate={{ d: [`M90,120 Q85,200 95,300`, `M90,120 Q82,200 92,300`, `M90,120 Q85,200 95,300`] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <motion.path
                  d={`M210,120 Q215,200 205,300`}
                  stroke={character.hairColor}
                  strokeWidth="8"
                  fill="none"
                  animate={{ d: [`M210,120 Q215,200 205,300`, `M210,120 Q218,200 208,300`, `M210,120 Q215,200 205,300`] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </g>
            ) : (
              <g>
                <ellipse cx="150" cy="80" rx="58" ry="45" fill={`url(#hairGrad-${character.id})`} />
                <path
                  d={`M92,80 Q100,120 95,140 L105,140 Q108,100 105,80 Z`}
                  fill={`url(#hairGrad-${character.id})`}
                />
                <path
                  d={`M208,80 Q200,120 205,140 L195,140 Q192,100 195,80 Z`}
                  fill={`url(#hairGrad-${character.id})`}
                />
              </g>
            )}

            <g>
              <motion.g
                animate={{ scaleY: [1, 0.1, 1] }}
                transition={{ duration: 4, repeat: Infinity, repeatDelay: 2 }}
                style={{ transformOrigin: '120px 120px' }}
              >
                <ellipse cx="120" cy="120" rx="15" ry={12 * moodStyles.eyeScale} fill="white" />
                <motion.ellipse 
                  cx="120" 
                  cy="120" 
                  rx="8" 
                  ry={8 * moodStyles.eyeScale} 
                  fill={character.eyeColor}
                  animate={{ cx: isTyping ? [118, 122, 118] : 120 }}
                  transition={{ duration: 1, repeat: isTyping ? Infinity : 0 }}
                />
                <circle cx="123" cy="117" r="3" fill="white" opacity="0.8" />
              </motion.g>
              <motion.g
                animate={{ scaleY: [1, 0.1, 1] }}
                transition={{ duration: 4, repeat: Infinity, repeatDelay: 2 }}
                style={{ transformOrigin: '180px 120px' }}
              >
                <ellipse cx="180" cy="120" rx="15" ry={12 * moodStyles.eyeScale} fill="white" />
                <motion.ellipse 
                  cx="180" 
                  cy="120" 
                  rx="8" 
                  ry={8 * moodStyles.eyeScale} 
                  fill={character.eyeColor}
                  animate={{ cx: isTyping ? [178, 182, 178] : 180 }}
                  transition={{ duration: 1, repeat: isTyping ? Infinity : 0 }}
                />
                <circle cx="183" cy="117" r="3" fill="white" opacity="0.8" />
              </motion.g>
            </g>

            {mood === 'sad' && (
              <g>
                <path d="M115,105 Q120,100 125,105" stroke={character.hairColor} strokeWidth="2" fill="none" />
                <path d="M175,105 Q180,100 185,105" stroke={character.hairColor} strokeWidth="2" fill="none" />
              </g>
            )}
            {mood === 'angry' && (
              <g>
                <path d="M110,105 L130,112" stroke={character.hairColor} strokeWidth="3" fill="none" />
                <path d="M190,105 L170,112" stroke={character.hairColor} strokeWidth="3" fill="none" />
              </g>
            )}

            <ellipse cx="150" cy="150" rx="8" ry="5" fill={adjustColor(character.skinTone, -30)} opacity="0.5" />

            <motion.g
              animate={isTyping ? { scaleY: [1, 0.7, 1, 0.8, 1] } : {}}
              transition={{ duration: 0.3, repeat: isTyping ? Infinity : 0 }}
              style={{ transformOrigin: '150px 170px' }}
            >
              {moodStyles.mouthCurve > 15 ? (
                <path
                  d={`M135,165 Q150,${175 + moodStyles.mouthCurve * 0.3} 165,165`}
                  stroke="#e57373"
                  strokeWidth="4"
                  fill="none"
                  strokeLinecap="round"
                />
              ) : moodStyles.mouthCurve < 0 ? (
                <path
                  d={`M135,175 Q150,${165 + moodStyles.mouthCurve * 0.5} 165,175`}
                  stroke="#c48c8c"
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                />
              ) : (
                <ellipse cx="150" cy="168" rx="10" ry="6" fill="#e8a0a0" />
              )}
            </motion.g>

            <AnimatePresence>
              {moodStyles.blushOpacity > 0 && (
                <motion.g
                  initial={{ opacity: 0 }}
                  animate={{ opacity: moodStyles.blushOpacity }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ellipse cx="100" cy="145" rx="18" ry="10" fill="#ff9999" opacity="0.6" />
                  <ellipse cx="200" cy="145" rx="18" ry="10" fill="#ff9999" opacity="0.6" />
                </motion.g>
              )}
            </AnimatePresence>

            {(mood === 'love' || mood === 'happy') && (
              <motion.g
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
              >
                <motion.text
                  x="60"
                  y="80"
                  fontSize="24"
                  animate={{ y: [80, 70, 80], opacity: [0.8, 1, 0.8] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  ✨
                </motion.text>
                <motion.text
                  x="220"
                  y="90"
                  fontSize="20"
                  animate={{ y: [90, 80, 90], opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 1.8, repeat: Infinity }}
                >
                  💕
                </motion.text>
              </motion.g>
            )}
          </svg>

          
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

function adjustColor(color: string, amount: number): string {
  const hex = color.replace('#', '')
  const r = Math.max(0, Math.min(255, parseInt(hex.slice(0, 2), 16) + amount))
  const g = Math.max(0, Math.min(255, parseInt(hex.slice(2, 4), 16) + amount))
  const b = Math.max(0, Math.min(255, parseInt(hex.slice(4, 6), 16) + amount))
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`
}
