import { Game } from '@components/Game';
import { GAMES } from '@src/games';
import { FlatList, View } from 'react-native';

export default function App() {
  return (
    <View className="flex-1 bg-blue-950">
      <FlatList
        contentContainerStyle={{
          paddingTop: 20,
          paddingBottom: 60,
          paddingHorizontal: 20,
        }}
        data={GAMES}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => <Game game={item} />}
      />
    </View>
  );
}
