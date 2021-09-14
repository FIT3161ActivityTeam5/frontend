import { getQuadrant } from './map-utilities';

describe('getQuadrant', () => {
  it('returns the correct quadrants', () => {
    expect(getQuadrant({
        x: 0.25, y: 0.25
    }, 1.0)).toEqual("top left");
    expect(getQuadrant({
        x: 0.75, y: 0.25
    }, 1.0)).toEqual("top right");
    expect(getQuadrant({
        x: 0.25, y: 0.75
    }, 1.0)).toEqual("bottom left");
    expect(getQuadrant({
        x: 0.75, y: 0.75
    }, 1.0)).toEqual("bottom right");
  });
});
