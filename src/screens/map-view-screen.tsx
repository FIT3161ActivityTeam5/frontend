import React from 'react';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import SvgPanZoom from 'react-native-svg-pan-zoom';
import tailwind from 'tailwind-rn';
import MapAxis from '../components/map/map-axis';
import MapNode from '../components/map/map-node';
import MapEdge from '../components/map/map-edge';
import { Vec2 } from '../lib/math';
import { Modal, TextInput, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from './authenticated-screen';
import useAuthentication from '../hooks/use-authentication';
import Button from '../components/button/button';
import Toast from 'react-native-root-toast';
import { getQuadrant, getScaledNodeWeight } from '../lib/map-utilities';
import Text from '../components/text/text';
import clsx from 'clsx';

const CANVAS_SIZE = 1024;

const API_URL = "https://qqvwnljate.execute-api.ap-southeast-2.amazonaws.com";

type MapViewScreenProps = NativeStackScreenProps<RootStackParamList, 'MapView'>;

type NodeEditModalProps = {
  /** Whether or not the modal is currently visible. */
  visible: boolean;

  nodePos?: [number, number];

  nodeDescription?: string;

  /** Callback to be called when the modal is to be closed. */
  onClose: (description: string) => void;
};

function NodeEditModal(props: NodeEditModalProps) {
  const labels = {
    'top left': 'Physical, Away',
    'top right': 'Physical, Toward',
    'bottom left': 'Mental, Away',
    'bottom right': 'Mental, Toward',
  };

  const pos = props.nodePos || [0, 0];
  const label = labels[getQuadrant({x: pos[0], y: pos[1]}, CANVAS_SIZE)];

  const [description, setDescription] = React.useState(props.nodeDescription);

  const close = () => {
    props.onClose(description!);
  };

  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={props.visible}
      onRequestClose={close}
    >
      <View style={tailwind('flex-1 justify-center items-center p-8 bg-gray-900 bg-opacity-75')}>
        <View style={tailwind("bg-gray-50 w-full rounded-lg p-4")}>
          <Text style={tailwind('text-black font-semibold text-2xl')}>Node Details</Text>
          <Text>{label}</Text>
          <Text>Importance: 1.3</Text>

          <Text style={tailwind('text-black font-bold text-lg mt-4')}>Description</Text>
          <TextInput
            multiline
            textAlignVertical={'top'}
            style={tailwind('bg-white border border-gray-300 rounded p-1')}
            numberOfLines={6}
            value={description}
            onChangeText={setDescription}
          />
          <Button title="Close" onPress={close} style="mt-4"></Button>
        </View>
      </View>
    </Modal>
  );
}

function useForceUpdate(){
  const [value, setValue] = React.useState(0); // integer state
  return () => setValue(value => value + 1); // update the state to force render
}

function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default function MapViewScreen({route, navigation}: MapViewScreenProps) {
  const { map } = route.params;
  const nodes = React.useRef(map.mapData.nodes).current;
  const edges = React.useRef(map.mapData.edges).current;
  const insets = useSafeAreaInsets();
  const auth = useAuthentication();
  const force = useForceUpdate();

  const [isAddingEdge, setIsAddingEdge] = React.useState(false);
  const [edgeStartNode, setEdgeStartNode] = React.useState<string | undefined>(undefined);

  const [selectedNode, setSelectedNode] = React.useState<string | undefined>(undefined);

  const handleDrag = (idx: string) => (pos: Vec2) => {
    nodes[idx].pos[0] = pos.x;
    nodes[idx].pos[1] = pos.y;
    force();
  }

  const handlePress = (idx: string) => () => {
    if (isAddingEdge) {
      if (!edgeStartNode) {
        setEdgeStartNode(idx);
        Toast.show('Now select the node to connect this one to.', {
          duration: Toast.durations.SHORT,
        });
      } else {
        if (idx !== edgeStartNode) {
          // create edge between edgeStartNode and idx
          edges.push({
            start: edgeStartNode,
            end: idx
          });
          setIsAddingEdge(false);
          setEdgeStartNode(undefined);
        }
      }
    } else {
      setSelectedNode(idx);
    }
  };

  const saveMap = (data: any) => {
    console.log(data);
    fetch(`${API_URL}/map/${map.mapID}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${auth.accessToken}`,
        'mapdata': JSON.stringify(data),
      }
    });
  };

  // This effect will be ran when the component is dismounted, we will use this
  // to save the map data to the backend.
  React.useEffect(() => () => {
    saveMap({
      ...map.mapData,
      nodes: nodes,
      edges: edges,
    });
  }, []);

  return (
    <SafeAreaView style={tailwind('w-full h-full')}>
      <View
        style={[
          tailwind("absolute p-4 z-10"),
          {
            marginTop: insets.top
          }
        ]}
      >
        <Button style="mt-0" title="Back" onPress={() => navigation.goBack()} />
        <Button
          style="mt-1"
          title="New Node"
          onPress={() => {
            // Generate a random key which will serve as an 'id' for this node.
            const key = getRandomInt(0, 0xFFFFFFFF).toString(16);

            // Position it in the center to start with, it would be nice if we could
            // tap on the screen to choose where to place it, but the SvgPanZoom
            // library does not have an 'onPress' prop we can use for this.
            nodes[key] = {
              pos: [CANVAS_SIZE / 2.0, CANVAS_SIZE / 2.0],
              description: ''
            };

            // Inform the user of what just happened.
            Toast.show('Created a new node at the center of the map!', {
              duration: Toast.durations.LONG,
            });

            // Force a re-render.
            force();
          }}
        />
        <Button
          style={clsx(
            'mt-1',
            {
              'bg-red-500': isAddingEdge,
            }
          )}
          title={isAddingEdge ? "Cancel" : "New Edge"}
          onPress={() => {
            if (isAddingEdge) {
              setEdgeStartNode(undefined);
            } else {
              Toast.show('Select the first node to begin creating an edge.', {
                duration: Toast.durations.SHORT,
              });
            }
            setIsAddingEdge(!isAddingEdge);
          }}
        />
      </View>
      
      <SvgPanZoom
        canvasWidth={CANVAS_SIZE}
        canvasHeight={CANVAS_SIZE}
        minScale={0.8}
        maxScale={5.0}
        initialZoom={0.7}
      >
        <MapAxis canvasSize={CANVAS_SIZE} />

        {edges.map((e, i) => (
          <MapEdge
            key={i}
            x1={nodes[e.start].pos[0]}
            y1={nodes[e.start].pos[1]}
            x2={nodes[e.end].pos[0]}
            y2={nodes[e.end].pos[1]}
          />
        ))}
        
        {Object.keys(nodes).map((n, i) => (
          <MapNode
            key={i}
            onDrag={handleDrag(n)}
            onPress={handlePress(n)}
            x={nodes[n].pos[0]}
            y={nodes[n].pos[1]}
            value={getScaledNodeWeight({x: nodes[n].pos[0], y: nodes[n].pos[1]}, CANVAS_SIZE)}
            selected={n === edgeStartNode}
          />
        ))}
      </SvgPanZoom>

      {Object.keys(nodes).map((n, i) => (
        <NodeEditModal
          key={n}
          visible={selectedNode === n}
          nodePos={nodes[n].pos}
          nodeDescription={nodes[n].description}
          onClose={(description: string) => {
            nodes[n].description = description;
            setSelectedNode(undefined);
          }}
        />
      ))}
    </SafeAreaView>
  );
}
