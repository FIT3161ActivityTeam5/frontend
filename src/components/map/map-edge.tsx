import React from 'react';
import { Line } from 'react-native-svg';
import { getColor } from 'tailwind-rn';

export type MapEdgeProps = {
  /** Start x position of the edge. */
  x1: number;
  
  /** Start y position of the edge. */
  y1: number;

  /** End x position of the edge. */
  x2: number;
  
  /** End y position of the edge. */
  y2: number;
};

/**
 * Represents an edge connecting two nodes on the map view.
 */
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
