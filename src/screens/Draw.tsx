import { useNavigation, useRoute } from "@react-navigation/native";
import { useState } from "react";
import {
  Dimensions,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
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
        <Text className="text-white font-semibold text-lg ml-4 mt-4">
          Número para serem excluídos
        </Text>
        <View className="mt-4 flex-row flex-wrap justify-evenly">
          {range.map((num) => (
            <View key={num} style={{ width: CHECK_WIDTH }}>
              <Checkbox
                title={num}
                checked={!excluded.includes(num)}
                onPress={() => handleToggleExclude(num)}
              />
            </View>
          ))}
        </View>
        <View>
          {excluded.length > 0 && (
            <Animated.View entering={StretchInX} exiting={StretchOutX}>
              <TouchableOpacity
                className="w-full bg-red-800 p-4 justify-center items-center rounded-xl mt-5"
                onPress={() => setExcluded([])}
              >
                <Text className="text-white font-semibold text-lg">
                  Selecionar todos
                </Text>
              </TouchableOpacity>
            </Animated.View>
          )}
        </View>
        {game.keepSomeNums && (
          <Text className="text-white font-semibold text-lg ml-4 mt-4">
            Número para manter
          </Text>
        )}
        <View className="mt-4 flex-row flex-wrap justify-evenly">
          {game.keepSomeNums &&
            range.map((num) => (
              <View key={num} style={{ width: CHECK_WIDTH }}>
                <Checkbox
                  title={num}
                  checked={keep.includes(num)}
                  onPress={() => handleToggleKeep(num)}
                />
              </View>
            ))}
        </View>
        <View>
          {keep.length > 0 && (
            <Animated.View entering={StretchInX} exiting={StretchOutX}>
              <TouchableOpacity
                className="w-full bg-red-800 p-4 justify-center items-center rounded-xl mt-5"
                onPress={() => setExcluded([])}
              >
                <Text className="text-white font-semibold text-lg">
                  Deselecionar todos
                </Text>
              </TouchableOpacity>
            </Animated.View>
          )}
        </View>
      </ScrollView>
      <View className="p-4">
        <View className="my-4 flex-row justify-around">
          <Text className="text-white text-lg mb-2">Quantos Cartões?</Text>
          <TextInput
            className="border-2 border-gray-300 w-1/5 rounded-3xl px-4 text-white"
            keyboardType="decimal-pad"
            onChangeText={(t) => setNumCards(Number(t))}
            value={String(numCards)}
          />
        </View>
        <TouchableOpacity
          className="w-full bg-green-800 p-4 justify-center items-center rounded-xl"
          onPress={getDrew}
        >
          <Text className="text-white font-semibold text-lg">Sortear</Text>
        </TouchableOpacity>
      </View>
    </Container>
  );
}
