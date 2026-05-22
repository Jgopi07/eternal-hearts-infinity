'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useGameStore } from '@/lib/game-store'
import { stories, getStoryCategories } from '@/lib/story-data'
import { characters } from '@/lib/character-data'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import {
  Heart,
  Search,
  ArrowLeft,
  Star,
  BookOpen,
  Users,
  Clock,
  Sparkles,
} from 'lucide-react'

export function StorySelection() {
  const {
    selectStory,
    setScreen,
    favoriteStories,
    toggleFavorite,
    completedStories,
  } = useGameStore()

  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [hoveredStory, setHoveredStory] = useState<string | null>(null)

  const categories = getStoryCategories()

  const filteredStories = stories.filter((story) => {
    const matchesSearch =
      story.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      story.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      story.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      )

    const matchesCategory =
      !selectedCategory || story.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  const getStoryCharacters = (characterIds: string[]) => {
    return characterIds
      .map((id) => characters.find((c) => c.id === id))
      .filter(Boolean)
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-10 left-10 w-72 h-72 bg-pink-500/10 rounded-full blur-3xl animate-pulse" />

        <div className="absolute bottom-10 right-10 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl animate-pulse" />

        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
          <div className="max-w-7xl mx-auto px-4 py-4">
            {/* Top Header */}
            <div className="flex items-center justify-between gap-4">
              {/* Back Button */}
              <Button
                variant="ghost"
                onClick={() => setScreen('menu')}
                className="flex items-center gap-2 hover:bg-primary/10"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="hidden sm:inline">Back to Menu</span>
              </Button>

              {/* Title */}
              <div className="text-center">
                <h1 className="text-2xl md:text-4xl font-extrabold bg-gradient-to-r from-pink-500 via-rose-500 to-orange-400 bg-clip-text text-transparent">
                  Choose Your Story
                </h1>

                <p className="hidden md:block text-sm text-muted-foreground mt-1">
                  Pick your favorite romantic journey
                </p>
              </div>

              {/* Search */}
              <div className="relative w-64 hidden md:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />

                <Input
                  placeholder="Search stories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 rounded-full border-border/50 bg-card/60 backdrop-blur-sm"
                />
              </div>
            </div>

            {/* Mobile Search */}
            <div className="md:hidden mt-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />

                <Input
                  placeholder="Search stories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 rounded-full"
                />
              </div>
            </div>

            {/* Categories */}
<div className="mt-6 overflow-x-auto scrollbar-hide">
  <motion.div
    drag="x"
    dragConstraints={{ left: -1200, right: 0 }}
    className="flex gap-3 min-w-max pb-2 pr-10"
  >
    <Button
      variant={selectedCategory === null ? 'default' : 'outline'}
      size="sm"
      onClick={() => setSelectedCategory(null)}
      className={`
        rounded-full px-5 py-5 text-sm font-semibold transition-all duration-300 whitespace-nowrap
        ${
          selectedCategory === null
            ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg shadow-pink-300/40'
            : 'bg-white/70 backdrop-blur-md border-pink-100 hover:bg-pink-50 hover:border-pink-300'
        }
      `}
    >
      All Stories
    </Button>

    {categories.map((category) => (
      <Button
        key={category}
        variant={
          selectedCategory === category ? 'default' : 'outline'
        }
        size="sm"
        onClick={() => setSelectedCategory(category)}
        className={`
          rounded-full px-5 py-5 text-sm font-medium whitespace-nowrap transition-all duration-300
          ${
            selectedCategory === category
              ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg shadow-pink-300/40'
              : 'bg-white/70 backdrop-blur-md border-pink-100 hover:bg-pink-50 hover:border-pink-300'
          }
        `}
      >
        {category}
      </Button>
    ))}
  </motion.div>
</div>
            
          </div>
        </header>

        {/* Stories Grid */}
        <main className="max-w-7xl mx-auto px-4 py-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7">
            <AnimatePresence mode="popLayout">
              {filteredStories.map((story, index) => {
                const storyCharacters = getStoryCharacters(
                  story.characterIds
                )

                const isFavorite = favoriteStories.includes(story.id)

                const isCompleted = completedStories.includes(story.id)

                const isHovered = hoveredStory === story.id

                return (
                  <motion.div
                    key={story.id}
                    layout
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{
                      duration: 0.35,
                      delay: index * 0.05,
                    }}
                    onMouseEnter={() => setHoveredStory(story.id)}
                    onMouseLeave={() => setHoveredStory(null)}
                    className="group"
                  >
                    <div
                      className={`
                        relative overflow-hidden rounded-3xl border border-border/50
                        bg-card/80 backdrop-blur-sm
                        transition-all duration-300
                        hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/10
                        ${
                          isCompleted
                            ? 'ring-2 ring-green-500/40'
                            : ''
                        }
                      `}
                    >
                      {/* Cover */}
                      <div
                        className={`
                          relative h-48 overflow-hidden
                          bg-gradient-to-br ${story.coverGradient}
                        `}
                      >
                        <div className="absolute inset-0 bg-black/20" />

                        {/* Floating Glow */}
                        <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl" />

                        {/* Characters */}
                        <motion.div
  animate={{
    scale: isHovered ? 1.08 : 1,
  }}
  transition={{ duration: 0.3 }}
  className="relative z-10 flex items-center justify-center h-full -space-x-5"
>
  {storyCharacters.slice(0, 2).map((char, i) => (
    <div
      key={char?.id}
      className="relative"
      style={{ zIndex: 2 - i }}
    >
      <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white/50 shadow-2xl bg-white/20 backdrop-blur-md">
        <img
          src={char?.image}
          alt={char?.name}
          className="w-full h-full object-cover"
        />
      </div>

     {/* <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[10px] font-semibold whitespace-nowrap">
        {char?.name.split(' ')[0]}
      </div>   */}
    </div>
  ))}
</motion.div>

                        {/* Hover Play */}
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{
                            opacity: isHovered ? 1 : 0,
                          }}
                          className="absolute inset-0 bg-black/50 flex items-center justify-center"
                        >
                          <Button
                            onClick={() => selectStory(story)}
                            className="rounded-full px-6 bg-primary hover:bg-primary/90 text-white shadow-lg"
                          >
                            <Sparkles className="w-4 h-4 mr-2" />
                            Play Now
                          </Button>
                        </motion.div>

                        {/* Favorite */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            toggleFavorite(story.id)
                          }}
                          className={`
                            absolute top-4 right-4 z-20 p-2 rounded-full
                            transition-all duration-200
                            ${
                              isFavorite
                                ? 'bg-red-500 text-white'
                                : 'bg-white/20 text-white hover:bg-white/30'
                            }
                          `}
                        >
                          <Heart
                            className={`w-4 h-4 ${
                              isFavorite ? 'fill-current' : ''
                            }`}
                          />
                        </button>

                        {/* Completed */}
                        {isCompleted && (
                          <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 shadow-md">
                            <Star className="w-3 h-3 fill-current" />
                            Completed
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div
                        className="p-5 cursor-pointer"
                        onClick={() => selectStory(story)}
                      >
                        <h3 className="text-xl font-bold text-foreground leading-tight mb-1">
                          {story.title}
                        </h3>

                        <p className="text-sm text-primary font-medium mb-3">
                          {story.subtitle}
                        </p>

                        <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                          {story.description}
                        </p>

                        {/* Stats */}
                        <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                          <span className="flex items-center gap-1">
                            <BookOpen className="w-3 h-3" />
                            {story.conversations.length} scenes
                          </span>

                          <span className="flex items-center gap-1">
                            <Users className="w-3 h-3" />
                            {story.characterIds.length} chars
                          </span>

                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            ~
                            {Math.ceil(
                              story.conversations.length * 0.5
                            )}
                            min
                          </span>
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2">
                          {story.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="px-3 py-1 rounded-full text-xs bg-secondary text-secondary-foreground"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </div>

          {/* Empty State */}
          {filteredStories.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-24"
            >
              <div className="w-24 h-24 mx-auto rounded-full bg-muted flex items-center justify-center mb-6">
                <Search className="w-10 h-10 text-muted-foreground" />
              </div>

              <h3 className="text-2xl font-bold text-foreground mb-2">
                No stories found
              </h3>

              <p className="text-muted-foreground">
                Try another search term or category
              </p>
            </motion.div>
          )}
        </main>
      </div>
    </div>
  )
}