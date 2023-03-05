import { VStack } from "native-base";
import { Container } from "../components/Container";
import { Game } from "../components/Game";
import { GAMES } from "../games";

export function Home() {
  return (
    <Container>
      <VStack
        flex={1}
        justifyContent="space-evenly"
        alignItems="center"
        p={5}
      >
        {GAMES.map((game) => (
          <Game
            game={game}
            key={game.name}
          />
        ))}
      </VStack>
    </Container>
  );
}
