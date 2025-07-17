import { useState, useEffect } from 'react';

const allCards = ['🍎', '🍌', '🍇', '🍓', '🍉', '🍒'];

const levels = [
  { level: 1, pairs: 2 },
  { level: 2, pairs: 3 },
  { level: 3, pairs: 4 },
  { level: 4, pairs: 5 },
  { level: 5, pairs: 6 },
];

export default function Game() {
  const [started, setStarted] = useState(false);
  const [level, setLevel] = useState(1);
  const [cards, setCards] = useState<string[]>([]);
  const [flippedIndexes, setFlippedIndexes] = useState<number[]>([]);
  const [matchedIndexes, setMatchedIndexes] = useState<number[]>([]);
  const [correctAttempts, setCorrectAttempts] = useState(0);

  const shuffle = (array: string[]) => {
    return [...array].sort(() => Math.random() - 0.5);
  };

  const startLevel = (currentLevel: number) => {
    const levelData = levels.find((l) => l.level === currentLevel);
    if (!levelData) return;

    const numPairs = levelData.pairs;
    const selectedCards = allCards.slice(0, numPairs);
    const cardsForLevel = shuffle([...selectedCards, ...selectedCards]);

    setCards(cardsForLevel);
    setMatchedIndexes([]);
    setFlippedIndexes([]);
    setCorrectAttempts(0);
  };

  const startGame = () => {
    setLevel(1);
    setStarted(true);
    startLevel(1);
  };

  const nextLevel = () => {
    const next = level + 1;
    if (next <= levels.length) {
      setLevel(next);
      startLevel(next);
    } else {
      alert('🎉 Parabéns! Você completou todos os níveis!');
      setStarted(false);
      setLevel(1);
    }
  };

  const handleCardClick = (index: number) => {
    if (flippedIndexes.includes(index) || matchedIndexes.includes(index)) return;
    if (flippedIndexes.length === 2) return;

    const newFlipped = [...flippedIndexes, index];
    setFlippedIndexes(newFlipped);

    if (newFlipped.length === 2) {
      const [first, second] = newFlipped;
      if (cards[first] === cards[second]) {
        setMatchedIndexes((prev) => [...prev, first, second]);
        setCorrectAttempts((prev) => prev + 1);
        setTimeout(() => setFlippedIndexes([]), 800);
      } else {
        setTimeout(() => setFlippedIndexes([]), 800);
      }
    }
  };

  useEffect(() => {
    if (matchedIndexes.length === cards.length && cards.length > 0) {
      setTimeout(() => nextLevel(), 1000);
    }
  }, [matchedIndexes]);

  const levelData = levels.find((l) => l.level === level);
  const columns = Math.min((levelData?.pairs ?? 2) * 2, 6);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-100 p-6 text-xl">
      {!started ? (
        <div className="flex flex-col items-center justify-center text-center space-y-6">
          <div className="text-4xl font-bold text-gray-800">Seja Bem-vindo</div>
          <div className="text-2xl text-gray-700">Ao jogo da Memória - ODS</div>

          <button
            onClick={startGame}
            className="px-9 py-6 mt-6 text-2xl text-white bg-green-600 rounded-xl hover:bg-green-700 transition"
          >
            Iniciar Jogo
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center space-y-6">
          <div className="text-4xl font-extrabold text-green-800">
            Tentativas corretas: {correctAttempts}
          </div>

          <div className="text-2xl font-semibold text-gray-800">Nível {level}</div>

          <div
            className="grid gap-4 sm:gap-6"
            style={{
                gridTemplateColumns: 'repeat(auto-fit, minmax(5.5rem, 1fr))',
                width: '100%',
                maxWidth: '600px',
            }}
          >
            {cards.map((card, index) => {
              const isFlipped =
                flippedIndexes.includes(index) || matchedIndexes.includes(index);
              return (
                <div
                  key={index}
                  onClick={() => handleCardClick(index)}
                  className={`flex items-center justify-center w-24 h-24 sm:w-28 sm:h-28 rounded-lg shadow cursor-pointer text-6xl transition-transform duration-300 ${
                    isFlipped ? 'bg-white text-black' : 'bg-gray-500 text-gray-500'
                  }`}
                >
                  {isFlipped ? card : '❓'}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}