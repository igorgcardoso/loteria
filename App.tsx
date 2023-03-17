import { StatusBar } from "expo-status-bar";
import { NativeBaseProvider } from "native-base";
import { Routes } from "./src/routes";

export default function App() {
  return (
    <NativeBaseProvider>
      <StatusBar
        style="light"
        backgroundColor="transparent"
        translucent
      />
      <Routes />
    </NativeBaseProvider>
  );
}
