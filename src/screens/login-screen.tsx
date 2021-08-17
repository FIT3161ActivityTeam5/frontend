import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import tailwind from 'tailwind-rn';
import Text from '../components/text/text';
import Button from '../components/button/button';
import useAuthentication from '../hooks/use-authentication';

/**
 * The LoginScreen contains the login form.
 */
export default function LoginScreen() {
  const auth = useAuthentication();

  return (
    <SafeAreaView style={tailwind('flex-1 bg-white items-center justify-between p-8')}>
      <Text style={tailwind('text-purple-800 font-semibold text-3xl')}>
        ACTIVITY
      </Text>
      <Button title="Login" onPress={auth.login} />
    </SafeAreaView>
  ); 
}
