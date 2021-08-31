import React, { Component } from 'react';
import { G } from 'react-native-svg';

type ResponderElementProps = {
    x: number; 
    y: number;
    onClick?: (evt: any) => void;
    onClickRelease?: (evt: any) => void;
    onClickCanceled?: (evt: any) => void;
    onDrag?: (evt: any) => void;
    children?: React.ReactNode;
};

const ResponderElement = React.forwardRef<G, ResponderElementProps>((props, ref) => {
    const [releasedNaturally, setReleasedNaturally] = React.useState(true);

    const {onClick = () => {}, onClickRelease = () => {}, onClickCanceled = () => {}, onDrag = () => {}} = props;

    return (
        <G
          ref={ref}
          x={props.x}
          y={props.y}
          onStartShouldSetResponder={() => true}
          onMoveShouldSetResponder={() => false}
          onResponderGrant={(evt: any) => { 
            setReleasedNaturally(true);
            onClick(evt);
          }}
          onResponderTerminationRequest={(evt: any) => {
            if (evt.nativeEvent.touches.length > 1) {
                setReleasedNaturally(false);
              return true;
            }
            onClickCanceled(evt);
            return false;
          }}
          onResponderMove={onDrag}
          onResponderRelease={(evt: any) => {
            if (releasedNaturally) {
              onClickRelease(evt);
              setReleasedNaturally(true);
            }
          }}
        >
          {props.children}
        </G>
      );
});

export default ResponderElement;
