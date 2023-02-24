import { Game } from "../games";
import { Game as GameNumbers } from "../utils/drawNumbers";

export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      home: undefined;
      draw: {
        game: Game;
      };
      drew: {
        games: GameNumbers[];
      };
    }
  }
}
