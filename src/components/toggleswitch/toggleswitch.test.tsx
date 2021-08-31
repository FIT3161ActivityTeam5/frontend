import React from 'react';
import renderer from 'react-test-renderer';
import ToggleSwitch from './toggleswitch';

describe('<Button />', () => {
    // Snapshot test.
    it('renders correctly', () => {
        const tree = renderer.create(<ToggleSwitch />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('applies custom styles correctly', () => {
        const tree = renderer.create(
            <ToggleSwitch/>
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('applies custom text styles correctly', () => {
        const tree = renderer.create(
            <ToggleSwitch />
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });
});