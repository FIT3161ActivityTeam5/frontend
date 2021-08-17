import React from 'react';
import { View } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import tailwind, { getColor } from 'tailwind-rn';
import NavbarButton from './navbar-button';

// Shadow to use with the navbar.
// Generated using https://ethercreative.github.io/react-native-shadow-generator/
const SmallShadow = {
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,

  elevation: 5,
};

/**
 * Custom bottom tab bar for use with React Native Navigation.
 * 
 * Provides custom styling.
 * 
 * TODO: Make this testable.
 */
export default function Navbar(props: BottomTabBarProps) {
  const {state, descriptors, navigation} = props;

  return (
    <View style={[
      tailwind('flex-row bg-white rounded-t-2xl'),
      SmallShadow,
    ]}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            // navigation.navigate({ name: route.name, merge: true });
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <NavbarButton
            key={index}
            onPress={onPress}
            onLongPress={onLongPress}
            active={isFocused}
            title={route.name}
            icon={
              options.tabBarIcon!(
                {
                  focused: isFocused,
                  color: getColor(isFocused ? 'purple-500' : 'gray-400'),
                  size: 24,
                }
              )
            }
          />
        );
      })}
    </View>
  );
}
  
