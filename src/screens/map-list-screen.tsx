import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../components/button/button';
import Text from '../components/text/text';
import ToggleSwitch from '../components/toggleswitch/toggleswitch';
import useAuthentication from '../hooks/use-authentication';

export default function MapListScreen() {
  const auth = useAuthentication();

  return (
    <SafeAreaView>
          <Text>{auth.accessToken}</Text>
          <ToggleSwitch/>
      <Button title="Log Out" onPress={auth.logout} />
    </SafeAreaView>
  );
}
