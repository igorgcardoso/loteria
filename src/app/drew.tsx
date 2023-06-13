import { Header } from '@components/Header';
import { useGame } from '@src/hooks/useGame';
import * as Clipboard from 'expo-clipboard';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { BackHandler, FlatList, Text, View } from 'react-native';
import Toast from 'react-native-toast-message';

export default function Drew() {
  const { drewGames, clearDrewNumbers } = useGame();

  const { back } = useRouter();

  async function share() {
    let text = '';
    drewGames.forEach((game, idx) => {
      text += `${game.title}\n`;
      text += `${game.numbers.join(' ')}${idx === drewGames.length - 1 ? '' : '\n\n'
        }`;
    });
    await Clipboard.setStringAsync(text);
    Toast.show({
      type: 'success',
      text1: 'Copiado para área de transferência',
    });
  }

  useEffect(() => {
    function backAction() {
      clearDrewNumbers();
      back();
      return true;
    }
    BackHandler.addEventListener('hardwareBackPress', backAction);

    return () =>
      BackHandler.removeEventListener('hardwareBackPress', backAction);
  }, []);

  return (
    <View className="flex-1 bg-blue-950">
      <Header
        title="Números sorteados"
        share={share}
        showShareButton
        isToClearDrewNumbers
      />
      <FlatList
        data={drewGames}
        contentContainerStyle={{
          paddingBottom: 60,
        }}
        keyExtractor={(game) => game.title}
        renderItem={({ item }) => (
          <View className="m-4">
            <Text className="text-xl font-semibold text-white">
              {item.title}
            </Text>
            <View className="mt-4 flex-row flex-wrap items-center justify-around space-x-2 space-y-2">
              {item.numbers.map((num) => (
                <Text className="text-white" key={`${num}`}>
                  {num}
                </Text>
              ))}
            </View>
          </View>
        )}
      />
    </View>
  );
}
