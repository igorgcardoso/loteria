import { useNavigation } from "@react-navigation/native";
import { Text, TouchableOpacity } from "react-native";
import { Game as IGame } from "../games";

interface Props {
  game: IGame;
}

export function Game({ game }: Props) {
  const { navigate } = useNavigation();

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      className="w-full p-4 justify-center items-center rounded-md"
      style={{
        backgroundColor: game.color,
      }}
      onPress={() => navigate("draw", { game })}
    >
      <Text className="font-bold text-2xl text-white">{game.name}</Text>
    </TouchableOpacity>
  );
}
