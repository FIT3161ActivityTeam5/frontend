import React from 'react';
import { Circle, Text as SvgText } from 'react-native-svg';
import { getColor } from 'tailwind-rn';
import { distance, Vec2 } from '../../lib/math';
import ResponderElement from './repsonder-element';

export type MapNodeProps = {
  /** The x position of this node on the map view. */
  x: number;
  
  /** The y position of this node on the map view. */
  y: number;
  
  /** The importance value of this node to display. */
  value: number;

  /** Callback to call when this node is dragged. */
  onDrag: (pos: Vec2) => void; 

  /** Callback to call when this node is pressed. */
  onPress: () => void;

  /** Whether or not the node is currently selected. */
  selected?: boolean;
};

/**
 * Represents a single node in the map view. Can be dragged and clicked on.
 */
export default function MapNode(props: MapNodeProps) {
  const startPosition = React.useRef<Vec2>({x: 0, y: 0}).current;

  function onDrag(x: number, y: number) {
    props.onDrag({x, y});
  }

  // TODO: This is highly laggy, should look at some other dragging library.
  //       Probably use this https://reactnative.dev/docs/panresponder
  return (
    <ResponderElement
      onDrag={(x, y) => onDrag(x, y)}
      onClickRelease={e => {
        const dist = Math.abs(
          distance(
            {x: e.nativeEvent.locationX, y: e.nativeEvent.locationY},
            startPosition
          )
        );
        // If we released our finger without moving the node very far, count it
        // as a press.
        if (dist < 0.5) {
          props.onPress();
        }
      }}
      onClick={e => {
        startPosition.x = e.nativeEvent.locationX;
        startPosition.y = e.nativeEvent.locationY;
      }}
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
      {props.selected && (
        <Circle
          cx={0}
          cy={0}
          r={18}
          stroke={getColor('purple-600')}
          strokeWidth={3.0}
        />
      )}
      <SvgText
        x={0}
        y={4}
        fill="white"
        textAnchor="middle"
      >
        {props.value.toFixed(1)}
      </SvgText>
    </ResponderElement>
  );
}
