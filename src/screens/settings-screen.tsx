import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import tailwind from 'tailwind-rn';
import Text from '../components/text/text';
import ToggleSwitch from '../components/toggleswitch/toggleswitch';
import Button from '../components/button/button';
import useAuthentication from '../hooks/use-authentication';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './login-screen';
import UserGuideScreen from './user-guide-screen';
import { NavigationContainer } from '@react-navigation/native';


const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Guide" component={UserGuideScreen} />
    </Stack.Navigator>
  );
}

export default function SettingsScreen() {
  const auth = useAuthentication();

  return (
    <SafeAreaView style={tailwind("flex-1 p-10")}>
      <Text>Dark Mode</Text>
      <ToggleSwitch></ToggleSwitch>
      <Button style="mt-2" title="User Guide" onPress={() => {}} />
      <Button style="mt-2" title="Log Out" onPress={auth.logout} />
    </SafeAreaView>
  );
}
