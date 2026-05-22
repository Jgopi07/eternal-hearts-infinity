'use client'

import { createContext, useContext, useEffect, useRef, useCallback, useState, type ReactNode } from 'react'
import { useGameStore } from '@/lib/game-store'

interface MusicContextType {
  playNote: (frequency: number, duration: number) => void
  isPlaying: boolean
}

const MusicContext = createContext<MusicContextType | null>(null)

export function useMusic() {
  return useContext(MusicContext)
}

const ROMANTIC_MELODY = [
  { note: 392, duration: 0.5 }, // G4
  { note: 440, duration: 0.5 }, // A4
  { note: 494, duration: 0.75 }, // B4
  { note: 440, duration: 0.25 }, // A4
  { note: 392, duration: 0.5 }, // G4
  { note: 330, duration: 0.5 }, // E4
  { note: 294, duration: 0.75 }, // D4
  { note: 330, duration: 0.25 }, // E4
  { note: 392, duration: 1 }, // G4
  { note: 0, duration: 0.5 }, // Rest
  { note: 440, duration: 0.5 }, // A4
  { note: 494, duration: 0.5 }, // B4
  { note: 523, duration: 0.75 }, // C5
  { note: 494, duration: 0.25 }, // B4
  { note: 440, duration: 0.5 }, // A4
  { note: 392, duration: 0.5 }, // G4
  { note: 330, duration: 1 }, // E4
  { note: 0, duration: 0.5 }, // Rest
]

const EMOTIONAL_MELODY = [
  { note: 262, duration: 0.75 }, // C4
  { note: 294, duration: 0.25 }, // D4
  { note: 330, duration: 0.5 }, // E4
  { note: 349, duration: 0.5 }, // F4
  { note: 392, duration: 1 }, // G4
  { note: 0, duration: 0.25 }, // Rest
  { note: 330, duration: 0.5 }, // E4
  { note: 294, duration: 0.5 }, // D4
  { note: 262, duration: 0.75 }, // C4
  { note: 0, duration: 0.5 }, // Rest
  { note: 392, duration: 0.5 }, // G4
  { note: 440, duration: 0.5 }, // A4
  { note: 392, duration: 0.5 }, // G4
  { note: 349, duration: 0.5 }, // F4
  { note: 330, duration: 1 }, // E4
  { note: 0, duration: 0.5 }, // Rest
]

export function MusicProvider({ children }: { children: ReactNode }) {
  const { isMuted, musicVolume, currentScreen, selectedStory } = useGameStore()
  const audioContextRef = useRef<AudioContext | null>(null)
  const gainNodeRef = useRef<GainNode | null>(null)
  const isPlayingRef = useRef(false)
  const animationFrameRef = useRef<number | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [hasInteracted, setHasInteracted] = useState(false)

  const initAudio = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)()
      gainNodeRef.current = audioContextRef.current.createGain()
      gainNodeRef.current.connect(audioContextRef.current.destination)
    }
    if (audioContextRef.current.state === 'suspended') {
      audioContextRef.current.resume()
    }
  }, [])

  const playNote = useCallback((frequency: number, duration: number) => {
    if (!audioContextRef.current || !gainNodeRef.current || frequency === 0) return

    const oscillator = audioContextRef.current.createOscillator()
    const noteGain = audioContextRef.current.createGain()
    
    oscillator.connect(noteGain)
    noteGain.connect(gainNodeRef.current)
    
    oscillator.type = 'sine'
    oscillator.frequency.setValueAtTime(frequency, audioContextRef.current.currentTime)
    
    const now = audioContextRef.current.currentTime
    noteGain.gain.setValueAtTime(0, now)
    noteGain.gain.linearRampToValueAtTime(0.3, now + 0.05)
    noteGain.gain.exponentialRampToValueAtTime(0.01, now + duration)
    
    oscillator.start(now)
    oscillator.stop(now + duration)
  }, [])

  const playMelody = useCallback(async (melody: typeof ROMANTIC_MELODY) => {
    if (!audioContextRef.current || !gainNodeRef.current) return
    
    isPlayingRef.current = true
    setIsPlaying(true)
    
    let currentTime = audioContextRef.current.currentTime
    
    const playLoop = async () => {
      while (isPlayingRef.current) {
        for (const { note, duration } of melody) {
          if (!isPlayingRef.current) return
          
          if (note > 0) {
            const oscillator = audioContextRef.current!.createOscillator()
            const noteGain = audioContextRef.current!.createGain()
            
            oscillator.connect(noteGain)
            noteGain.connect(gainNodeRef.current!)
            
            oscillator.type = 'sine'
            oscillator.frequency.setValueAtTime(note, currentTime)
            
            noteGain.gain.setValueAtTime(0, currentTime)
            noteGain.gain.linearRampToValueAtTime(0.2, currentTime + 0.05)
            noteGain.gain.exponentialRampToValueAtTime(0.01, currentTime + duration * 0.9)
            
            oscillator.start(currentTime)
            oscillator.stop(currentTime + duration)
          }
          
          currentTime += duration * 0.5
          
          await new Promise(resolve => setTimeout(resolve, duration * 400))
        }
        
        await new Promise(resolve => setTimeout(resolve, 500))
      }
    }
    
    playLoop()
  }, [])

  const stopMusic = useCallback(() => {
    isPlayingRef.current = false
    setIsPlaying(false)
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current)
    }
  }, [])

  useEffect(() => {
    if (gainNodeRef.current) {
      gainNodeRef.current.gain.setValueAtTime(isMuted ? 0 : musicVolume * 0.3, audioContextRef.current?.currentTime || 0)
    }
  }, [isMuted, musicVolume])

  useEffect(() => {
    if (!hasInteracted) return

    initAudio()
    
    if (currentScreen === 'splash') {
      stopMusic()
    } else if (currentScreen === 'menu' || currentScreen === 'stories' || currentScreen === 'gallery' || currentScreen === 'settings') {
      if (!isPlayingRef.current) {
        playMelody(ROMANTIC_MELODY)
      }
    } else if (currentScreen === 'game') {
      stopMusic()
      setTimeout(() => {
        playMelody(EMOTIONAL_MELODY)
      }, 100)
    }

    return () => {
      // Don't stop on cleanup to allow continuous playback
    }
  }, [currentScreen, hasInteracted, initAudio, playMelody, stopMusic])

  useEffect(() => {
    const handleInteraction = () => {
      setHasInteracted(true)
      initAudio()
    }

    window.addEventListener('click', handleInteraction, { once: true })
    window.addEventListener('touchstart', handleInteraction, { once: true })

    return () => {
      window.removeEventListener('click', handleInteraction)
      window.removeEventListener('touchstart', handleInteraction)
    }
  }, [initAudio])

  useEffect(() => {
    return () => {
      stopMusic()
      if (audioContextRef.current) {
        audioContextRef.current.close()
      }
    }
  }, [stopMusic])

  return (
    <MusicContext.Provider value={{ playNote, isPlaying }}>
      {children}
    </MusicContext.Provider>
  )
}
