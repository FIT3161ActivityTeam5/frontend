import React from 'react';
import { Animated, PanResponder } from 'react-native';
import { G as GView } from 'react-native-svg';
import { Vec2 } from '../../lib/math';

export type ResponderElementProps = {
  /** The x position of the element in the SVG canvas. */
  x: number;
  
  /** The y position of the element in the SVG canvas. */
  y: number;
  
  /** Callback to call when the user clicks this element. */
  onClick?: (evt:any) => void;
  
  /** Callback to call when the user releases their click. */
  onClickRelease?: (evt:any) => void;

  /** Callback to call when the user drags this element. */
  onDrag?: (x:number, y: number) => void,

  /** Children SVG nodes to have wrapped in this component. */
  children?: React.ReactNode,
}

/**
 * Wraps some SVG elements in a parent element which allows for interactivity
 * such as dragging, clicking and more.
 */
export default function ResponderElement(props: ResponderElementProps) {
  const offset = React.useRef<Vec2>({x: 0, y: 0}).current;

  return (
    <GView
      x={props.x}
      y={props.y}
      onLongPress={e => {}}
      onStartShouldSetResponder={() => true}
      onMoveShouldSetResponder={() => false}
      onResponderGrant={(evt) => {
        offset.x = evt.nativeEvent.locationX - props.x;
        offset.y = evt.nativeEvent.locationY - props.y;
        if (props.onClick) {
          props.onClick(evt)
        }
      }}
      onResponderTerminationRequest={(evt) => {
        if (evt.nativeEvent.touches.length > 1) {
          return true
        }
        // if (props.onClickCanceled) {
        //   props.onClickCanceled(evt)
        // }
        return false
      }}
      onResponderMove={e => {
        if(props.onDrag) {
          props.onDrag(e.nativeEvent.locationX - offset.x, e.nativeEvent.locationY - offset.y);
        }
      }}
      onResponderRelease={(evt) => {
          if ( props.onClickRelease) {
            props.onClickRelease(evt)
          }
      }}
    >
      {props.children}
    </GView>
  );
}