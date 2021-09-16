import React from 'react';
import { View } from 'react-native';
import tailwind from 'tailwind-rn';
import useCreateMap from '../../hooks/use-create-map';
import Button from '../button/button';
import Text from '../text/text';

export type NewUserCardProps = {
  /** Callback to be called after the user has successfully created their first map. */
  onCreateFirst: () => void;
};

/**
 * Component which is displayed to the user when they have no maps.
 * Acts as a gentle introduction to the application, promting the user to create
 * a map, or to view the user guide.
 */
export default function NewUserCard(props: NewUserCardProps) {
  const [createMap, loading] = useCreateMap();

  return (
    <View style={tailwind('items-center p-8')}>
      <Text style={tailwind('text-xl text-center text-gray-600')}>
        Looks like you don't have any maps, press the button below to get started.
      </Text>
      <Button
        title={"New Map"}
        loading={loading}
        onPress={() => createMap(() => {
          props.onCreateFirst();
        })}
        style="mt-8 h-10 w-2/3"
      />
      <Text style={tailwind('text-sm text-center text-gray-600 mt-2')}>
        Unsure where to begin?{'\n'}
        Check out the user guide in the <Text style={tailwind("text-purple-700")}>settings screen</Text>.
      </Text>
    </View>
  );
}
