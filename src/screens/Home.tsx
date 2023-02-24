import { View } from "react-native";
import { Container } from "../components/Container";
import { Game } from "../components/Game";
import { GAMES } from "../games";

export function Home() {
  return (
    <Container>
      <View className="flex-1 justify-evenly items-center p-5">
        {GAMES.map((game) => (
          <Game game={game} key={game.name} />
        ))}
      </View>
    </Container>
  );
}
