import React from 'react';
import { Line } from 'react-native-svg';
import { getColor } from 'tailwind-rn';

export type MapEdgeProps = {
  x1: number;
  y1: number;

  x2: number;
  y2: number;
};

export default function MapEdge(props: MapEdgeProps) {
  return (
    <Line
      x1={props.x1}
      y1={props.y1}
      x2={props.x2}
      y2={props.y2}
      strokeWidth={2.0}
      stroke={getColor('purple-900')}
    />
  );
}
