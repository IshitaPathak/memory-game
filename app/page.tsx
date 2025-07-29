"use client"

import { useState, useEffect } from "react"
import { RetroHeader } from "@/components/ardacity/ar-retro-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  RefreshCw, 
  Trophy, 
  Clock, 
  Star,
  Zap,
  Heart
} from "lucide-react"

interface Card {
  id: number
  emoji: string
  isFlipped: boolean
  isMatched: boolean
}

const emojis = ["🎮", "🎲", "🎯", "🎪", "🎨", "🎭", "🎪", "🎨"]

export default function Home() {
  const [cards, setCards] = useState<Card[]>([])
  const [flippedCards, setFlippedCards] = useState<number[]>([])
  const [moves, setMoves] = useState(0)
  const [score, setScore] = useState(0)
  const [gameWon, setGameWon] = useState(false)
  const [gameStarted, setGameStarted] = useState(false)

  // Initialize game
  const initializeGame = () => {
    const gameCards = [...emojis, ...emojis]
      .sort(() => Math.random() - 0.5)
      .map((emoji, index) => ({
        id: index,
        emoji,
        isFlipped: false,
        isMatched: false
      }))
    
    setCards(gameCards)
    setFlippedCards([])
    setMoves(0)
    setScore(0)
    setGameWon(false)
    setGameStarted(true)
  }

  // Handle card click
  const handleCardClick = (cardId: number) => {
    if (!gameStarted) return
    
    const card = cards.find(c => c.id === cardId)
    if (!card || card.isFlipped || card.isMatched || flippedCards.length >= 2) return

    const newFlippedCards = [...flippedCards, cardId]
    setFlippedCards(newFlippedCards)

    // Flip the card
    setCards(prev => prev.map(c => 
      c.id === cardId ? { ...c, isFlipped: true } : c
    ))

    // Check for match when two cards are flipped
    if (newFlippedCards.length === 2) {
      setMoves(prev => prev + 1)
      
      const [firstId, secondId] = newFlippedCards
      const firstCard = cards.find(c => c.id === firstId)
      const secondCard = cards.find(c => c.id === secondId)

      if (firstCard?.emoji === secondCard?.emoji) {
        // Match found!
        setScore(prev => prev + 10)
        setCards(prev => prev.map(c => 
          c.id === firstId || c.id === secondId 
            ? { ...c, isMatched: true } 
            : c
        ))
        setFlippedCards([])
        
        // Check if game is won
        setTimeout(() => {
          const allMatched = cards.every(c => c.isMatched)
          if (allMatched) {
            setGameWon(true)
          }
        }, 500)
      } else {
        // No match, flip cards back
        setTimeout(() => {
          setCards(prev => prev.map(c => 
            c.id === firstId || c.id === secondId 
              ? { ...c, isFlipped: false } 
              : c
          ))
          setFlippedCards([])
        }, 1000)
      }
    }
  }

  const handleSearch = (query: string, filter: string) => {
    if (query.toLowerCase().includes('start') || query.toLowerCase().includes('play')) {
      initializeGame()
    }
  }

  const handleNavToggle = (option: string) => {
    if (option === "WEB") {
      setGameStarted(false)
    } else if (option === "ARNS") {
      initializeGame()
    }
  }

  const handleStatusClick = () => {
    alert(`🎮 Memory Game Status\n📊 Moves: ${moves}\n⭐ Score: ${score}\n🎯 Matches: ${cards.filter(c => c.isMatched).length / 2}\n⚡ Status: ${gameWon ? 'Won!' : gameStarted ? 'Playing' : 'Ready'}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Retro Header */}
      <RetroHeader
        title="RETRO"
        subtitle="MEMORY"
        highlightedWord="GAME"
        navToggleOptions={["WEB", "ARNS"]}
        statusText="STATUS"
        searchPlaceholder="Type 'start' to begin game..."
        searchFilters={["Start", "Reset", "Score", "Help"]}
        primaryColor="#6366f1"
        secondaryColor="#f8fafc"
        accentColor="#10b981"
        backgroundColor="transparent"
        textColor="#f8fafc"
        onSearch={handleSearch}
        onNavToggle={handleNavToggle}
        onStatusClick={handleStatusClick}
      />

      {/* Game Section */}
      <div className="relative z-10 px-6 lg:px-12 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Game Stats */}
          <div className="flex justify-center gap-8 mb-8">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
              <Clock className="w-5 h-5 text-blue-400" />
              <span className="text-white font-mono">Moves: {moves}</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
              <Star className="w-5 h-5 text-yellow-400" />
              <span className="text-white font-mono">Score: {score}</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
              <Heart className="w-5 h-5 text-red-400" />
              <span className="text-white font-mono">Matches: {cards.filter(c => c.isMatched).length / 2}</span>
            </div>
          </div>

          {/* Game Instructions */}
          {!gameStarted && (
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 mb-8">
              <CardHeader>
                <CardTitle className="text-white text-center">How to Play</CardTitle>
              </CardHeader>
              <CardContent className="text-center text-gray-300">
                <p className="mb-4">Find matching pairs of cards by flipping them over.</p>
                <p className="mb-4">Click the cards to reveal them, and try to remember their positions!</p>
                <Button 
                  onClick={initializeGame}
                  className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
                >
                  <Zap className="w-4 h-4 mr-2" />
                  Start Game
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Victory Message */}
          {gameWon && (
            <Card className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-sm border-green-500/30 mb-8">
              <CardHeader>
                <CardTitle className="text-white text-center flex items-center justify-center gap-2">
                  <Trophy className="w-6 h-6 text-yellow-400" />
                  Congratulations!
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center text-gray-300">
                <p className="mb-4">You won in {moves} moves with a score of {score}!</p>
                <Button 
                  onClick={initializeGame}
                  className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Play Again
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Game Grid */}
          <div className="grid grid-cols-4 gap-4 max-w-md mx-auto">
            {cards.map((card) => (
              <div
                key={card.id}
                onClick={() => handleCardClick(card.id)}
                className={`
                  aspect-square rounded-lg cursor-pointer transition-all duration-300 transform hover:scale-105
                  ${card.isMatched 
                    ? 'bg-green-500/20 border-2 border-green-500/50' 
                    : card.isFlipped 
                      ? 'bg-white/20 border-2 border-white/50' 
                      : 'bg-indigo-500/20 border-2 border-indigo-500/50 hover:bg-indigo-500/30'
                  }
                  ${card.isMatched ? 'animate-pulse' : ''}
                `}
              >
                <div className="w-full h-full flex items-center justify-center text-4xl">
                  {(card.isFlipped || card.isMatched) ? card.emoji : '❓'}
                </div>
              </div>
            ))}
          </div>

          {/* Game Controls */}
          {gameStarted && !gameWon && (
            <div className="flex justify-center mt-6">
              <Button 
                onClick={initializeGame}
                className="group relative overflow-hidden bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white font-bold px-8 py-3 rounded-xl border-2 border-red-400/50 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <RefreshCw className="w-5 h-5 mr-3 group-hover:rotate-180 transition-transform duration-500" />
                <span className="relative z-10">Reset Game</span>
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="py-8 px-6 lg:px-12 border-t border-white/10 mt-auto">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-400">
            Built with ❤️ using <span className="text-indigo-400 font-semibold">ArDacity</span> Retro Header
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Simple, fun, and retro-styled memory game
          </p>
        </div>
      </footer>
    </div>
  )
}
