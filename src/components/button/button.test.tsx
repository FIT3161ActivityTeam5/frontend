import React from 'react';
import renderer from 'react-test-renderer';

import Button from './button';

describe('<Button />', () => {
  // Snapshot test.
  it('renders correctly', () => {
    const tree = renderer.create(<Button title="Confirm" onPress={() => {}} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
