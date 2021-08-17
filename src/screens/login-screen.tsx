import React from 'react';
import Text from '../components/text/text';
import ToggleSwitch from '../components/ToggleSwitch/ToggleSwitch'

/**
 * The LoginScreen contains the login form.
 */
export default function LoginScreen() {
    return (
        <>
            <ToggleSwitch Name='newsletter' />
            <ToggleSwitch Name='daily' />
            <ToggleSwitch Name='weekly' />
            <ToggleSwitch Name='monthly' />
        </>
    );
    return <Text>Login screen</Text>;
    
}
