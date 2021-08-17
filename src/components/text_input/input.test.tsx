import React from 'react';
import renderer from 'react-test-renderer';

import UselessTextInput from './input'

describe('<Text Input />', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<UselessTextInput></UselessTextInput>).toJSON();
    expect(tree).toMatchSnapshot();
  });

});
