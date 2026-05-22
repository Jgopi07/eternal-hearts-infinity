export interface Character {
  id: string
  name: string
  age: number
  gender: 'male' | 'female'
  role: string
  personality: string
  description: string
  image: string
  avatar: string
  voiceType:
    | 'male-deep'
    | 'male-soft'
    | 'male-energetic'
    | 'female-sweet'
    | 'female-mature'
    | 'female-cheerful'
  hairColor: string
  eyeColor: string
  skinTone: string
  outfit: string
  traits: string[]
  interests: string[]
  likes: string[]
  dislikes: string[]
  quote: string
  colors: {
    primary: string
    secondary: string
  }
}

export const characters: Character[] = [
  {
    id: 'pranay',
    name: 'Pranay Teja',
    age: 23,
    gender: 'male',
    role: 'Music Producer',
    personality: 'Cold outside but deeply caring',
    description:
      'A mysterious music producer who hides emotions behind silence and confidence.',
    image: '/characters/pranay.jpeg',
    avatar: '🎧',
    voiceType: 'male-deep',
    hairColor: '#111827',
    eyeColor: '#3b82f6',
    skinTone: '#e0ac69',
    outfit: 'Black oversized hoodie',
    traits: ['Calm', 'Protective', 'Smart', 'Romantic'],
    interests: ['Music', 'Gaming', 'Night Drives'],
    likes: ['Rain', 'Coffee', 'Peace'],
    dislikes: ['Fake people', 'Noise'],
    quote: 'Some emotions are better felt than spoken.',
    colors: {
      primary: 'from-blue-500',
      secondary: 'to-indigo-700',
    },
  },

  {
    id: 'nikhil',
    name: 'Nikhil Sai',
    age: 22,
    gender: 'male',
    role: 'Basketball Captain',
    personality: 'Energetic and playful',
    description:
      'A confident basketball captain loved by everyone for his charm.',
    image: '/characters/nikhil.jpeg',
    avatar: '🏀',
    voiceType: 'male-energetic',
    hairColor: '#1f2937',
    eyeColor: '#22c55e',
    skinTone: '#d6a77a',
    outfit: 'Sports jacket',
    traits: ['Funny', 'Loyal', 'Friendly'],
    interests: ['Basketball', 'Fitness', 'Travel'],
    likes: ['Adventure', 'Friends'],
    dislikes: ['Negativity'],
    quote: 'Life is better when you enjoy every second.',
    colors: {
      primary: 'from-green-500',
      secondary: 'to-emerald-700',
    },
  },

  {
    id: 'arjun',
    name: 'Arjun Reddy',
    age: 24,
    gender: 'male',
    role: 'Startup CEO',
    personality: 'Confident and ambitious',
    description:
      'A successful entrepreneur searching for genuine love and peace.',
    image: '/characters/arjun.jpeg',
    avatar: '💼',
    voiceType: 'male-soft',
    hairColor: '#27272a',
    eyeColor: '#f59e0b',
    skinTone: '#e8b07c',
    outfit: 'Luxury formal suit',
    traits: ['Focused', 'Romantic', 'Smart'],
    interests: ['Business', 'Cars', 'Technology'],
    likes: ['Success', 'Luxury'],
    dislikes: ['Drama'],
    quote: 'Success means nothing without someone beside you.',
    colors: {
      primary: 'from-amber-500',
      secondary: 'to-orange-700',
    },
  },

  {
    id: 'charan',
    name: 'Charan Kumar',
    age: 25,
    gender: 'male',
    role: 'Gaming Streamer',
    personality: 'Funny and intelligent',
    description:
      'A famous streamer with millions of fans and a soft heart.',
    image: '/characters/charan.jpeg',
    avatar: '🎮',
    voiceType: 'male-energetic',
    hairColor: '#18181b',
    eyeColor: '#8b5cf6',
    skinTone: '#f1c27d',
    outfit: 'Anime hoodie',
    traits: ['Creative', 'Funny', 'Playful'],
    interests: ['Gaming', 'Anime', 'Streaming'],
    likes: ['Gaming', 'Music'],
    dislikes: ['Lag'],
    quote: 'You are my favorite notification.',
    colors: {
      primary: 'from-violet-500',
      secondary: 'to-fuchsia-700',
    },
  },

  {
    id: 'uday',
    name: 'Uday Varma',
    age: 21,
    gender: 'male',
    role: 'Photographer',
    personality: 'Creative and emotional',
    description:
      'A passionate photographer who captures emotions through art.',
    image: '/characters/uday.jpeg',
    avatar: '📸',
    voiceType: 'male-soft',
    hairColor: '#374151',
    eyeColor: '#06b6d4',
    skinTone: '#d9a066',
    outfit: 'Denim jacket',
    traits: ['Creative', 'Gentle', 'Emotional'],
    interests: ['Photography', 'Travel'],
    likes: ['Sunsets', 'Nature'],
    dislikes: ['Routine'],
    quote: 'Every picture holds an untold emotion.',
    colors: {
      primary: 'from-cyan-500',
      secondary: 'to-sky-700',
    },
  },

  {
    id: 'gowtham',
    name: 'Gowtham Goud',
    age: 22,
    gender: 'male',
    role: 'Tech Genius',
    personality: 'Quiet and intelligent',
    description:
      'A coding genius who prefers books and stars over crowds.',
    image: '/characters/gowtham.jpeg',
    avatar: '💻',
    voiceType: 'male-deep',
    hairColor: '#0f172a',
    eyeColor: '#2563eb',
    skinTone: '#e0ac69',
    outfit: 'Minimal sweatshirt',
    traits: ['Smart', 'Focused', 'Introverted'],
    interests: ['Coding', 'Astronomy'],
    likes: ['Peace', 'Libraries'],
    dislikes: ['Noise'],
    quote: 'Silence often says more than words.',
    colors: {
      primary: 'from-slate-500',
      secondary: 'to-blue-700',
    },
  },

  {
    id: 'ananya',
    name: 'Ananya Kapoor',
    age: 21,
    gender: 'female',
    role: 'Fashion Creator',
    personality: 'Elegant and cheerful',
    description:
      'A social media fashion influencer with a positive vibe.',
    image: '/characters/ananya.jpeg',
    avatar: '🌸',
    voiceType: 'female-cheerful',
    hairColor: '#4c1d95',
    eyeColor: '#ec4899',
    skinTone: '#f8c8a0',
    outfit: 'Pink aesthetic outfit',
    traits: ['Stylish', 'Confident', 'Kind'],
    interests: ['Fashion', 'Photography'],
    likes: ['Flowers', 'Shopping'],
    dislikes: ['Rudeness'],
    quote: 'Smiles make everything prettier.',
    colors: {
      primary: 'from-pink-500',
      secondary: 'to-rose-400',
    },
  },

  {
    id: 'sadhana',
    name: 'Sadhana Reddy',
    age: 22,
    gender: 'female',
    role: 'Artist',
    personality: 'Soft and artistic',
    description:
      'A calm artist who expresses feelings through paintings.',
    image: '/characters/sadhana.jpeg',
    avatar: '🎨',
    voiceType: 'female-sweet',
    hairColor: '#5b21b6',
    eyeColor: '#c084fc',
    skinTone: '#f5cfa0',
    outfit: 'Soft sweater',
    traits: ['Creative', 'Gentle', 'Romantic'],
    interests: ['Painting', 'Poetry'],
    likes: ['Rain', 'Books'],
    dislikes: ['Crowds'],
    quote: 'Art speaks when words cannot.',
    colors: {
      primary: 'from-purple-400',
      secondary: 'to-pink-400',
    },
  },

  {
    id: 'shreya',
    name: 'Shreya Varma',
    age: 23,
    gender: 'female',
    role: 'Classical Dancer',
    personality: 'Graceful and emotional',
    description:
      'A passionate dancer who tells stories through movement.',
    image: '/characters/shreya.jpeg',
    avatar: '💃',
    voiceType: 'female-mature',
    hairColor: '#3f1d1d',
    eyeColor: '#fb7185',
    skinTone: '#f1c27d',
    outfit: 'Traditional fusion outfit',
    traits: ['Elegant', 'Strong', 'Graceful'],
    interests: ['Dance', 'Music'],
    likes: ['Nature', 'Peace'],
    dislikes: ['Disrespect'],
    quote: 'Every heartbeat has its own rhythm.',
    colors: {
      primary: 'from-rose-500',
      secondary: 'to-orange-400',
    },
  },

  {
    id: 'chandana',
    name: 'Chandana Reddy',
    age: 20,
    gender: 'female',
    role: 'Book Lover',
    personality: 'Dreamy and intelligent',
    description:
      'A romantic girl who believes in true love stories.',
    image: '/characters/chandana.jpeg',
    avatar: '📚',
    voiceType: 'female-sweet',
    hairColor: '#37221f',
    eyeColor: '#60a5fa',
    skinTone: '#f5d7b2',
    outfit: 'Cozy cardigan',
    traits: ['Soft', 'Calm', 'Smart'],
    interests: ['Books', 'Writing'],
    likes: ['Rain', 'Coffee'],
    dislikes: ['Noise'],
    quote: 'Every story becomes magical with the right person.',
    colors: {
      primary: 'from-sky-400',
      secondary: 'to-blue-600',
    },
  },

  {
    id: 'ayesha',
    name: 'Ayesha Saniya',
    age: 22,
    gender: 'female',
    role: 'Singer',
    personality: 'Sweet and emotional',
    description:
      'A talented singer whose voice touches hearts instantly.',
    image: '/characters/ayesha.jpeg',
    avatar: '🎤',
    voiceType: 'female-cheerful',
    hairColor: '#7c3aed',
    eyeColor: '#f472b6',
    skinTone: '#f3c98b',
    outfit: 'Stage aesthetic outfit',
    traits: ['Talented', 'Kind', 'Cheerful'],
    interests: ['Music', 'Concerts'],
    likes: ['Moonlight', 'Flowers'],
    dislikes: ['Loneliness'],
    quote: 'Music connects hearts beyond words.',
    colors: {
      primary: 'from-fuchsia-500',
      secondary: 'to-pink-600',
    },
  },

  {
    id: 'sri',
    name: 'Bhanu sri',
    age: 24,
    gender: 'female',
    role: 'Luxury Designer',
    personality: 'Elegant and mature',
    description:
      'A confident designer with sophisticated style and charm.',
    image: '/characters/bhanu.jpeg',
    avatar: '✨',
    voiceType: 'female-mature',
    hairColor: '#4b1d1d',
    eyeColor: '#f97316',
    skinTone: '#e8b07c',
    outfit: 'Luxury modern saree',
    traits: ['Elegant', 'Focused', 'Stylish'],
    interests: ['Fashion', 'Travel'],
    likes: ['Luxury', 'Creativity'],
    dislikes: ['Immaturity'],
    quote: 'Elegance is confidence without words.',
    colors: {
      primary: 'from-orange-500',
      secondary: 'to-rose-500',
    },
  },
]

export const getCharacterById = (
  id: string
): Character | undefined => {
  return characters.find(character => character.id === id)
}

export const getMaleCharacters = (): Character[] => {
  return characters.filter(character => character.gender === 'male')
}

export const getFemaleCharacters = (): Character[] => {
  return characters.filter(character => character.gender === 'female')
}