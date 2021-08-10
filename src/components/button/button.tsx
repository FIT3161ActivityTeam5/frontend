import React from 'react';
import { TouchableOpacity } from 'react-native';
import tailwind from 'tailwind-rn';
import clsx from 'clsx';
import Text from '../text/text';

export type ButtonProps = {
    /** The text to display on the button. */
    title: string;

    /** The function to call when the user presses the button. */
    onPress: () => void;

    /**
     * Optional string of tailwind utilities to pass to the button.
     * This can be used to override the default button styles.
     */
    style?: string;

    /** Optional string of tailwind utilities to pass to the text. */
    textStyle?: string;

    /** Whether or not the button is disabled. */
    disabled?: boolean;
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
                clsx(
                    'w-full py-3 px-6 bg-purple-600 items-center justify-center rounded-lg',
                    props.style,
                    {
                        'bg-purple-300': props.disabled,
                    },
                )
            )}
            activeOpacity={0.8}
            onPress={props.onPress}
            disabled={props.disabled}
        >
            <Text style={tailwind(
                clsx(    
                    'text-white text-base font-bold',
                    props.textStyle,
                    {
                        'text-purple-400': props.disabled,
                    }
                )
            )}>
                {props.title}
            </Text>
        </TouchableOpacity>
    );
}
