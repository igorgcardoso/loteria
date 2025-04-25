import { useGameStore } from "@/lib/zustand";

export function Contest() {
  const { lotteryContest } = useGameStore();

  return (
    <div className="flex flex-col items-center justify-center space-y-3 px-6">
      <div>
        <span className="">Concurso: </span>
        <span className="text-base font-bold">
          {Intl.NumberFormat("pt-BR").format(lotteryContest?.contest ?? 0)}
        </span>
      </div>

      <div className="flex flex-col flex-wrap items-center gap-2">
        <span className="">Resultado</span>
        <div className="flex items-center flex-wrap gap-2">
          {lotteryContest?.numbers
            .sort()
            .map((number) => <span key={number}>{number}</span>)}
        </div>
        {lotteryContest?.heartTime && (
          <div className="flex items-center gap-2">
            <span>Time do coração:</span>
            <span>{lotteryContest.heartTime}</span>
          </div>
        )}
        {(lotteryContest?.clovers.length ?? 0) > 0 && (
          <div className="flex items-center gap-2">
            <span>Trevos:</span>
            <div>
              {lotteryContest?.clovers.map((clover) => (
                <span key={clover}>{clover}</span>
              ))}
            </div>
          </div>
        )}
        {lotteryContest?.luckMonth && (
          <div className="flex items-center gap-2">
            <span>Mês de sorte:</span>
            <span>{lotteryContest.luckMonth}</span>
          </div>
        )}
      </div>
    </div>
  );
}
