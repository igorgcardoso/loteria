import { HStack, ISwitchProps, Switch as NBSwitch, Text } from "native-base";

interface Props extends ISwitchProps {
  checked?: boolean;
  title: string | number;
}

export function Switch({ checked = false, title, ...rest }: Props) {
  return (
    <HStack alignItems="center">
      <NBSwitch
        isChecked={checked}
        mb="2"
        alignItems="center"
        size="lg"
        {...rest}
      >
      </NBSwitch>
      <Text
        ml="3"
        color="white"
      >
        {String(title).padStart(2, "0")}
      </Text>
    </HStack>
  );
}
