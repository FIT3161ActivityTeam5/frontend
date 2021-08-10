import React from 'react';
import renderer from 'react-test-renderer';

import Text from './text';

describe('<Text />', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Text>Hello world!</Text>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('applies styles correctly', () => {
    const tree = renderer.create(
      <Text
        style={{
            fontWeight: '700',
            fontStyle: 'italic',
            fontSize: 28,
            color: 'red',
        }}
      >
          Hello world!
      </Text>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
