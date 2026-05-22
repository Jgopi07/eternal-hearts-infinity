import { create } from 'zustand'
import { stories, type Story, type Conversation } from './story-data'
import { characters, type Character } from './character-data'

export type GameScreen = 'splash' | 'menu' | 'stories' | 'game' | 'gallery' | 'settings'

export type CharacterMood = 'neutral' | 'happy' | 'sad' | 'shy' | 'angry' | 'surprised' | 'love' | 'blush'

interface GameState {
  currentScreen: GameScreen
  selectedStory: Story | null
  currentConversationIndex: number
  isPlaying: boolean
  isMuted: boolean
  voiceEnabled: boolean
  musicVolume: number
  voiceVolume: number
  textSpeed: 'slow' | 'normal' | 'fast'
  autoPlay: boolean
  autoPlayDelay: number
  showingChoices: boolean
  selectedCharacter: Character | null
  characterMood: CharacterMood
  isTyping: boolean
  displayedText: string
  unlockedStories: string[]
  completedStories: string[]
  favoriteStories: string[]
  currentBackground: string
  showCharacterInfo: boolean
  
  setScreen: (screen: GameScreen) => void
  selectStory: (story: Story) => void
  nextConversation: () => void
  previousConversation: () => void
  jumpToConversation: (index: number) => void
  toggleMute: () => void
  toggleVoice: () => void
  setMusicVolume: (volume: number) => void
  setVoiceVolume: (volume: number) => void
  setTextSpeed: (speed: 'slow' | 'normal' | 'fast') => void
  toggleAutoPlay: () => void
  setCharacterMood: (mood: CharacterMood) => void
  setIsTyping: (typing: boolean) => void
  setDisplayedText: (text: string) => void
  unlockStory: (storyId: string) => void
  completeStory: (storyId: string) => void
  toggleFavorite: (storyId: string) => void
  setBackground: (bg: string) => void
  resetGame: () => void
  toggleCharacterInfo: () => void
}

export const useGameStore = create<GameState>((set, get) => ({
  currentScreen: 'splash',
  selectedStory: null,
  currentConversationIndex: 0,
  isPlaying: false,
  isMuted: false,
  voiceEnabled: true,
  musicVolume: 0.5,
  voiceVolume: 0.8,
  textSpeed: 'normal',
  autoPlay: true,
  autoPlayDelay: 3000,
  showingChoices: false,
  selectedCharacter: null,
  characterMood: 'neutral',
  isTyping: false,
  displayedText: '',
  unlockedStories: stories.map(s => s.id),
  completedStories: [],
  favoriteStories: [],
  currentBackground: '/backgrounds/romantic-sunset.jpg',
  showCharacterInfo: false,

  setScreen: (screen) => set({ currentScreen: screen }),
  
  selectStory: (story) => {
    const mainChar = characters.find(c => c.id === story.characterIds[0])
    set({ 
      selectedStory: story, 
      currentConversationIndex: 0,
      currentScreen: 'game',
      isPlaying: true,
      autoPlay: true,
      selectedCharacter: mainChar || null,
      currentBackground: story.background,
      characterMood: 'neutral',
      displayedText: ''
    })
  },
  
  nextConversation: () => {
    const { selectedStory, currentConversationIndex } = get()
    if (selectedStory && currentConversationIndex < selectedStory.conversations.length - 1) {
      const nextIndex = currentConversationIndex + 1
      const nextConv = selectedStory.conversations[nextIndex]
      const char = characters.find(c => c.id === nextConv.characterId)
      set({ 
        currentConversationIndex: nextIndex,
        selectedCharacter: char || null,
        characterMood: nextConv.mood || 'neutral',
        displayedText: '',
        isTyping: true
      })
    } else if (selectedStory) {
      get().completeStory(selectedStory.id)
    }
  },
  
  previousConversation: () => {
    const { currentConversationIndex, selectedStory } = get()
    if (currentConversationIndex > 0) {
      const prevIndex = currentConversationIndex - 1
      const prevConv = selectedStory?.conversations[prevIndex]
      const char = characters.find(c => c.id === prevConv?.characterId)
      set({ 
        currentConversationIndex: prevIndex,
        selectedCharacter: char || null,
        characterMood: prevConv?.mood || 'neutral',
        displayedText: ''
      })
    }
  },
  
  jumpToConversation: (index) => {
    const { selectedStory } = get()
    if (selectedStory && index >= 0 && index < selectedStory.conversations.length) {
      const conv = selectedStory.conversations[index]
      const char = characters.find(c => c.id === conv.characterId)
      set({ 
        currentConversationIndex: index,
        selectedCharacter: char || null,
        characterMood: conv.mood || 'neutral',
        displayedText: ''
      })
    }
  },
  
  toggleMute: () => set((state) => ({ isMuted: !state.isMuted })),
  toggleVoice: () => set((state) => ({ voiceEnabled: !state.voiceEnabled })),
  setMusicVolume: (volume) => set({ musicVolume: volume }),
  setVoiceVolume: (volume) => set({ voiceVolume: volume }),
  setTextSpeed: (speed) => set({ textSpeed: speed }),
  toggleAutoPlay: () => set((state) => ({ autoPlay: !state.autoPlay })),
  setCharacterMood: (mood) => set({ characterMood: mood }),
  setIsTyping: (typing) => set({ isTyping: typing }),
  setDisplayedText: (text) => set({ displayedText: text }),
  
  unlockStory: (storyId) => set((state) => ({
    unlockedStories: state.unlockedStories.includes(storyId) 
      ? state.unlockedStories 
      : [...state.unlockedStories, storyId]
  })),
  
  completeStory: (storyId) => set((state) => ({
    completedStories: state.completedStories.includes(storyId)
      ? state.completedStories
      : [...state.completedStories, storyId]
  })),
  
  toggleFavorite: (storyId) => set((state) => ({
    favoriteStories: state.favoriteStories.includes(storyId)
      ? state.favoriteStories.filter(id => id !== storyId)
      : [...state.favoriteStories, storyId]
  })),
  
  setBackground: (bg) => set({ currentBackground: bg }),
  
  resetGame: () => set({
    currentScreen: 'menu',
    selectedStory: null,
    currentConversationIndex: 0,
    isPlaying: false,
    characterMood: 'neutral',
    displayedText: ''
  }),
  
  toggleCharacterInfo: () => set((state) => ({ showCharacterInfo: !state.showCharacterInfo }))
}))
