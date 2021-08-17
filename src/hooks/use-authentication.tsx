import React, { useEffect } from 'react';
import * as AuthSession from 'expo-auth-session';
import * as SecureStore from 'expo-secure-store';
import AuthenticationContext from '../contexts/authentication-context';
import toQueryString from '../lib/to-query-string';

// Basic configuration for Auth0.
const AUTH0_CLIENT_ID = "W3HvRAyTSMN9U0AXjv3BsqThfDHMbpc1";
const AUTH0_URI = "dev-vak81b59.us.auth0.com";
const REDIRECT_URI = AuthSession.makeRedirectUri({useProxy: true});

// Key used to look up the auth token in the users local store.
const ACCESS_TOKEN_KEY = "thrive-access-token";

export type AuthenticationProviderProps = {
    children?: React.ReactNode;
};

/**
 * A provider which gives access to the AuthenticationContext.
 * 
 * TODO: Make this testable?
 */
export function AuthenticationProvider(props: AuthenticationProviderProps) {
  // This is the redirect URI which must be added to the list of accepted
  // callback URLs.
  if (REDIRECT_URI !== 'https://auth.expo.io/@fit3161/frontend') {
    throw new Error("Authentication redirect URI is incorrect. Please log in to your Expo acccount on the command line.")
  }

  // Store the users token for interfacing with the backend.
  const [accessToken, setAccessToken] = React.useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = React.useState(true);

  // When the user firsts opens the app, try and get the saved token.
  useEffect(() => {
    SecureStore.getItemAsync(ACCESS_TOKEN_KEY)
      .then(token => {
        if (token !== null) {
          setAccessToken(token);
        }
      }).finally(() => {
        setIsLoading(false);
      });
  }, []);

  // The login function will simply begin the Auth0 flow. Once this is finished,
  // the 'result' variable will be updated with the result of the login. 
  const login = () => {
    const params = toQueryString({
      client_id: AUTH0_CLIENT_ID,
      redirect_uri: REDIRECT_URI,
      response_type: "id_token",
      nonce: "nonce",
      rememberLastLogin: "false",
    });

    AuthSession.startAsync({
      authUrl: `https://${AUTH0_URI}/authorize${params}`,
    }).then(response => {
      if (response.type === 'success') {
        const token = response.params['id_token'];
        SecureStore.setItemAsync(ACCESS_TOKEN_KEY, token)
          .then(() => {
            setAccessToken(token);
          });
      }
    });
  };
  
  // The logout function will clear the users access token, which will drop them
  // back to the login screen.
  const logout = () => {
    const params = toQueryString({
      client_id: AUTH0_CLIENT_ID,
      redirect_uri: REDIRECT_URI,
    });

    // TODO: Maybe we can just send a fetch request in the background to hit the
    //       /logout endpoint, to prevent the ugly browser window showing up.
    AuthSession.startAsync({
      authUrl: `https://${AUTH0_URI}/logout${params}`,
    }).then(_ => {
      // Delete the stored key, and update the state.
      SecureStore.deleteItemAsync(ACCESS_TOKEN_KEY).then(() => {
        setAccessToken(undefined);
      });
    });
  };

  // Memoize the authentication state, to only re-render when isLoggedIn changes.
  const memo = React.useMemo(
    () => ({
      accessToken,
      isLoading,
      login,
      logout,
    }),
    [accessToken, isLoading],
  );

  return (
    <AuthenticationContext.Provider value={memo}>
      {props.children}
    </AuthenticationContext.Provider>
  );
}

/**
 * Hook which provides access to the authentication context.
 */
 export default function useAuthentication() {
  const context = React.useContext(AuthenticationContext);
  if (context === undefined) {
    throw new Error(
      'useAuthentication must be used from within an AuthenticationProvider'
    );
  }
  return context;
}
