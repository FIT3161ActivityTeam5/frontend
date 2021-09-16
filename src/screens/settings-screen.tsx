import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import tailwind from 'tailwind-rn';
import Text from '../components/text/text';
import ToggleSwitch from '../components/toggleswitch/toggleswitch';
import Button from '../components/button/button';
import useAuthentication from '../hooks/use-authentication';
import { createStackNavigator } from '@react-navigation/stack';
import UserGuideScreen from './user-guide-screen';


const Stack = createStackNavigator();

function SettingsScreen({navigation}) {
  const auth = useAuthentication();
  return (
    <SafeAreaView style={tailwind("flex-1 p-10")}>
      <Text>Dark Mode</Text>
      <ToggleSwitch></ToggleSwitch>
      <Button style="mt-2" title="User Guide" onPress={() => navigation.navigate('UserGuide') }/>
      <Button style="mt-2" title="Log Out" onPress={auth.logout} />
    </SafeAreaView>
  );
}

export default function App() {
  return (
      <Stack.Navigator>
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="UserGuide" component={UserGuideScreen} />
      </Stack.Navigator>
  );
}
