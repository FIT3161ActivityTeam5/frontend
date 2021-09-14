import React, { useState } from 'react';
import { View, Switch, StyleSheet, SwitchProps } from 'react-native';
import tailwind, { getColor } from 'tailwind-rn';
import clsx from 'clsx';


export default function Toggle_Switch(props: SwitchProps) {
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    return (
      // <View style={styles.container}>
        <Switch trackColor={{ false: getColor("purple-600"), true: getColor("purple-600") }}
                thumbColor={isEnabled ? getColor("purple-50") : getColor("purple-50") }
                ios_backgroundColor = "#3e3e3e"
                onValueChange = { toggleSwitch }
                value = { isEnabled }
                style={tailwind(clsx('text-justify justify-end'))}
        />
      // </View> 

  );
}

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         alignContent: 'flex-start',
//         justifyContent: 'flex-start',
//     },
// });
