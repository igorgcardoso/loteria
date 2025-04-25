import { create } from "zustand";

export type Game = {
  name: string;
  maxNum: number;
  drawnNum: number;
  color: string;
  slug: string;
};

export type LotteryContest = {
  contest: 0;
  numbers: number[];
  luckMonth: string | null;
  heartTime: string | null;
  clovers: string[];
};

export type GeneratedCard = {
  card: number;
  numbers: number[];
};

type GameState = {
  game: Game | null;
  setGame: (game: Game) => void;
  resetGame: () => void;
  lotteryContest: LotteryContest | null;
  setLotteryContest: (lotteryContest: LotteryContest) => void;
  resetLotteryContest: () => void;
  generatedCards: GeneratedCard[];
  setGeneratedCards: (generatedCards: GeneratedCard[]) => void;
  resetGeneratedCards: () => void;
};

export const useGameStore = create<GameState>()((set) => ({
  game: null,
  setGame: (game: Game) => set({ game }),
  resetGame: () => set({ game: null }),
  lotteryContest: null,
  setLotteryContest: (lotteryContest: LotteryContest) =>
    set({ lotteryContest }),
  resetLotteryContest: () => set({ lotteryContest: null }),
  generatedCards: [],
  setGeneratedCards: (generatedCards: GeneratedCard[]) =>
    set({ generatedCards }),
  resetGeneratedCards: () => set({ generatedCards: [] }),
}));
