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
        <MapCard mapId="test_id" onDelete={jest.fn()} />
      </AuthenticationContext.Provider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
