import { useNavigation } from "@react-navigation/native";
import { Pressable, Text } from "native-base";
import { Game as IGame } from "../games";

interface Props {
  game: IGame;
}

export function Game({ game }: Props) {
  const { navigate } = useNavigation();

  return (
    <Pressable
      _pressed={{ opacity: 0.7 }}
      w="full"
      p="4"
      justifyContent="center"
      alignItems="center"
      rounded="md"
      style={{
        backgroundColor: game.color,
      }}
      onPress={() => navigate("draw", { game })}
    >
      <Text
        fontWeight="bold"
        fontSize="2xl"
        color="white"
      >
        {game.name}
      </Text>
    </Pressable>
  );
}
