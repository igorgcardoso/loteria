import { Feather } from '@expo/vector-icons';
import { useGame } from '@src/hooks/useGame';
import { useRouter } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native';

interface Props {
  title: string;
  showShareButton?: boolean;
  share?: () => void;
  isToClearDrewNumbers?: boolean;
  isToClearGame?: boolean;
}

export function Header({
  title,
  showShareButton,
  share,
  isToClearDrewNumbers = false,
  isToClearGame = false,
}: Props) {
  const { back } = useRouter();
  const { setGame, clearDrewNumbers, resetKetpAndExcluded } = useGame();

  function handleGoBack() {
    if (isToClearDrewNumbers) {
      clearDrewNumbers();
    }
    if (isToClearGame) {
      setGame({} as any);
      resetKetpAndExcluded();
    }
    back();
  }

  return (
    <View className="w-full flex-row items-center justify-evenly bg-gray-700 p-3">
      <TouchableOpacity activeOpacity={0.7} onPress={handleGoBack}>
        <Feather name="arrow-left" size={24} color="#FFF" />
      </TouchableOpacity>
      <Text className="text-2xl font-bold text-white">{title}</Text>
      {showShareButton ? (
        <TouchableOpacity activeOpacity={0.7} onPress={share}>
          <Feather name="share-2" size={18} color="#FFF" />
        </TouchableOpacity>
      ) : (
        <View />
      )}
    </View>
  );
}
