import { useGameStore } from "@/lib/zustand";
import { ChevronLeft } from "lucide-react";
import { NavLink } from "react-router";

export function Header() {
  const { game } = useGameStore();

  return (
    <div className="flex w-full items-center justify-between bg-slate-900 py-5 pl-4 text-2xl font-bold text-white">
      <NavLink
        to="/"
        className="flex items-center justify-center rounded px-2 hover:bg-slate-800/60"
      >
        <ChevronLeft className="size-6" />
      </NavLink>
      <span>{game?.name}</span>
      <div />
    </div>
  );
}
