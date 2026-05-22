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

 const speak = useCallback(async (
  text: string,
  character: Character | null
) => {

  if (
    !voiceEnabled ||
    typeof window === 'undefined' ||
    !window.speechSynthesis
  ) {
    return
  }

  window.speechSynthesis.cancel()

  const utterance =
    new SpeechSynthesisUtterance(text)

  utterance.volume = voiceVolume

  let voices = window.speechSynthesis.getVoices()

// MOBILE FIX
if (voices.length === 0) {

  await new Promise(resolve =>
    setTimeout(resolve, 300)
  )

  voices = window.speechSynthesis.getVoices()
}


  if (character?.gender === 'female') {

    const femaleVoice = voices.find(v =>
      v.name.includes('Samantha') ||
      v.name.includes('Victoria') ||
      v.name.includes('Google UK English Female') ||
      v.name.includes('Female')
    )

    if (femaleVoice) {
      utterance.voice = femaleVoice
    }

   const textLength = text.length

// PERFECT TEXT ↔ VOICE SYNC
const calculatedRate =
  textLength > 180
    ? 0.78
    : textLength > 120
    ? 0.84
    : textLength > 60
    ? 0.9
    : 0.96

if (character?.gender === 'female') {

  const femaleVoice = voices.find(v =>
    v.name.includes('Samantha') ||
    v.name.includes('Victoria') ||
    v.name.includes('Google UK English Female') ||
    v.name.includes('Female')
  )

  if (femaleVoice) {
    utterance.voice = femaleVoice
  }

  utterance.pitch = 1.25
  utterance.rate = calculatedRate

} else {

  const maleVoice = voices.find(v =>
    v.name.includes('Daniel') ||
    v.name.includes('Alex') ||
    v.name.includes('Google UK English Male') ||
    v.name.includes('Male')
  )

  if (maleVoice) {
    utterance.voice = maleVoice
  }

  // DEEP MALE EFFECT
  utterance.pitch = 0.72
  utterance.rate = calculatedRate - 0.05
}

  } else {

    const maleVoice = voices.find(v =>
      v.name.includes('Daniel') ||
      v.name.includes('Alex') ||
      v.name.includes('Google UK English Male') ||
      v.name.includes('Male')
    )

    if (maleVoice) {
      utterance.voice = maleVoice
    }

    // MOBILE MALE EFFECT
    
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
