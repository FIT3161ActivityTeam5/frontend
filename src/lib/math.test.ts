import { distance } from './math';


describe('distance', () => {
  it('returns correct values', () => {
    expect(distance({
        x: 0,
        y: 0,
    }, {
        x: 1.0,
        y: 0.0,
    })).toBeDefined();
    expect(distance({
        x: 0,
        y: 0,
    }, {
        x: 1.0,
        y: 0.0,
    })).toEqual(1.0);
  });
});
