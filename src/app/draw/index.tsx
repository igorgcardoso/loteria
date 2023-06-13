import { Header } from '@src/components/Header';
import { Game } from '@src/games';
import { useGame } from '@src/hooks/useGame';
import clsx from 'clsx';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  BackHandler,
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function Draw() {
  const [numCards, setNumCards] = useState('1');
  const {
    isDrawing,
    drawNumbers,
    game,
    keptNumbers,
    excludedNumbers,
    setGame,
  } = useGame();

  const { push, back } = useRouter();

  function handleDraw() {
    Keyboard.dismiss();

    if (isDrawing) return;

    drawNumbers({
      maxNum: game.maxNum,
      qtd: game.drawnNum,
      exclude: excludedNumbers,
      keep: keptNumbers,
      numCards: Number(numCards.replace(',', '').replace('.', '')),
    });

    push('/drew');
  }

  useEffect(() => {
    function backAction() {
      setGame({} as Game);
      back();
      return true;
    }
    BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', backAction);
    };
  }, []);

  return (
    <View className="flex-1 bg-blue-950">
      <Header title={game.name} isToClearGame />
      <View className="flex-1 justify-between p-2">
        <View className="mt-8 space-y-8 px-4">
          <TouchableOpacity
            activeOpacity={0.7}
            className="w-full items-center justify-center bg-orange-600 p-4"
            onPress={() => push('/draw/changeNumbers')}
          >
            <Text className="text-xl font-bold text-white">
              Remover alguns números
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            className="w-full items-center justify-center bg-orange-400 p-4"
            onPress={() =>
              push({
                pathname: '/draw/changeNumbers',
                params: { keep: 'true' },
              })
            }
          >
            <Text className="text-xl font-bold text-white">
              Manter alguns números
            </Text>
          </TouchableOpacity>
        </View>
        <View>
          <View className="mb-8 flex-row items-center justify-around">
            <Text className="text-lg text-white">Quantos cartões?</Text>
            <TextInput
              className="w-1/5 rounded-3xl border-2 border-gray-300 px-4 text-white"
              keyboardType="decimal-pad"
              value={String(numCards)}
              onChangeText={setNumCards}
            />
          </View>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={handleDraw}
            className={clsx(
              'w-full items-center justify-center rounded-xl p-4',
              {
                'bg-green-800': !isDrawing,
                'bg-gray-600': isDrawing,
              },
            )}
            disabled={isDrawing}
          >
            <Text className="text-lg font-semibold text-white">Sortear</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
