import toQueryString from './to-query-string';

describe('toQueryString', () => {
  it('returns a value', () => {
    expect(toQueryString({
      hello: 'b',
      world: 'd'
    })).toBeDefined();
  });
  it('returns a corrently parsed string', () => {
    expect(toQueryString({
        hello: 'b',
        world: 'd'
    })).toEqual("?hello=b&world=d");
  });
});
