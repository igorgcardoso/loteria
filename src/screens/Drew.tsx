import { useRoute } from "@react-navigation/native";
import { FlatList, HStack, Text, VStack } from "native-base";
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
          <VStack
            key={item.title}
            m="4"
          >
            <Text
              color="white"
              fontWeight="semibold"
              fontSize="xl"
            >
              {item.title}
            </Text>
            <HStack
              justifyContent="space-around"
              flexWrap="wrap"
              mt="4"
            >
              {item.numbers.map((num) => (
                <Text
                  key={`${num}`}
                  color="white"
                >
                  {num}
                </Text>
              ))}
            </HStack>
          </VStack>
        )}
      />
    </Container>
  );
}
