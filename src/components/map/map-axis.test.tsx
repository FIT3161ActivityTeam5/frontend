import React from 'react';
import renderer from 'react-test-renderer';

import MapAxis from './map-axis';

describe('<MapAxis />', () => {
    it('renders correctly', () => {
      const tree = renderer.create(
          <MapAxis
              canvasSize={8.0}
          />
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });
    it('applies stroke width correctly', () => {
      const tree = renderer.create(
          <MapAxis
            canvasSize={8.0}
            thickness={4.0}
          />
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });
});
