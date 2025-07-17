import { useEffect, useState } from 'react'
import { Card } from './components/Card'
import { CardType, generateCards } from './data/cards'

export default function App() {
  const [cards, setCards] = useState<CardType[]>([])
  const [first, setFirst] = useState<CardType | null>(null)
  const [second, setSecond] = useState<CardType | null>(null)
  const [disabled, setDisabled] = useState(false)

  useEffect(() => {
    setCards(generateCards())
  }, [])

  const handleClick = (card: CardType) => {
    if (disabled) return
    if (first?.id === card.id || card.matched) return

    if (!first) {
      setFirst(card)
    } else if (!second) {
      setSecond(card)
    }
  }

  useEffect(() => {
    if (first && second) {
      setDisabled(true)
      if (first.value === second.value) {
        setCards((prev) =>
          prev.map((card) =>
            card.value === first.value ? { ...card, matched: true } : card
          )
        )
        resetTurn()
      } else {
        setTimeout(resetTurn, 1000)
      }
    }
  }, [first, second])

  const resetTurn = () => {
    setFirst(null)
    setSecond(null)
    setDisabled(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-300 flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold mb-6 text-blue-900 text-center">Jogo da Memória – ODS 🌱</h1>
      <div className="grid grid-cols-4 gap-4 sm:grid-cols-4 md:grid-cols-6">
        {cards.map((card) => (
          <Card
            key={card.id}
            card={card}
            flipped={card === first || card === second || card.matched}
            onClick={() => handleClick(card)}
          />
        ))}
      </div>
    </div>
  )
}
