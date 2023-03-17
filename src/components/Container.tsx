import { VStack } from "native-base";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export function Container({ children }: Props) {
  return (
    <VStack
      flex={1}
      bg="darkBlue.900"
      safeArea
    >
      {children}
    </VStack>
  );
}
