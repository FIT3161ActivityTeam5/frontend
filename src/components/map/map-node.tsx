import React from 'react';
import { Animated, PanResponder } from 'react-native';
import { Circle, Text as SvgText, G } from 'react-native-svg';
import { SvgPanZoomElement } from 'react-native-svg-pan-zoom';
import { getColor } from 'tailwind-rn';

const AnimatedGroup = Animated.createAnimatedComponent(G);

export type MapNodeProps = {
  x: number;
  y: number;
  value: number;
};

type Vec2 = {
  x: number;
  y: number;
};

export default function MapNode(props: MapNodeProps) {
  const [position, setPosition] = React.useState<Vec2>({x: props.x, y: props.y})

  function onDrag(x: number, y: number) {
    setPosition({x, y});
  }

  const pan = React.useRef(new Animated.ValueXY()).current;

  const panResponder = React.useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        console.log("!!!!!!!!");
        pan.setOffset({
          x: (pan.x as any)._value,
          y: (pan.y as any)._value
        });
      },
      onPanResponderMove: Animated.event(
        [
          null,
          { dx: pan.x, dy: pan.y }
        ]
      ),
      onPanResponderRelease: () => {
        pan.flattenOffset();
      }
    })
  ).current;

  // TODO: This is highly laggy, should look at some other dragging library.
  //       Probably use this https://reactnative.dev/docs/panresponder
  return (
    <AnimatedGroup
      x={pan.x}
      y={pan.x}
      {...panResponder.panHandlers}
    >
      <Circle
        cx={0}
        cy={0}
        r={14}
        fill={getColor('purple-500')}
        fillOpacity={0.5}
      />
    </AnimatedGroup>
  );
}
