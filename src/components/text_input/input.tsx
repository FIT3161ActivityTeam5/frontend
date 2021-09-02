import React from "react";
import {TextInput as DefaultTextInput } from "react-native";
import tailwind from 'tailwind-rn';
import clsx from 'clsx';
import { useColorScheme } from 'react-native';

export type TextInputProps = { 
   /** The text to display in the input field. */

  style?: string;
  textStyle?: string;
  value?: string;
  onChange: (text: string) => void;

};

export default function TextInput(props: TextInputProps) {  
  const [focus, setFocus] = React.useState(false);
  const isDarkMode = useColorScheme() === "dark";
  return (
      <DefaultTextInput
          placeholderTextColor={'white'}
          placeholder="Enter some text here"  
          style={tailwind(clsx('px-2 border-2 m-4 h-24 w-9/12 text-justify',
            (focus ? "bg-purple-300 text-gray-900" : "bg-blue-400 text-gray-700")))}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          onChangeText={props.onChange}
          value={props.value}
      />
  );

};
