import { StatusBar } from "expo-status-bar";
import { NativeBaseProvider } from "native-base";
import { Container } from "./src/components/Container";
import { Routes } from "./src/routes";

export default function App() {
  return (
    <NativeBaseProvider>
      <Container>
        <StatusBar
          style="light"
          backgroundColor="transparent"
          translucent
        />
        <Routes />
      </Container>
    </NativeBaseProvider>
  );
}
