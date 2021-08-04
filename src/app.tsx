import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View } from 'react-native';
import tailwind from 'tailwind-rn';
import Button from './components/button/button';

export default function App() {
  return (
    <View style={tailwind('flex-1 bg-white items-center justify-center')}>
      <Button title="Confirm" onPress={() => {}} style="bg-indigo-500" />
      <StatusBar style="auto" />
    </View>
  );
}
