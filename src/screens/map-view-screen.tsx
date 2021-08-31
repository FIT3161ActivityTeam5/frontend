import React from 'react';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import SvgPanZoom from 'react-native-svg-pan-zoom';
import tailwind from 'tailwind-rn';
import MapAxis from '../components/map/map-axis';
import MapNode from '../components/map/map-node';
import MapEdge from '../components/map/map-edge';
import { Vec2 } from '../lib/math';
import { getNodeWeight, getQuadrant } from '../lib/map-utilities';
import Text from '../components/text/text';
import { View } from 'react-native';

const CANVAS_SIZE = 1024;

const NODES: {x: number, y: number, value: number}[] = [
  // { x: 304, y: 655, value: 29 },
  // { x: 622, y: 677, value: 43 },
  // { x: 395, y: 597, value: 22 },
  // { x: 585, y: 588, value: 49 },
  // { x: 617, y: 711, value: 28 },
  { x: 493, y: 314, value: 31 },
  // { x: 520, y: 281, value: 15 },
  // { x: 445, y: 418, value: 16 },
  // { x: 375, y: 697, value: 26 },
  // { x: 416, y: 335, value: 38 },
  // { x: 286, y: 673, value: 40 },
  // { x: 384, y: 585, value: 29 },
  // { x: 395, y: 601, value: 29 },
  // { x: 325, y: 337, value: 64 },
  // { x: 498, y: 473, value: 75 },
  // { x: 597, y: 618, value: 60 },
  // { x: 309, y: 429, value: 80 },
  // { x: 492, y: 642, value: 30 },
  // { x: 298, y: 522, value: 5 },
  // { x: 704, y: 755, value: 74 },
  { x: 695, y: 666, value: 89 },
  // { x: 718, y: 401, value: 32 },
  // { x: 765, y: 608, value: 25 },
  // { x: 457, y: 428, value: 66 },
  // { x: 298, y: 749, value: 67 },
  // { x: 362, y: 631, value: 56 },
  // { x: 698, y: 436, value: 32 },
  // { x: 265, y: 512, value: 38 },
  // { x: 667, y: 604, value: 92 },
  // { x: 262, y: 419, value: 32 },
  // { x: 558, y: 580, value: 61 },
  // { x: 417, y: 314, value: 82 },
  // { x: 288, y: 649, value: 56 },
  // { x: 351, y: 382, value: 32 },
  // { x: 370, y: 387, value: 96 },
  // { x: 433, y: 604, value: 18 },
  // { x: 348, y: 745, value: 87 },
  // { x: 725, y: 465, value: 81 },
  // { x: 614, y: 651, value: 50 },
  // { x: 275, y: 418, value: 79 },
  // { x: 558, y: 284, value: 61 },
  // { x: 336, y: 439, value: 41 },
  // { x: 611, y: 589, value: 72 },
  // { x: 549, y: 601, value: 98 },
  // { x: 427, y: 277, value: 47 },
  // { x: 512, y: 424, value: 10 },
  // { x: 426, y: 467, value: 65 },
  // { x: 429, y: 548, value: 41 },
  // { x: 485, y: 560, value: 49 },
  // { x: 469, y: 288, value: 61 },
  // { x: 597, y: 686, value: 11 },
  // { x: 620, y: 604, value: 14 },
  // { x: 400, y: 287, value: 35 },
  // { x: 262, y: 509, value: 43 },
  // { x: 506, y: 594, value: 38 },
  // { x: 557, y: 484, value: 66 },
  // { x: 679, y: 390, value: 52 },
  // { x: 738, y: 671, value: 67 },
  // { x: 388, y: 736, value: 84 },
  // { x: 562, y: 309, value: 75 },
  // { x: 527, y: 764, value: 42 },
  // { x: 560, y: 428, value: 83 },
  // { x: 660, y: 424, value: 29 },
  // { x: 660, y: 638, value: 40 },
];

export default function MapViewScreen() {
  const [nodes, setNodes] = React.useState(NODES);

  const handleDrag = (idx: number) => (pos: Vec2) => {
    const newNodes = [...nodes];
    newNodes[idx] = {
      ...newNodes[idx],
      x: pos.x,
      y: pos.y,
    };
    setNodes(newNodes);
  }

  const margin = useSafeAreaInsets();

  return (
    <SafeAreaView style={tailwind('w-full h-full')}>
      <View style={[tailwind("absolute p-4"), {
        marginTop: margin.top
      }]}
      focusable={false}
      >
        <Text style={tailwind("text-4xl text-gray-400")}>
          {getQuadrant({x: nodes[0].x, y: nodes[0].y}, CANVAS_SIZE)}
        </Text>
        <Text style={tailwind("text-4xl text-gray-400")}>
          {getNodeWeight({x: nodes[0].x, y: nodes[0].y}, CANVAS_SIZE)}
        </Text>
      </View>
      <SvgPanZoom
        canvasWidth={CANVAS_SIZE}
        canvasHeight={CANVAS_SIZE}
        minScale={0.8}
        maxScale={5.0}
        initialZoom={0.7}
      >
        <MapAxis canvasSize={CANVAS_SIZE} />

        <MapEdge x1={nodes[0].x} y1={nodes[0].y} x2={nodes[1].x} y2={nodes[1].y} />

        {nodes.map((n, i) => (
          <MapNode key={i} x={n.x} y={n.y} value={n.value} onDrag={handleDrag(i)} />
        ))}
      </SvgPanZoom>
    </SafeAreaView>
  );
}
