import React from "react";
import { View } from "react-native";
import tailwind from "tailwind-rn";
import Button from "../button/button";
import Text from "../text/text";

export type PromptIntent = 'blank' | 'template';

export type NewUserCardProps = {
  /** Callback to be called after the user has successfully created their first map. */
  onPressPrompt: (intent: PromptIntent) => void;
};

/**
 * Component which is displayed to the user when they have no maps.
 * Acts as a gentle introduction to the application, promting the user to create
 * a map, or to view the user guide.
 */
export default function NewUserCard(props: NewUserCardProps) {
  return (
    <View style={tailwind("items-center p-8")}>
      <Text style={tailwind("text-xl text-center text-gray-600")}>
        Looks like you don't have any maps, press a button below to get
        started.
      </Text>
      <Button
        title={"New Blank Map"}
        onPress={() => {
          props.onPressPrompt('blank');
        }}
        style="mt-8 h-10 w-2/3"
      />
      <Button
        title={"New Map From Example"}
        onPress={() => {
          props.onPressPrompt('template');
        }}
        style="mt-2 h-10 w-2/3"
      />
      <Text style={tailwind("text-sm text-center text-gray-600 mt-8")}>
        Unsure where to begin?{"\n"}
        Check out the user guide in the{" "}
        <Text style={tailwind("text-purple-700")}>settings screen</Text>.
      </Text>
    </View>
  );
}
