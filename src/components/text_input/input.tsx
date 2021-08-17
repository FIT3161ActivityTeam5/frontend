import React from "react";
import { SafeAreaView, StyleSheet, TextInput } from "react-native";
import tailwind from 'tailwind-rn';
import clsx from 'clsx';

const UselessTextInput = () => {
  const [text, onChangeText] = React.useState("Enter some text");
  // const [number, onChangeNumber] = React.useState(null);

  return (
    <SafeAreaView>
      <TextInput
        style={tailwind(
          clsx(
              'w-9/12 py-1.5 px-3 bg-purple-300 items-center justify-start border-4 m-4',
          )
      )}
        onChangeText={onChangeText}
        value={text}
        // to change keyboardType="numeric"
      />
      
    </SafeAreaView>
  );
};


export default UselessTextInput;