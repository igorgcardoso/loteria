import { ReactNode } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

interface Props {
  children: ReactNode;
}

export function Container({ children }: Props) {
  return (
    <SafeAreaView className="flex-1 bg-slate-900">{children}</SafeAreaView>
  );
}
