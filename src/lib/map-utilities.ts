import { distance, Vec2 } from './math';

export function getQuadrant(pos: Vec2, canvasSize: number) {
    const half = canvasSize / 2.0;
    if (pos.x >= half && pos.y >= half) {
        return "bottom right";
    }
    if (pos.x >= half && pos.y < half) {
        return "top right";
    }
    if (pos.x < half && pos.y >= half) {
        return "bottom left";
    }
    if (pos.x < half && pos.y < half) {
        return "top left";
    }
    return "???";
}

export function getNodeWeight(pos: Vec2, canvasSize: number) {
    const half = canvasSize / 2.0;
    return distance(pos, {x: half, y: half}) / half;
}
