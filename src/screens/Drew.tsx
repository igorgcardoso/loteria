import { useRoute } from "@react-navigation/native";
import { FlatList, Text, View } from "react-native";
import { Container } from "../components/Container";
import { Header } from "../components/Header";
import { Game } from "../utils/drawNumbers";

interface Params {
  games: Game[];
}

export function Drew() {
  const route = useRoute();

  const { games } = route.params as Params;

  return (
    <Container>
      <Header title="Números sorteados" />
      <FlatList
        data={games}
        keyExtractor={(game) => game.title}
        renderItem={({ item }) => (
          <View key={item.title} className="m-4">
            <Text className="text-white font-semibold text-xl">
              {item.title}
            </Text>
            <View className="flex-row justify-around flex-wrap mt-4">
              {item.numbers.map((num) => (
                <Text key={`${num}`} className="text-white text-base">
                  {num}
                </Text>
              ))}
            </View>
          </View>
        )}
      />
    </Container>
  );
}
