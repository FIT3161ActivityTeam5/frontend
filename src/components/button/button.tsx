import React from 'react';
import { ActivityIndicator, TouchableOpacity } from 'react-native';
import tailwind, { getColor } from 'tailwind-rn';
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

    /**
     * If true, will display a loading indicator rather than the button title.
     * Will also disable the button.
     */
    loading?: boolean;
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
                )
            )}
            activeOpacity={0.8}
            onPress={props.onPress}
        >
            {props.loading ? <>
                <ActivityIndicator color={getColor('gray-50')} />
            </> : <>
                <Text style={tailwind(
                    clsx(
                        'text-white text-base font-bold',
                    )
                )}>
                    {props.title}
                </Text>
            </>}
        </TouchableOpacity>
    );
}
