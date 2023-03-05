import { Feather } from "@expo/vector-icons";
import { HStack, IPressableProps, Pressable, Text, VStack } from "native-base";
import Animated, { ZoomIn, ZoomOut } from "react-native-reanimated";

interface Props extends IPressableProps {
  checked?: boolean;
  title: string | number;
}

const VStackAnimated = Animated.createAnimatedComponent(VStack);

export function Checkbox({ checked = false, title, ...rest }: Props) {
  return (
    <Pressable
      _pressed={{ opacity: 0.7 }}
      mb="2"
      alignItems="center"
      {...rest}
    >
      <HStack>
        {checked ? (
          <VStackAnimated
            h="8"
            w="8"
            bg="green.500"
            rounded="lg"
            alignItems="center"
            justifyContent="center"
            entering={ZoomIn}
            exiting={ZoomOut}
          >
            <Feather
              name="check"
              size={20}
              color="#FFF"
            />
          </VStackAnimated>
        ) : (
          <VStack
            h="8"
            w="8"
            bg="muted.700"
            rounded="lg"
          />
        )}
        <Text
          ml="3"
          color="white"
        >
          {title}
        </Text>
      </HStack>
    </Pressable>
  );
}
