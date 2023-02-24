import { StatusBar } from "expo-status-bar";
import { Container } from "./src/components/Container";
import { Routes } from "./src/routes";

export default function App() {
  return (
    <Container>
      <StatusBar style="light" backgroundColor="transparent" translucent />
      <Routes />
    </Container>
  );
}
