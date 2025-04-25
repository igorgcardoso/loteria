import { type LotteryContest, useGameStore, type Game } from "../lib/zustand";
import { invoke } from "@tauri-apps/api/core";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export function Home() {
  const [games, setGames] = useState<Game[]>([]);
  const { setGame, setLotteryContest } = useGameStore();

  const navigate = useNavigate();

  async function handleClick(game: Game) {
    setGame(game);
    const lotteryContest = await invoke<LotteryContest>("get_lottery_contest", {
      lottery: game.slug.replace("-", ""),
    });
    setLotteryContest(lotteryContest);
    navigate("/game");
  }

  useEffect(() => {
    invoke<Game[]>("get_all_games").then((games) => {
      setGames(games);
    });
  }, []);
  return (
    <div className="space-y-6 px-4 py-5 pt-5 pb-14">
      {games.map((game) => (
        <button
          type="button"
          key={game.slug}
          style={{ background: game.color }}
          className="flex w-full items-center justify-center rounded py-4 text-2xl font-bold transition-opacity hover:opacity-70"
          onClick={() => handleClick(game)}
        >
          {game.name}
        </button>
      ))}
    </div>
  );
}
