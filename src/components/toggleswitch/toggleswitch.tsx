import React, { useState } from 'react';
import { View, Switch, StyleSheet, SwitchProps } from 'react-native';
import { getColor } from 'tailwind-rn';

export default function Toggle_Switch(props: SwitchProps) {
    // Set two methods to change or update the state of the switch
    const [isEnabled, setIsEnabled] = useState(false);

    // When called, will set state to the opposite of what it was
    // If on, will turn off and vice versa.
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    // Colour for switch is purple #600 as this is generally fitting for the overall colour scheme being used.
    return (
        <View style={styles.container}>
            <Switch trackColor={{ false: getColor("purple-600"), true: getColor("purple-600") }}
                thumbColor={isEnabled ? getColor("purple-50") : getColor("purple-50") }
                ios_backgroundColor = "#3e3e3e"
                onValueChange = { toggleSwitch }
                value = { isEnabled }
        />
        </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
