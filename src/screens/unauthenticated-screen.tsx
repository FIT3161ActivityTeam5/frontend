import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Text from '../components/text/text';

export default function UnauthenticatedScreen() {
  return (
    <SafeAreaView>
      <Text>You are not logged in.</Text>
    </SafeAreaView>
  );
}
