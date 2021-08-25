import React from "react";
import { SafeAreaView, StyleSheet, TextInput } from "react-native";
import tailwind from 'tailwind-rn';
import clsx from 'clsx';
import { useColorScheme } from 'react-native';

export type UselessTextInput = {
  /** The text to display in the input field. */
  title: string;
  /**
   * Optional string of tailwind utilities to pass to the input field.
   * This can be used to override the default styles.
   */
  style?: string;
  /** Optional string of tailwind utilities to pass to the text. */
  textStyle?: string;
};

const UselessTextInput = () => {
  const [focus, setFocus] = React.useState(false);
  const isDarkMode = useColorScheme() === "dark";
  return (
    <SafeAreaView>
      <TextInput
          placeholderTextColor={'white'}
          placeholder="Enter some text here"  
          style={tailwind(clsx('w-9/12 py-1.5 px-3 items-center justify-start border-2 m-4',
            (focus ? "bg-purple-300 text-gray-900" : "bg-blue-400 text-gray-700")))}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
      />
    </SafeAreaView>
  );

};


export default UselessTextInput;