import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import tailwind, { getColor } from 'tailwind-rn';
import Button from '../components/button/button';
import useAuthentication from '../hooks/use-authentication';

export default function SettingsScreen() {
  const auth = useAuthentication();

  return (
    <SafeAreaView style={tailwind("flex-1 items-center")}>
      <Button title="Log Out" onPress={auth.logout}  />
    </SafeAreaView>
  );
}
