import { GameProvider } from '@src/contexts/gameContext';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

export default function Layout() {
  const { top, bottom } = useSafeAreaInsets();

  return (
    <View
      className="flex-1 bg-blue-950"
      style={{
        paddingTop: top,
        paddingBottom: bottom,
      }}
    >
      <StatusBar style="light" backgroundColor="transparent" translucent />
      <GameProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="draw" />
          <Stack.Screen name="drew" />
        </Stack>
      </GameProvider>
      <Toast />
    </View>
  );
}
