import { useGame } from '@src/hooks/useGame';
import { useRouter } from 'expo-router';
import { Text, TouchableOpacity } from 'react-native';
import { Game as IGame } from '../games';

interface Props {
  game: IGame;
}

export function Game({ game }: Props) {
  const { push } = useRouter();

  const { setGame } = useGame();

  function handleTouch() {
    setGame(game);
    push('/draw');
  }

  return (
    <TouchableOpacity
      className="my-4 w-full items-center justify-center rounded px-4 py-5"
      activeOpacity={0.7}
      style={{
        backgroundColor: game.color,
      }}
      onPress={handleTouch}
    >
      <Text className="text-2xl font-bold text-white">{game.name}</Text>
    </TouchableOpacity>
  );
}
