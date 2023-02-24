interface Draw {
  maxNum: number;
  qtd: number;
  exclude?: number[];
  keep: number[];
  numCards?: number;
}

export interface Game {
  title: string;
  numbers: number[];
}

export function drawNumbers({
  maxNum,
  qtd,
  exclude,
  keep,
  numCards = 1,
}: Draw): Game[] {
  const games: Game[] = [];

  if (keep.length > qtd) {
    return [];
  }

  if (keep.length === qtd) {
    return [];
  }

  if (exclude?.length === maxNum) {
    return [];
  }

  if (exclude && maxNum - exclude.length < qtd) {
    return [];
  }
  for (let i = 0; i < numCards; i++) {
    const game: Game = {
      title: `Cartão ${i + 1}`,
      numbers: [],
    };
    game.numbers.push(...keep);
    while (game.numbers.length < qtd) {
      const drew = Math.floor(Math.random() * maxNum) + 1;

      if (!exclude?.includes(drew) && !game.numbers.includes(drew)) {
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
    games.push(game);
  }

  return games;
}
