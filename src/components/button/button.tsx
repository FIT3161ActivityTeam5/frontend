import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import tailwind from 'tailwind-rn';

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
        <TouchableOpacity
            style={tailwind(
                'w-full py-3 px-6 bg-purple-600 items-center justify-center rounded-lg'
            )}
            activeOpacity={0.8}
        >
            <Text style={tailwind(
                'text-white font-bold'
            )}>
                {props.title}
            </Text>
        </TouchableOpacity>
    );
}
