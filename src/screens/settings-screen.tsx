import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import tailwind from 'tailwind-rn';
import Text from '../components/text/text';
import ToggleSwitch from '../components/toggleswitch/toggleswitch';


export default function SettingsScreen() {
  return (
    <SafeAreaView style={tailwind("flex-1")}>
      <Text>Hello settings screen</Text>
      <ToggleSwitch ></ToggleSwitch>
    </SafeAreaView>
  );
}
