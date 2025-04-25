import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { generateRange } from "@/utils/generate-range";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { type GeneratedCard, useGameStore } from "@/lib/zustand";
import { invoke } from "@tauri-apps/api/core";

export function Generator() {
  const { game, setGeneratedCards } = useGameStore();
  const [numbersToKeep, setNumbersToKeep] = useState<number[]>([]);
  const [numbersToExclude, setNumbersToExclude] = useState<number[]>([]);
  const [cardsToGenerate, setCardsToGenerate] = useState<number>(1);

  function handleGenerate() {
    console.log("here");
    invoke<GeneratedCard[]>("generate_cards", {
      numCards: cardsToGenerate,
      maxNum: game?.maxNum ?? 2,
      numToDraw: game?.drawnNum ?? 0,
      numbersToKeep,
      numbersToExclude,
    })
      .then((generatedCards) => {
        console.log(generatedCards);
        setGeneratedCards(generatedCards);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <div className="flex flex-col items-center justify-center space-y-3 px-6">
      <div className="flex items-center gap-5">
        <span>Cartões para serem gerados</span>
        <Input
          className="max-w-28"
          value={cardsToGenerate}
          onChange={(e) => setCardsToGenerate(Number(e.target.value))}
          type="number"
        />
      </div>

      <Collapsible>
        <CollapsibleTrigger className="flex w-full items-center justify-center gap-4 transition-opacity hover:opacity-60">
          Números para manter
          <ChevronDown />
        </CollapsibleTrigger>
        <CollapsibleContent className="flex flex-wrap gap-5 px-3 py-4">
          {generateRange(game?.maxNum ?? 0).map((num) => (
            <div key={num} className="flex items-center gap-2">
              <Checkbox
                id={num.toString()}
                checked={numbersToKeep.includes(num)}
                onCheckedChange={() => {
                  if (numbersToKeep.includes(num)) {
                    setNumbersToKeep(numbersToKeep.filter((n) => n !== num));
                  } else {
                    setNumbersToKeep([...numbersToKeep, num]);
                  }
                }}
                className="size-4 data-[state=checked]:bg-green-600"
                disabled={
                  !numbersToKeep.includes(num) &&
                  numbersToKeep.length >= (game?.drawnNum ?? 0)
                }
              />
              <label htmlFor={num.toString()}>{num}</label>
            </div>
          ))}
          {numbersToKeep.length >= 1 && (
            <Button className="ml-auto" onClick={() => setNumbersToKeep([])}>
              Limpar
            </Button>
          )}
        </CollapsibleContent>
      </Collapsible>
      <Collapsible>
        <CollapsibleTrigger className="flex w-full items-center justify-center gap-4 transition-opacity hover:opacity-60">
          Números para excluir
          <ChevronDown />
        </CollapsibleTrigger>
        <CollapsibleContent className="flex flex-wrap gap-5 px-3 py-4">
          {generateRange(game?.maxNum ?? 0).map((num) => (
            <div key={num} className="flex items-center gap-2">
              <Checkbox
                id={num.toString()}
                className="size-4 data-[state=checked]:bg-green-600"
                checked={numbersToExclude.includes(num)}
                onCheckedChange={() => {
                  if (numbersToExclude.includes(num)) {
                    setNumbersToExclude(
                      numbersToExclude.filter((n) => n !== num),
                    );
                  } else {
                    setNumbersToExclude([...numbersToExclude, num]);
                  }
                }}
                disabled={
                  !numbersToExclude.includes(num) &&
                  numbersToExclude.length >=
                    (game?.maxNum ?? 0) - (game?.drawnNum ?? 0)
                }
              />
              <label htmlFor={num.toString()}>{num}</label>
            </div>
          ))}
          {numbersToExclude.length >= 1 && (
            <Button className="ml-auto" onClick={() => setNumbersToExclude([])}>
              Limpar
            </Button>
          )}
        </CollapsibleContent>
      </Collapsible>
      <Button
        className="hover:bg-green900/60 w-full bg-green-900 transition-colors"
        onClick={handleGenerate}
        disabled={
          cardsToGenerate <= 0 ||
          numbersToKeep.length >= (game?.drawnNum ?? 0) ||
          numbersToExclude.length >= (game?.maxNum ?? 0) - (game?.drawnNum ?? 0)
        }
      >
        Gerar
      </Button>
    </div>
  );
}
