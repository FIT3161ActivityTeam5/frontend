import React from 'react';
import renderer from 'react-test-renderer';
import AuthenticationContext from '../../contexts/authentication-context';

import NewUserCard from './new-user-card';

describe('<NewUserCard />', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <AuthenticationContext.Provider value={{
        accessToken: 'abc',
        isLoading: false,
        login: jest.fn(),
        logout: jest.fn(),
      }}>
        <NewUserCard onCreateFirst={jest.fn()} />
      </AuthenticationContext.Provider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
