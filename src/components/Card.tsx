import React from 'react'
import { CardType } from '../data/cards'

interface CardProps {
  card: CardType
  onClick: () => void
  flipped: boolean
}

export const Card: React.FC<CardProps> = ({ card, onClick, flipped }) => {
  return (
    <div
      className={`w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 flex items-center justify-center rounded-xl text-3xl shadow-md cursor-pointer transition-transform duration-300 ${flipped ? 'bg-white' : 'bg-blue-600'}`}
      onClick={onClick}
    >
      {flipped || card.matched ? card.value : '❓'}
    </div>
  )
}