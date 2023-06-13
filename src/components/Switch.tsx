import { useMemo } from 'react';
import { Switch as RSwitch, SwitchProps, Text, View } from 'react-native';

interface Props extends SwitchProps {
  checked?: boolean;
  title: string | number;
  clb: (num: number) => void;
}

export function Switch({ checked = false, title, clb, ...rest }: Props) {
  function handleChange() {
    clb(Number(title));
  }

  const isChecked = useMemo(() => checked, [checked]);

  return (
    <View className="flex-row items-center justify-center">
      <RSwitch
        className="mb-2"
        value={isChecked}
        trackColor={{ false: '#767577', true: '#81b0ff' }}
        thumbColor={checked ? '#f5dd4b' : '#f4f3f4'}
        onChange={handleChange}
        {...rest}
      ></RSwitch>
      <Text className="mb-1 text-base text-white">
        {String(title).padStart(2, '0')}
      </Text>
    </View>
  );
}
