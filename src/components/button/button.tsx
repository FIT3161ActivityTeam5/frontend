import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

export type ButtonProps = {
    /** The text to display on the button. */
    title: string;

    /** The function to call when the user presses the button. */
    onPress: () => void;
};

/**
 * A simple button component.
 * 
 * Example Usage:
 * ```jsx
 * return (
 *   <Button
 *     title="Button Title"
 *     onPress={onPressHandler}
 *   />
 * );
 * ```
 */
export default function Button(props: ButtonProps) {
    return (
        <TouchableOpacity style={styles.container} activeOpacity={0.8}>
            <Text style={styles.text}>{props.title}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingHorizontal: 24,
        paddingVertical: 12,
        backgroundColor: '#8e44ad',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 12
    },
    text: {
        color: '#fff',
        fontWeight: '700'
    }
});
