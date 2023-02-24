import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Text, TouchableOpacity, View } from "react-native";

interface Props {
  title: string;
  showShareButton?: boolean;
}

export function Header({ title, showShareButton }: Props) {
  const { goBack } = useNavigation();
  return (
    <View className="flex-row w-full p-3 bg-slate-600 justify-evenly items-center">
      <TouchableOpacity activeOpacity={0.7} onPress={goBack}>
        <Feather name="arrow-left" size={24} color="#FFF" />
      </TouchableOpacity>
      <Text className="font-bold text-white text-2xl">{title}</Text>
      {showShareButton ? (
        <TouchableOpacity activeOpacity={0.7}>
          <Feather name="share-2" size={18} color="#FFF" />
        </TouchableOpacity>
      ) : (
        <View />
      )}
    </View>
  );
}
