import React from 'react';
import { Circle, Line } from 'react-native-svg';
import { getColor } from 'tailwind-rn';

export type MapAxisProps = {
  /** Size of the canvas which this axis is being displayed on. */
  canvasSize: number;

  /** The stroke width of the axis lines. */
  thickness?: number;
};

/**
 * Represents the circular rings and horizontal/vertical axis on the map view.
 */
export default function MapAxis(props: MapAxisProps) {
  const {thickness = 2.0} = props;

  return (
    <>
      {/* Inner ring. */}
      <Circle
        cx={props.canvasSize / 2.0}
        cy={props.canvasSize / 2.0}
        r={128}
        strokeWidth={thickness}
        stroke={getColor('gray-300')}
      />
      
      {/* Outer ring. */}
      <Circle
        cx={props.canvasSize / 2.0}
        cy={props.canvasSize / 2.0}
        r={384}
        strokeWidth={thickness}
        stroke={getColor('gray-300')}
      />


      {/* Vertical axis. */}
      <Line
        x1={props.canvasSize / 2.0}
        y1={0}
        x2={props.canvasSize / 2.0}
        y2={props.canvasSize}
        strokeWidth={thickness}
        stroke={getColor('gray-300')}
      />

      {/* Horizontal axis. */}
      <Line
        x1={0}
        y1={props.canvasSize / 2.0}
        x2={props.canvasSize}
        y2={props.canvasSize / 2.0}
        strokeWidth={thickness}
        stroke={getColor('gray-300')}
      />
    </>
  );
}
