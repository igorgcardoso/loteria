import { useNavigation, useRoute } from "@react-navigation/native";
import {
  HStack,
  Input,
  Pressable,
  ScrollView,
  Text,
  VStack,
} from "native-base";
import { useState } from "react";
import { Dimensions } from "react-native";
import Animated, { StretchInX, StretchOutX } from "react-native-reanimated";
import { Checkbox } from "../components/Checkbox";
import { Container } from "../components/Container";
import { Header } from "../components/Header";
import { Game } from "../games";
import { drawNumbers } from "../utils/drawNumbers";
import { generateRange } from "../utils/generateRange";

interface Params {
  game: Game;
}

const SCREEN_HORIZONTAL_PADDING = (32 * 2) / 7;
export const CHECK_WIDTH =
  Dimensions.get("screen").width / 5 - SCREEN_HORIZONTAL_PADDING;

export function Draw() {
  const [excluded, setExcluded] = useState<number[]>([]);
  const [keep, setKeep] = useState<number[]>([]);
  const [numCards, setNumCards] = useState(1);

  const { navigate } = useNavigation();

  function handleToggleExclude(num: number) {
    if (excluded.includes(num)) {
      setExcluded((prev) => prev.filter((elem) => elem !== num));
    } else {
      setExcluded((prev) => [...prev, num]);
    }
  }

  function handleToggleKeep(num: number) {
    if (keep.includes(num)) {
      setKeep((prev) => prev.filter((elem) => elem !== num));
    } else {
      setKeep((prev) => [...prev, num]);
    }
  }

  function getDrew() {
    const games = drawNumbers({
      maxNum: game.maxNum,
      qtd: game.drawnNum,
      exclude: excluded,
      keep,
      numCards,
    });

    navigate("drew", { games });
  }

  const route = useRoute();

  const { game } = route.params as Params;

  const range = generateRange(game.maxNum);

  return (
    <Container>
      <Header title={game.name} />
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        <Text
          fontWeight="semibold"
          fontSize="lg"
          mt="4"
          ml="4"
        >
          Número para serem excluídos
        </Text>
        <HStack
          mt="4"
          flexWrap="wrap"
          justifyContent="space-evenly"
        >
          {range.map((num) => (
            <VStack
              key={num}
              style={{ width: CHECK_WIDTH }}
            >
              <Checkbox
                title={num}
                checked={!excluded.includes(num)}
                onPress={() => handleToggleExclude(num)}
              />
            </VStack>
          ))}
        </HStack>
        <VStack>
          {excluded.length > 0 && (
            <Animated.View
              entering={StretchInX}
              exiting={StretchOutX}
            >
              <Pressable
                _pressed={{ opacity: 0.7 }}
                w="full"
                bg="red.800"
                p="4"
                justifyContent="center"
                alignItems="center"
                rounded="xl"
                mt="5"
                onPress={() => setExcluded([])}
              >
                <Text
                  color="white"
                  fontWeight="semibold"
                  fontSize="lg"
                >
                  Selecionar todos
                </Text>
              </Pressable>
            </Animated.View>
          )}
        </VStack>
        {game.keepSomeNums && (
          <Text
            color="white"
            fontWeight="semibold"
            fontSize="lg"
            ml="4"
            mt="4"
          >
            Número para manter
          </Text>
        )}
        <HStack
          mt="4"
          flexWrap="wrap"
          justifyContent="space-evenly"
        >
          {game.keepSomeNums &&
            range.map((num) => (
              <VStack
                key={num}
                style={{ width: CHECK_WIDTH }}
              >
                <Checkbox
                  title={num}
                  checked={keep.includes(num)}
                  onPress={() => handleToggleKeep(num)}
                />
              </VStack>
            ))}
        </HStack>
        <VStack>
          {keep.length > 0 && (
            <Animated.View
              entering={StretchInX}
              exiting={StretchOutX}
            >
              <Pressable
                _pressed={{ opacity: 0.7 }}
                w="full"
                bg="red.800"
                p="4"
                justifyContent="center"
                alignItems="center"
                rounded="xl"
                mt="5"
                onPress={() => setExcluded([])}
              >
                <Text
                  color="white"
                  fontWeight="semibold"
                  fontSize="lg"
                >
                  Deselecionar todos
                </Text>
              </Pressable>
            </Animated.View>
          )}
        </VStack>
      </ScrollView>
      <VStack p="4">
        <HStack
          my="4"
          justifyContent="space-around"
        >
          <Text
            color="white"
            fontSize="lg"
            mb="2"
          >
            Quantos Cartões?
          </Text>
          <Input
            borderWidth="2"
            borderColor="gray.300"
            w="1/5"
            rounded="3xl"
            px="4"
            color="white"
            keyboardType="decimal-pad"
            onChangeText={(t) => setNumCards(Number(t))}
            value={String(numCards)}
          />
        </HStack>
        <Pressable
          _pressed={{ opacity: 0.7 }}
          w="full"
          bg="green.800"
          p="4"
          justifyContent="center"
          alignItems="center"
          rounded="xl"
          onPress={getDrew}
        >
          <Text
            color="white"
            fontWeight="semibold"
            fontSize="lg"
          >
            Sortear
          </Text>
        </Pressable>
      </VStack>
    </Container>
  );
}
