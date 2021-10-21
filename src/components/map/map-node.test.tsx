import React from 'react';
import renderer from 'react-test-renderer';

import MapNode from './map-node';

describe('<MapNode />', () => {
    it('renders correctly', () => {
      const tree = renderer.create(
          <MapNode
            x={0}
            y={0}
            value={1.0}
            onDrag={jest.fn()}
            onPress={jest.fn()}
          />
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });
    it('applies selected style correctly', () => {
      const tree = renderer.create(
          <MapNode
            x={0}
            y={0}
            value={1.0}
            onDrag={jest.fn()}
            onPress={jest.fn()}
            selected={true}
          />
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });
});
