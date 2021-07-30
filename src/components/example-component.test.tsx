import React from 'react';
import renderer from 'react-test-renderer';

import ExampleComponent from './example-component';

describe('<ExampleComponent />', () => {
  // Snapshot test.
  it('renders correctly', () => {
    const tree = renderer.create(<ExampleComponent />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
