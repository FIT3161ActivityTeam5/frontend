/**
 * Basic 2D vector type which holds an x and y position.
 */
export type Vec2 = {
  x: number;
  y: number;
};

/**
 * Returns the distance between the two given points.
 */
export function distance(a: Vec2, b: Vec2) {
  const x = a.x - b.x;
  const y = a.y - b.y;
  return Math.sqrt((x * x) + (y * y));
}
