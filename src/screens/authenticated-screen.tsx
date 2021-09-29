import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MapListScreen from './map-list-screen';
import SettingsScreen from './settings-screen';
import { IconGridMasonry, IconSettings, IconWarningTriangle } from 'iconic-icons-rn';
import Navbar from '../components/navbar/navbar';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MapViewScreen from './map-view-screen';
import { NavigatorScreenParams } from '@react-navigation/native';

export type RootStackParamList = {
  AppView: undefined,
  MapView: undefined
};

export type TabBarParamList = {
  MapList: NavigatorScreenParams<RootStackParamList>,
  Settings: undefined
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const TabBar = createBottomTabNavigator<TabBarParamList>();

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

  if (route === 'MapList') {
    return <IconGridMasonry {...iconProps} />;
  }

  if (route === 'Settings') {
    return <IconSettings {...iconProps} />;
  }

  return <IconWarningTriangle {...iconProps} />;
}

function AppView() {
  return (
    <TabBar.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarIcon: getIconForRoute(route.name),
      })}
      tabBar={props => <Navbar {...props} />}
    >
      <TabBar.Screen name="MapList" component={MapListScreen} options={{tabBarLabel: "Map List"}} />
      <TabBar.Screen name="Settings" component={SettingsScreen} />
    </TabBar.Navigator>
  );
}

/**
 * The AuthenticatedScreen is what is shown to the user when they are logged in.
 * It contains a tab navigator for navigating between different parts of the
 * application.
 */
export default function AuthenticatedScreen() {
  return (
    <Stack.Navigator
      screenOptions={() => ({
        headerShown: false,
      })}
      initialRouteName="AppView"
    >
      <Stack.Screen name="AppView" component={AppView} />
      <Stack.Screen name="MapView" component={MapViewScreen} />
    </Stack.Navigator>
  );
}
