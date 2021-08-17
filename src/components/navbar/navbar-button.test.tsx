import React from 'react';
import renderer from 'react-test-renderer';

import NavbarButton from './navbar-button';

describe('<NavbarButton />', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <NavbarButton title="Confirm" icon="Icon" active />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly when inactive', () => {
    const tree = renderer.create(
      <NavbarButton title="Confirm" icon="Icon" active={false} />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
