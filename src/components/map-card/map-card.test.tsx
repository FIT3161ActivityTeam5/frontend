import React from 'react';
import renderer from 'react-test-renderer';
import AuthenticationContext from '../../contexts/authentication-context';

import MapCard from './map-card';

describe('<MapCard />', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <AuthenticationContext.Provider value={{
        accessToken: 'abc',
        isLoading: false,
        login: jest.fn(),
        logout: jest.fn(),
      }}>
        <MapCard
          mapId="test_id"
          onDelete={jest.fn()}
          mapEdgeCount={0}
          mapNodeCount={0}
          mapName="Test Map"
          onOpen={jest.fn()}
          onUpdate={jest.fn()}
          map={{
            associatedUserID: '0',
            mapID: '0',
            mapData: {
              edges: [],
              nodes: {},
              name: "Test Map"
            }
          }}
        />
      </AuthenticationContext.Provider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
