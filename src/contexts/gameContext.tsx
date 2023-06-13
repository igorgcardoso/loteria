import { Game } from '@src/games';
import { ReactNode, createContext, useState } from 'react';

interface GameProviderProps {
  children: ReactNode;
}

interface Draw {
  maxNum: number;
  qtd: number;
  exclude?: number[];
  keep?: number[];
  numCards?: number;
}

interface DrewGame {
  title: string;
  numbers: number[];
}

export interface GameContextDataProps {
  game: Game;
  drewGames: DrewGame[];
  isDrawing: boolean;
  keptNumbers: number[];
  excludedNumbers: number[];
  drawNumbers: (draw: Draw) => void;
  clearDrewNumbers: () => void;
  setGame: (game: Game) => void;
  handleToggleExclude: (num: number) => void;
  handleToggleKeep: (num: number) => void;
  resetKetpAndExcluded: () => void;
}

export const GameContext = createContext({} as GameContextDataProps);

export function GameProvider({ children }: GameProviderProps) {
  const [game, setGame] = useState<Game>({} as Game);
  const [drewGames, setDrewGames] = useState<DrewGame[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [excludedNumbers, setExcludedNumbers] = useState<number[]>([]);
  const [keptNumbers, setKeptNumbers] = useState<number[]>([]);

  function drawNumbers({
    maxNum,
    qtd,
    exclude = [],
    keep = [],
    numCards = 1,
  }: Draw) {
    if (keep.length >= qtd) {
      return [];
    }

    if (exclude.length === maxNum) {
      return [];
    }

    if (maxNum - exclude.length < qtd) {
      return [];
    }

    setIsDrawing(true);

    for (let i = 0; i < numCards; i++) {
      const game: DrewGame = {
        title: `Cartão ${i + 1}`,
        numbers: [],
      };
      game.numbers.push(...keep);
      while (game.numbers.length < qtd) {
        const drew = Math.floor(Math.random() * maxNum) + 1;

        if (!exclude.includes(drew) && !game.numbers.includes(drew)) {
          game.numbers.push(drew);
        }
      }
      game.numbers.sort((a, b) => {
        if (a < b) {
          return -1;
        } else if (a === b) {
          return 0;
        } else {
          return 1;
        }
      });
      setDrewGames((prev) => [...prev, game]);
    }

    setIsDrawing(false);
  }

  function clearDrewNumbers() {
    setDrewGames([]);
  }

  function handleToggleExclude(num: number) {
    if (excludedNumbers.includes(num)) {
      setExcludedNumbers((prev) => prev.filter((elem) => elem !== num));
    } else {
      setExcludedNumbers((prev) => [...prev, num]);
    }
  }

  function handleToggleKeep(num: number) {
    if (keptNumbers.includes(num)) {
      setKeptNumbers((prev) => prev.filter((elem) => elem !== num));
    } else {
      setKeptNumbers((prev) => [...prev, num]);
    }
  }

  function resetKetpAndExcluded() {
    setKeptNumbers([]);
    setExcludedNumbers([]);
  }

  return (
    <GameContext.Provider
      value={{
        game,
        drewGames,
        isDrawing,
        keptNumbers,
        excludedNumbers,
        drawNumbers,
        clearDrewNumbers,
        setGame,
        handleToggleExclude,
        handleToggleKeep,
        resetKetpAndExcluded,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}
