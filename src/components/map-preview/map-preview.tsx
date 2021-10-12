import React from "react";
import Svg, { Circle, Line } from "react-native-svg";
import tailwind, { getColor } from "tailwind-rn";
import Map from "../../lib/entities/map";
import MapAxis from "../map/map-axis";

export default function MapPreview(props: { map: Map }) {
  return (
    <Svg
      style={[tailwind("w-1/3 border-r border-gray-300"), { aspectRatio: 1 }]}
      viewBox="0 0 1024 1024"
    >
      <MapAxis canvasSize={1024} thickness={9.0} />

      {props.map.mapData.edges.map((e, i) => (
        <Line
          key={i}
          x1={props.map.mapData.nodes[e.start].pos[0]}
          y1={props.map.mapData.nodes[e.start].pos[1]}
          x2={props.map.mapData.nodes[e.end].pos[0]}
          y2={props.map.mapData.nodes[e.end].pos[1]}
          strokeWidth={6.0}
          stroke={getColor("purple-900")}
        />
      ))}

      {Object.keys(props.map.mapData.nodes).map((n, i) => (
        <Circle
          key={i}
          cx={props.map.mapData.nodes[n].pos[0]}
          cy={props.map.mapData.nodes[n].pos[1]}
          fill={getColor("purple-900")}
          r={16}
        />
      ))}
    </Svg>
  );
}
