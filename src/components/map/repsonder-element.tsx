import React from 'react';
import { Animated, PanResponder } from 'react-native';
import { G as GView } from 'react-native-svg';
import { Vec2 } from '../../lib/math';

export interface ResponderElementProps {
  x:number, 
  y:number,
  onClick?: (evt:any) => void,
  onClickRelease?: (evt:any) => void,
  onClickCanceled?: (evt:any) => void,
  onDrag?: (x:number, y: number) => void,
  children?: React.ReactNode,
}

export default function ResponderElement(props: ResponderElementProps) {
  const offset = React.useRef<Vec2>({x: 0, y: 0}).current;

  return (
    <GView
    x={props.x}
    y={props.y}
    onLongPress={e => console.log("Long!!!")}
    onStartShouldSetResponder={(evt) => true}
    onMoveShouldSetResponder={(evt) => false}
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
      if (props.onClickCanceled) {
        props.onClickCanceled(evt)
      }
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