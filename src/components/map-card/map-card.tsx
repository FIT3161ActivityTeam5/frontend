import React from 'react';
import { Modal, Pressable, View } from 'react-native';
import tailwind from 'tailwind-rn';
import useAuthentication from '../../hooks/use-authentication';
import Map from '../../lib/entities/map';
import Button from '../button/button';
import MapPreview from '../map-preview/map-preview';
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

const API_URL = "https://qqvwnljate.execute-api.ap-southeast-2.amazonaws.com";

type MapCardModalProps = {
  /** Whether or not the modal is currently visible. */
  visible: boolean;

  name: string;

  /** Callback to be called when the modal is to be closed. */
  onClose: (name: string) => void;
};

function MapCardModal(props: MapCardModalProps) {
  const [input, setInput] = React.useState(props.name);

  const close = () => {
    props.onClose(input);
  };

  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={props.visible}
      onRequestClose={close}
    >
      <View style={tailwind('flex-1 justify-center items-center p-8 bg-gray-900 bg-opacity-75')}>
        <View style={tailwind("bg-gray-50 w-full")}>
          <Text style={tailwind('text-purple-600 font-semibold text-2xl')}>Edit Map</Text>
          <TextInput value={input} onChange={setInput} style="border-purple-800 py-2 px-2" />
          <Button title="Close" onPress={close}></Button>
        </View>
      </View>
    </Modal>
  );
}

export type MapCardProps = {
  /** The ID of the map which is being displayed. */
  mapId: string;

  /** The user given name of the map. */
  mapName: string;

  /** The number of nodes in the map. */
  mapNodeCount: number;

  /** The number of edges in the map. */
  mapEdgeCount: number;

  map: Map;

  /** Calback to be called when the user requests to open the map. */
  onOpen: () => void;

  /** Callback to be called when the user requests to delete the map. */
  onDelete: () => void;

  /** Callback to be called when the user updates the name of the map. */
  onUpdate: () => void;
};

export default function MapCard(props: MapCardProps) {
  const [modalVisible, setModalVisible] = React.useState(false);
  const auth = useAuthentication();

  const saveMap = (data: any) => fetch(`${API_URL}/map/${props.mapId}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${auth.accessToken}`,
        'mapdata': JSON.stringify(data),
      }
    });

  return (
    <>
      <Pressable
        style={[tailwind('flex-row bg-gray-50 mx-4 my-2 rounded-md overflow-hidden'), SmallShadow]}
        onPress={props.onOpen}
      >
        <MapPreview map={props.map} />
        <View style={tailwind('flex-grow flex-col justify-between m-3')}>
          <View>
            <Text style={tailwind('text-xl font-bold')}>{props.mapName}</Text>
            <Text>Map with <Text>{props.mapNodeCount}</Text> nodes and <Text>{props.mapEdgeCount}</Text> edges.</Text>
          </View>
          <View style={tailwind('flex-row justify-end')}>
            <Button title="Delete" onPress={props.onDelete} style={'w-1/2 px-2 py-2 mr-1'}></Button>
            <Button title="..." onPress={() => setModalVisible(true)} style={'w-10 px-2 py-2'}></Button>
          </View>
        </View>
      </Pressable>
      <MapCardModal
        visible={modalVisible}
        name={props.mapName}
        onClose={(name: string) => {
          saveMap({
            ...props.map.mapData,
            name: name,
          }).then(e => {
            setModalVisible(false);
            props.onUpdate();
          });
        }} 
      />
    </>
  );
}
