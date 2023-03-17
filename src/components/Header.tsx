import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { HStack, Pressable, Text } from "native-base";

interface Props {
  title: string;
  showShareButton?: boolean;
  share?: () => void;
}

export function Header({ title, showShareButton, share }: Props) {
  const { goBack } = useNavigation();

  return (
    <HStack
      w="full"
      p="3"
      bg="muted.500"
      justifyContent="space-evenly"
      alignItems="center"
    >
      <Pressable
        _pressed={{ opacity: 0.7 }}
        onPress={goBack}
      >
        <Feather
          name="arrow-left"
          size={24}
          color="#FFF"
        />
      </Pressable>
      <Text
        fontWeight="bold"
        color="white"
        fontSize="2xl"
      >
        {title}
      </Text>
      {showShareButton ? (
        <Pressable
          _pressed={{ opacity: 0.7 }}
          onPress={share}
        >
          <Feather
            name="share-2"
            size={18}
            color="#FFF"
          />
        </Pressable>
      ) : (
        <HStack />
      )}
    </HStack>
  );
}
