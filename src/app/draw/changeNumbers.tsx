import { Header } from '@components/Header';
import { Switch } from '@components/Switch';
import { useGame } from '@src/hooks/useGame';
import { generateRange } from '@src/utils/generateRange';
import { useLocalSearchParams } from 'expo-router';
import { FlatList, View } from 'react-native';

export default function ChangeNumbers() {
  const {
    game,
    keptNumbers,
    excludedNumbers,
    handleToggleExclude,
    handleToggleKeep,
  } = useGame();

  const params = useLocalSearchParams();

  const isKeep = !!params.keep;

  const numbers = generateRange(game.maxNum);

  function isChecked(num: number) {
    if (isKeep) {
      return keptNumbers.includes(num);
    }

    return excludedNumbers.includes(num);
  }

  return (
    <View className="flex-1 bg-blue-950">
      <Header title={`${isKeep ? 'Manter' : 'Excluir'} números`} />

      <FlatList
        data={numbers}
        keyExtractor={(item) => String(item)}
        contentContainerStyle={{
          paddingBottom: 60,
          justifyContent: 'space-evenly',
        }}
        numColumns={4}
        renderItem={({ item }) => (
          <Switch
            title={item}
            checked={isChecked(item)}
            clb={isKeep ? handleToggleKeep : handleToggleExclude}
          />
        )}
      />
    </View>
  );
}
