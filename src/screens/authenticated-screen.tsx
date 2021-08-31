import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MapListScreen from './map-list-screen';
import SettingsScreen from './settings-screen';
import { IconGridMasonry, IconSettings, IconWarningTriangle } from 'iconic-icons-rn';
import Navbar from '../components/navbar/navbar';
import MapViewScreen from './map-view-screen';

const TabBar = createBottomTabNavigator();

/**
 * Given a route name, as well as some other properties from react-native-navigation,
 * returns the icon which should be rendered for the specific route.
 */
const getIconForRoute = (route: string) => (props: {focused: boolean; color: string; size: number;}) => {
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
        tabBarIcon: getIconForRoute(route.name),
      })}
      tabBar={props => <Navbar {...props} />}
    >
      <TabBar.Screen name="Map List" component={MapViewScreen} />
      <TabBar.Screen name="Settings" component={SettingsScreen} />
    </TabBar.Navigator>
  );
}
