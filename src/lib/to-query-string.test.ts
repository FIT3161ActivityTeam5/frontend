import toQueryString from './to-query-string';

describe('toQueryString', () => {
  it('returns a corrently parsed string', () => {
    expect(toQueryString({
        hello: 'b',
        world: 'd'
    })).toEqual("?hello=b&world=d");
  });
});
