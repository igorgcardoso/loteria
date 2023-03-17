import { useRoute } from "@react-navigation/native";
import * as Clipboard from "expo-clipboard";
import { FlatList, HStack, Text, Toast, useTheme, VStack } from "native-base";
import { Container } from "../components/Container";
import { Header } from "../components/Header";
import { Game } from "../utils/drawNumbers";

interface Params {
  games: Game[];
}

export function Drew() {
  const route = useRoute();

  const { sizes } = useTheme();

  const { games } = route.params as Params;

  async function share() {
    let text = "";
    games.forEach((game, idx) => {
      text += `${game.title}\n`;
      text += `${game.numbers.join(" ")}${
        idx === games.length - 1 ? "" : "\n\n"
      }`;
    });
    await Clipboard.setStringAsync(text);
    Toast.show({
      title: "Copiado para área de transferência",
      bg: "success.500",
    });
  }

  return (
    <Container>
      <Header
        title="Números sorteados"
        share={share}
        showShareButton
      />
      <FlatList
        data={games}
        contentContainerStyle={{
          paddingBottom: sizes["32"],
        }}
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
