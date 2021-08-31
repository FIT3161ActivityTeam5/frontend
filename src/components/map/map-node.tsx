import React from 'react';
import { Circle, Text as SvgText, G } from 'react-native-svg';
import { getColor } from 'tailwind-rn';
import { Vec2 } from '../../lib/math';
import ResponderElement from './repsonder-element';

export type MapNodeProps = {
  x: number;
  y: number;
  value: number;

  onDrag: (pos: Vec2) => void; 
};

export default function MapNode(props: MapNodeProps) {
  function onDrag(x: number, y: number) {
    props.onDrag({x, y});
  }

  // TODO: This is highly laggy, should look at some other dragging library.
  //       Probably use this https://reactnative.dev/docs/panresponder
  return (
    <ResponderElement
      onDrag={(x, y) => onDrag(x, y)}
      onClickRelease={e => console.log("!!!")}
      onClick={e => console.log("click")}
      x={props.x}
      y={props.y}
    >
      <Circle
        cx={0}
        cy={0}
        r={15}
        fill={getColor('purple-500')}
        fillOpacity={0.5}
      />
      <Circle
        cx={0}
        cy={0}
        r={12}
        fill={getColor('purple-500')}
      />
      <SvgText
        x={0}
        y={4}
        fill="white"
        textAnchor="middle"
      >12
      </SvgText>
    </ResponderElement>
  );
}
