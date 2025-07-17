export interface CardType {
  id: number
  value: string
  matched: boolean
}

const baseValues = ['🌍', '📚', '💧', '🍀', '🏥', '⚖️']

export const generateCards = (): CardType[] => {
  const duplicated = [...baseValues, ...baseValues]
  return duplicated
    .map((val, index) => ({
      id: index,
      value: val,
      matched: false,
    }))
    .sort(() => Math.random() - 0.5)
}
