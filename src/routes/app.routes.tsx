import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Draw } from "../screens/Draw";
import { Drew } from "../screens/Drew";
import { Home } from "../screens/Home";

const { Navigator, Screen } = createNativeStackNavigator();

export function AppRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Screen name="home" component={Home} />
      <Screen name="draw" component={Draw} />
      <Screen name="drew" component={Drew} />
    </Navigator>
  );
}
