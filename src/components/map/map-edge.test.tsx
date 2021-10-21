import React from 'react';
import renderer from 'react-test-renderer';

import MapEdge from './map-edge';

describe('<MapEdge />', () => {
    it('renders correctly', () => {
      const tree = renderer.create(
          <MapEdge
              x1={0}
              y1={0}
              x2={1}
              y2={1}
          />
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });
});
