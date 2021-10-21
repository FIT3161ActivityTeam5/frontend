import React from 'react';
import renderer from 'react-test-renderer';

import MapPreview from './map-preview';

describe('<MapPreview />', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
        <MapPreview
            map={{
                associatedUserID: '0',
                mapID: '0',
                mapData: {
                  name: "New Map",
                  nodes: {
                    'a': {
                      pos: [242, 712],
                      description: "Example node 1",
                    },
                    'b': {
                      pos: [600, 623],
                      description: "Example node 2",
                    },
                    'c': {
                      pos: [812, 200],
                      description: "Example node 3",
                    },
                    'd': {
                      pos: [492, 475],
                      description: "Example node 4",
                    }
                  },
                  edges: [
                    {start: 'a', end: 'b'},
                    {start: 'b', end: 'c'},
                    {start: 'd', end: 'b'},
                  ]
                },
            }}
        />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
