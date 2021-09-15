import React from 'react';
import renderer from 'react-test-renderer';

import MapCard from './map-card';

describe('<MapCard />', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<MapCard mapId="test_id" />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
