import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MapListScreen from './map-list-screen';
import SettingsScreen from './settings-screen';
import { IconGridMasonry, IconSettings, IconWarningTriangle } from 'iconic-icons-rn';
import Navbar from '../components/navbar/navbar';

const TabBar = createBottomTabNavigator();

const makeIcon = (route: string) => (props: {focused: boolean; color: string; size: number;}) => {
  const iconProps = {
    color: props.color,
    width: props.size,
    height: props.size,
  };

  if (route === 'Map List') {
    return <IconGridMasonry {...iconProps} />;
  }

  if (route === 'Settings') {
    return <IconSettings {...iconProps} />;
  }

  return <IconWarningTriangle {...iconProps} />;
}

/**
 * The AuthenticatedScreen is what is shown to the user when they are logged in.
 * It contains a tab navigator for navigating between different parts of the 
 * application.
 */
export default function AuthenticatedScreen() {
  return (
    <TabBar.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarIcon: makeIcon(route.name),
      })}
      tabBar={props => <Navbar {...props} />}
    >
      <TabBar.Screen name="Map List" component={MapListScreen} />
      <TabBar.Screen name="Settings" component={SettingsScreen} />
    </TabBar.Navigator>
  );
}
