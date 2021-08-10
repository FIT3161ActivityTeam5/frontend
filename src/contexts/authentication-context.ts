import React from 'react';

/**
 * The AuthenticationContext contains all information relating to the users
 * current session. This will likely only be an authentication token for
 * interaction with the backend, but could include more fields later. 
 */
const AuthenticationContext = React.createContext<
  | {
      /**
       * The users access token (probably a JWT).
       * Used for interaction with the backend.
       * */
      accessToken: string | undefined;

      /**
       * Whether or not Auth0 is still loading.
       * If this is false, the user should not be given the option to log in
       * (disable the login button).
       */
      loading: boolean;

      /* Opens up a prompt for the user to sign in with. */
      login: () => void;

      /* Logs the user out. */
      logout: () => void;
    }
  | undefined
>(undefined);

export default AuthenticationContext;
