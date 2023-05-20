import { useNavigation, useRoute } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import {
  HStack,
  Input,
  Switch as NBSwitch,
  Pressable,
  ScrollView,
  Text,
  VStack,
  useTheme,
} from "native-base";
import { useEffect, useMemo, useState } from "react";
import { Dimensions, Keyboard } from "react-native";
import Animated, { StretchInX, StretchOutX } from "react-native-reanimated";
import { createShimmerPlaceholder } from "react-native-shimmer-placeholder";
import { Container } from "../components/Container";
import { Header } from "../components/Header";
import { Switch } from "../components/Switch";
import { Game } from "../games";
import { drawNumbers } from "../utils/drawNumbers";
import { generateRange } from "../utils/generateRange";

interface Params {
  game: Game;
}

const SCREEN_HORIZONTAL_PADDING = 32 / 3;
export const CHECK_WIDTH =
  Dimensions.get("screen").width / 3 - SCREEN_HORIZONTAL_PADDING;

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);

export function Draw() {
  const [excluded, setExcluded] = useState<number[]>([]);
  const [keep, setKeep] = useState<number[]>([]);
  const [numCards, setNumCards] = useState(1);
  const [shouldDisplayNumbers, setShouldDisplayNumbers] = useState(false);
  const [shouldDisplayKeepNumbers, setShouldDisplayKeepNumbers] =
    useState(false);
  const [isDrawing, setIsDrawing] = useState(false);

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

    setIsDrawing(false);

    navigate("drew", { games });
  }

  function handleDraw() {
    Keyboard.dismiss();
    if (isDrawing) return;

    setIsDrawing(true);

    setTimeout(getDrew, 1000);
  }

  const route = useRoute();

  const { game } = route.params as Params;

  const { sizes } = useTheme();

  const range = useMemo(() => generateRange(game.maxNum), [game.maxNum]);

  function handleToggleShouldDisplayKeepNumbers() {
    setShouldDisplayKeepNumbers((prev) => {
      if (prev) {
        setKeep([]);
      }
      return !prev;
    });
  }

  useEffect(() => {
    setTimeout(() => setShouldDisplayNumbers(true), 200);
  }, []);

  return (
    <Container>
      <Header title={game.name} />
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        <ShimmerPlaceHolder
          visible={shouldDisplayNumbers}
          height={sizes["96"]}
          style={{ alignSelf: "center" }}
          width={sizes["96"]}
        >
          <Text
            fontWeight="semibold"
            fontSize="lg"
            mt="4"
            ml="4"
            color="white"
          >
            Números para serem excluídos
          </Text>
          <HStack
            mt="4"
            flexWrap="wrap"
            justifyContent="space-evenly"
          >
            {shouldDisplayNumbers &&
              range.map((num) => (
                <VStack
                  key={num}
                  style={{ width: CHECK_WIDTH }}
                >
                  <Switch
                    title={num}
                    checked={excluded.includes(num)}
                    onToggle={() => handleToggleExclude(num)}
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
                    Deselecionar todos
                  </Text>
                </Pressable>
              </Animated.View>
            )}
          </VStack>
          <HStack
            w="full"
            justifyContent="space-around"
          >
            <Text
              color="white"
              fontWeight="semibold"
              fontSize="lg"
              ml="4"
              mt="4"
            >
              Números para manter
            </Text>
            <NBSwitch
              size="lg"
              isChecked={shouldDisplayKeepNumbers}
              onToggle={handleToggleShouldDisplayKeepNumbers}
              colorScheme="emerald"
              onThumbColor="emerald.500"
            />
          </HStack>
          <HStack
            mt="4"
            flexWrap="wrap"
            justifyContent="space-evenly"
          >
            {shouldDisplayKeepNumbers &&
              range.map((num) => (
                <VStack
                  key={num}
                  style={{ width: CHECK_WIDTH }}
                >
                  <Switch
                    title={num}
                    checked={keep.includes(num)}
                    onToggle={() => handleToggleKeep(num)}
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
                    Selecionar todos
                  </Text>
                </Pressable>
              </Animated.View>
            )}
          </VStack>
        </ShimmerPlaceHolder>
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
          onPress={handleDraw}
          disabled={isDrawing}
          _disabled={{
            bg: "muted.600",
          }}
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
