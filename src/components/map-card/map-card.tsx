import React from 'react';
import { Modal, Pressable, View } from 'react-native';
import tailwind from 'tailwind-rn';
import Button from '../button/button';
import Text from '../text/text';
import TextInput from '../text_input/input';

// Shadow to use with the map cards.
// Generated using https://ethercreative.github.io/react-native-shadow-generator/
const SmallShadow = {
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 1,
  },
  shadowOpacity: 0.18,
  shadowRadius: 1.00,
  
  elevation: 1,
};

type MapCardModalProps = {
  /** Whether or not the modal is currently visible. */
  visible: boolean;

  /** Callback to be called when the modal is to be closed. */
  onClose: () => void;
};

function MapCardModal(props: MapCardModalProps) {
  const [input, setInput] = React.useState("Map Name");

  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={props.visible}
      onRequestClose={props.onClose}
    >
      <View style={tailwind('flex-1 justify-center items-center p-8 bg-gray-900 bg-opacity-75')}>
        <View style={tailwind("bg-gray-50 w-full")}>
          <Text style={tailwind('text-purple-600 font-semibold text-2xl')}>Edit Map</Text>
            <TextInput value={input} onChange={setInput} style="border-purple-800 py-2 px-2" />
            <Button title="Close" onPress={props.onClose}></Button>
        </View>
      </View>
    </Modal>
  );
}

export type MapCardProps = {
  /** The ID of the map which is being displayed. */
  mapId: string;

  /** Calback to be called when the user requests to open the map. */
  onOpen: () => void;

  /** Callback to be called when the user requests to delete the map. */
  onDelete: () => void;
};

export default function MapCard(props: MapCardProps) {
  const [modalVisible, setModalVisible] = React.useState(false);
  const color = props.mapId.substr(0, 6);

  return (
    <>
      <Pressable
        style={[tailwind('flex-row bg-gray-50 mx-4 my-2 rounded-md overflow-hidden'), SmallShadow]}
        onPress={props.onOpen}
      >
        <View style={[tailwind('w-1/3'), {aspectRatio: 1, backgroundColor: `#${color}`}]}></View>
        <View style={tailwind('flex-grow flex-col justify-center items-center')}>
          <Text>{color}</Text>
          <Button title={"Delete"} onPress={props.onDelete} style={'w-1/2 px-2 py-2 mr-4'}></Button>
          <Button title=". . ." onPress={() => setModalVisible(true)} style={'w-10 px-2 py-2'}></Button>
        </View>
      </Pressable>
      <MapCardModal visible={modalVisible} onClose={() => setModalVisible(false)} />
    </>
  );
}
