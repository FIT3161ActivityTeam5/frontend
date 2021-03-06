import React from 'react';
import renderer from 'react-test-renderer';

import Button from './button';

describe('<Button />', () => {
  // Snapshot test.
  it('renders correctly', () => {
    const tree = renderer.create(<Button title="Confirm" onPress={() => {}} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('applies custom styles correctly', () => {
    const tree = renderer.create(
      <Button
        title="Confirm"
        onPress={() => {}}
        style="bg-red-600"
      />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('applies custom text styles correctly', () => {
    const tree = renderer.create(
      <Button
        title="Confirm"
        onPress={() => {}}
        textStyle="font-thin"
      />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('applies the loading indicator correctly', () => {
    const tree = renderer.create(
      <Button
        title="Confirm"
        onPress={() => {}}
        loading={true}
      />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
