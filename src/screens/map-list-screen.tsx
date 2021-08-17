import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Text from '../components/text/text';
import UselessTextInput from '../components/text_input/input'

export default function MapListScreen() {
  return (
    <SafeAreaView>
      <Text>Hello map list</Text>
      <UselessTextInput></UselessTextInput>
    </SafeAreaView>
  );
}
