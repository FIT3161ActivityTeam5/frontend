import React from 'react';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import SvgPanZoom from 'react-native-svg-pan-zoom';
import tailwind from 'tailwind-rn';
import MapAxis from '../components/map/map-axis';
import MapNode from '../components/map/map-node';
import MapEdge from '../components/map/map-edge';
import { Vec2 } from '../lib/math';
import { View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from './authenticated-screen';
import useAuthentication from '../hooks/use-authentication';
import Button from '../components/button/button';
import Graph from '../lib/entities/graph';
import Toast from 'react-native-root-toast';

const CANVAS_SIZE = 1024;

const API_URL = "https://qqvwnljate.execute-api.ap-southeast-2.amazonaws.com";

type MapViewScreenProps = NativeStackScreenProps<RootStackParamList, 'MapView'>;

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
  const nodes = React.useRef((JSON.parse(map.mapData as unknown as string) as Graph).nodes).current;
  const edges = React.useRef((JSON.parse(map.mapData as unknown as string) as Graph).edges).current;
  const insets = useSafeAreaInsets();
  const auth = useAuthentication();
  const force = useForceUpdate();

  const handleDrag = (idx: string) => (pos: Vec2) => {
    nodes[idx].pos[0] = pos.x;
    nodes[idx].pos[1] = pos.y;
    force();
  }

  const handlePress = (idx: number) => () => {
    console.log("Pressed node " + idx);
  };

  const saveMap = (data: any) => {
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
              pos: [CANVAS_SIZE / 2.0, CANVAS_SIZE / 2.0]
            };

            // Inform the user of what just happened.
            Toast.show('Created a new node at the center of the mapp!', {
              duration: Toast.durations.LONG,
            });

            // Force a re-render.
            force();
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
            onPress={handlePress(i)}
            x={nodes[n].pos[0]}
            y={nodes[n].pos[1]}
            value={2}
          />
        ))}
      </SvgPanZoom>
    </SafeAreaView>
  );
}
