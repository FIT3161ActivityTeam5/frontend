export type Vec2 = {
  x: number;
  y: number;
};

export function distance(a: Vec2, b: Vec2) {
  const x = a.x - b.x;
  const y = a.y - b.y;
  return Math.sqrt((x * x) + (y * y));
}
