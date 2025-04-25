import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useGameStore } from "@/lib/zustand";
import { Share2 } from "lucide-react";
import { writeText } from "@tauri-apps/plugin-clipboard-manager";

export function Generated() {
  const { generatedCards } = useGameStore();

  function handleShare() {
    let text = "";
    generatedCards.forEach((game, idx) => {
      text += `Cartão ${game.card}\n`;
      text += `${game.numbers.join(" ")}${
        idx === generatedCards.length - 1 ? "" : "\n\n"
      }`;
    });

    console.log(text);
    writeText(text);
  }

  return (
    <div className="flex flex-1 flex-col gap-4">
      <div className="flex items-center justify-between px-2">
        <span className="text-xl font-bold">Cartões Gerados</span>
        <Button variant="ghost" onClick={handleShare}>
          <Share2 className="size-5" />
        </Button>
      </div>
      <ScrollArea className="h-[460px] w-full px-4">
        <div className="space-y-4 pb-40">
          {generatedCards.map((card) => (
            <div key={card.card} className="flex flex-col gap-2">
              <div className="flex flex-row gap-2">
                <span className="font-bold">
                  Cartão {Intl.NumberFormat("pt-BR").format(card.card)}
                </span>
              </div>
              <div className="flex flex-row flex-wrap gap-3">
                {card.numbers.map((number) => (
                  <span key={number} className="font-bold">
                    {number}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
