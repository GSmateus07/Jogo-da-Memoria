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

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-100 px-4 py-6 text-xl overflow-x-hidden">
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
        <div className="flex flex-col items-center justify-center space-y-6 w-full">
          <div className="text-4xl font-extrabold text-green-800 text-center">
            Tentativas corretas: {correctAttempts}
          </div>

          <div className="text-2xl font-semibold text-gray-800 text-center">
            Nível {level}
          </div>

          <div className="w-full overflow-x-hidden px-2">
            <div
              className="grid gap-3"
              style={{
                gridTemplateColumns: 'repeat(auto-fit, minmax(70px, 1fr))',
                maxWidth: '100%',
              }}
            >
              {cards.map((card, index) => {
                const isFlipped = flippedIndexes.includes(index) || matchedIndexes.includes(index);
                return (
                  <div
                    key={index}
                    onClick={() => handleCardClick(index)}
                    className={`aspect-square w-full flex items-center justify-center rounded-md shadow cursor-pointer text-4xl sm:text-5xl transition-transform duration-300 ${
                      isFlipped ? 'bg-white text-black' : 'bg-gray-400 text-gray-300'
                    }`}
                  >
                    {isFlipped ? card : '❓'}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
