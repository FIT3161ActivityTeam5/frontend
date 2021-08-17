import React from 'react';
import { TouchableOpacity } from 'react-native';
import tailwind from 'tailwind-rn';
import clsx from 'clsx';
import Text from '../text/text';

export type NavbarButtonProps = Pick<TouchableOpacity['props'], 'onPress' | 'onLongPress'> & {
  /** Text to display on the button. */
  title: string;

  /** Whether or not the button represents the current active tab. */
  active: boolean;

  /** The icon to use for the button. */
  icon: React.ReactNode;
};

/**
 * A button which appears on the bottom navigation bar.
 */
export default function NavbarButton(props: NavbarButtonProps) {
  return (
    <TouchableOpacity
      style={tailwind('flex-1 p-2 items-center')}
      {...props}
    >
      {props.icon}
      <Text style={tailwind(
          clsx('text-xs font-medium', {
            'text-gray-400': !props.active,
            'text-purple-500': props.active,
          })
        )}
      >
        {props.title}
      </Text>
    </TouchableOpacity>
  );
}
  