import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MapListScreen from './map-list-screen';
import SettingsScreen from './settings-screen';

const TabBar = createBottomTabNavigator();

/**
 * The AuthenticatedScreen is what is shown to the user when they are logged in.
 * It contains a tab navigator for navigating between different parts of the 
 * application.
 */
export default function AuthenticatedScreen() {
  return (
    <TabBar.Navigator>
      <TabBar.Screen name="Map List" component={MapListScreen} />
      <TabBar.Screen name="Settings" component={SettingsScreen} />
    </TabBar.Navigator>
  );
}
