import React from 'react';
import renderer from 'react-test-renderer';

import TextInput from './input';

describe('<Text Input />', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<TextInput onChange={()=>{}}></TextInput>).toJSON();
    expect(tree).toMatchSnapshot();
  });

});