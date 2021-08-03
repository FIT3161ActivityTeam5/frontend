import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View } from 'react-native';
import tailwind from 'tailwind-rn';
import ExampleComponent from './components/example-component';

export default function App() {
  return (
    <View style={tailwind('flex-1 bg-white items-center justify-center')}>
      <ExampleComponent />
      <StatusBar style="auto" />
    </View>
  );
}
