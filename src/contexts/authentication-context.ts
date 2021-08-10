import React from 'react';

/**
 * The AuthenticationContext contains all information relating to the users
 * current session. This will likely only be an authentication token for
 * interaction with the backend, but could include more fields later. 
 */
const AuthenticationContext = React.createContext<
  | {
      accessToken: string | undefined;
      loading: boolean;
      login: () => void;
      logout: () => void;
    }
  | undefined
>(undefined);

export default AuthenticationContext;
