'use client'

import { useCallback, useRef, useState } from 'react'
import { useGameStore } from '@/lib/game-store'
import type { Character } from '@/lib/character-data'

export function useVoiceSynthesis() {
  const { voiceEnabled, voiceVolume } = useGameStore()
  const [isSpeaking, setIsSpeaking] = useState(false)
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null)

  const getVoiceSettings = (character: Character | null) => {
    if (!character) {
      return { pitch: 1, rate: 0.9 }
    }

    const voiceMap: Record<string, { pitch: number; rate: number; voiceName?: string }> = {
      'male-deep': { pitch: 0.7, rate: 0.85, voiceName: 'Google UK English Male' },
      'male-soft': { pitch: 0.9, rate: 0.9, voiceName: 'Google UK English Male' },
      'male-energetic': { pitch: 1.0, rate: 1.0, voiceName: 'Google UK English Male' },
      'female-sweet': { pitch: 1.3, rate: 0.95, voiceName: 'Google UK English Female' },
      'female-mature': { pitch: 1.1, rate: 0.85, voiceName: 'Google UK English Female' },
      'female-cheerful': { pitch: 1.4, rate: 1.0, voiceName: 'Google UK English Female' }
    }

    return voiceMap[character.voiceType] || { pitch: 1, rate: 0.9 }
  }

  const speak = useCallback((text: string, character: Character | null) => {
    if (!voiceEnabled || typeof window === 'undefined' || !window.speechSynthesis) {
      return
    }

    window.speechSynthesis.cancel()

    const utterance = new SpeechSynthesisUtterance(text)
    const settings = getVoiceSettings(character)
    
    utterance.pitch = settings.pitch
    utterance.rate = settings.rate
    utterance.volume = voiceVolume

    const voices = window.speechSynthesis.getVoices()
    
    if (character?.gender === 'female') {
      const femaleVoice = voices.find(v => 
        v.name.toLowerCase().includes('female') || 
        v.name.toLowerCase().includes('samantha') ||
        v.name.toLowerCase().includes('victoria') ||
        v.name.toLowerCase().includes('karen')
      )
      if (femaleVoice) utterance.voice = femaleVoice
    } else {
      const maleVoice = voices.find(v => 
        v.name.toLowerCase().includes('male') || 
        v.name.toLowerCase().includes('daniel') ||
        v.name.toLowerCase().includes('alex') ||
        v.name.toLowerCase().includes('tom')
      )
      if (maleVoice) utterance.voice = maleVoice
    }

    utterance.onstart = () => setIsSpeaking(true)
    utterance.onend = () => setIsSpeaking(false)
    utterance.onerror = () => setIsSpeaking(false)

    utteranceRef.current = utterance
    window.speechSynthesis.speak(utterance)
  }, [voiceEnabled, voiceVolume])

  const stop = useCallback(() => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel()
      setIsSpeaking(false)
    }
  }, [])

  const pause = useCallback(() => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.pause()
    }
  }, [])

  const resume = useCallback(() => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.resume()
    }
  }, [])

  return {
    speak,
    stop,
    pause,
    resume,
    isSpeaking
  }
}
