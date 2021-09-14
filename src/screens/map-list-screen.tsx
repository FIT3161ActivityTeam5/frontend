import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../components/button/button';
import Text from '../components/text/text';
import TextInput from '../components/text_input/input';
import useAuthentication from '../hooks/use-authentication';

export default function MapListScreen() {
  const auth = useAuthentication();

  return (
    <SafeAreaView>
      {/* <TextInput onChange={() => {}} ></TextInput> */}
      {/* <Button title="Log Out" onPress={auth.logout} /> */}
    </SafeAreaView>
  );
}
