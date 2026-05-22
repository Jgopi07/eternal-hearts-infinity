'use client'

import { useCallback, useEffect, useRef } from 'react'
import { useGameStore } from '@/lib/game-store'

const MUSIC_URLS: Record<string, string> = {
  'romantic-piano': 'https://cdn.pixabay.com/download/audio/2022/02/22/audio_d1718ab41b.mp3',
  'emotional-strings': 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3',
  'upbeat-romantic': 'https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a13f69d2.mp3',
  'nostalgic-melody': 'https://cdn.pixabay.com/download/audio/2021/11/25/audio_91b32e02f9.mp3',
  'rain-ambience': 'https://cdn.pixabay.com/download/audio/2022/03/10/audio_c2c0a1e8d5.mp3',
  'light-jazz': 'https://cdn.pixabay.com/download/audio/2022/08/04/audio_2dde668d05.mp3',
  'sophisticated-piano': 'https://cdn.pixabay.com/download/audio/2022/02/22/audio_d1718ab41b.mp3',
  'classical-romance': 'https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a13f69d2.mp3',
  'dramatic-orchestral': 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3',
  'electronic-chill': 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_8cb749d484.mp3',
  'default': 'https://cdn.pixabay.com/download/audio/2022/02/22/audio_d1718ab41b.mp3'
}

export function useBackgroundMusic() {
  const { isMuted, musicVolume, currentScreen, selectedStory } = useGameStore()
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const currentMusicRef = useRef<string>('')

  const playMusic = useCallback((musicKey: string) => {
    if (typeof window === 'undefined') return

    const url = MUSIC_URLS[musicKey] || MUSIC_URLS['default']
    
    if (currentMusicRef.current === url && audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : musicVolume
      return
    }

    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.src = ''
    }

    const audio = new Audio(url)
    audio.loop = true
    audio.volume = isMuted ? 0 : musicVolume
    audioRef.current = audio
    currentMusicRef.current = url

    audio.play().catch(() => {
    })
  }, [isMuted, musicVolume])

  const stopMusic = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.src = ''
      audioRef.current = null
      currentMusicRef.current = ''
    }
  }, [])

  const setVolume = useCallback((volume: number) => {
    if (audioRef.current) {
      audioRef.current.volume = volume
    }
  }, [])

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : musicVolume
    }
  }, [isMuted, musicVolume])

  useEffect(() => {
    if (currentScreen === 'game' && selectedStory) {
      playMusic(selectedStory.music)
    } else if (currentScreen === 'menu' || currentScreen === 'stories') {
      playMusic('romantic-piano')
    } else {
      stopMusic()
    }

    return () => {
    }
  }, [currentScreen, selectedStory, playMusic, stopMusic])

  useEffect(() => {
  return () => {
    stopMusic()

    if (
      audioContextRef.current &&
      audioContextRef.current.state !== 'closed'
    ) {
      audioContextRef.current.close().catch(() => {})
    }
  }
}, [stopMusic])

  return {
    playMusic,
    stopMusic,
    setVolume
  }
}
