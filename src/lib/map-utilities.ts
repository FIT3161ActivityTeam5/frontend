import { distance, Vec2 } from './math';

/**
 * Given a nodes position, returns the quadrant of the node.
 */
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

/**
 * Given a nodes position on the canvas, returns the weight of the node, based
 * on its distance to the center of the canvas.
 */
export function getNodeWeight(pos: Vec2, canvasSize: number) {
    // Return a linear relationship between the distance to the center.
    const half = canvasSize / 2.0;
    return distance(pos, {x: half, y: half}) / half;
}

/**
 * Given a nodes position on the canvas, returns the weight of the node, based
 * on some sort of basic scale.
 */
export function getScaledNodeWeight(pos: Vec2, canvasSize: number) {
    const distance = getNodeWeight(pos, canvasSize);
    return distance * 4.0;
}
