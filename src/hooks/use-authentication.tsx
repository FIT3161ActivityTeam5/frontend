import React, { useEffect } from 'react';
import * as AuthSession from 'expo-auth-session';
import * as SecureStore from 'expo-secure-store';
import AuthenticationContext from '../contexts/authentication-context';

// Basic configuration for Auth0.
const AUTH0_CLIENT_ID = "W3HvRAyTSMN9U0AXjv3BsqThfDHMbpc1";
const AUTH0_URI = "https://dev-vak81b59.us.auth0.com";
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
  const [request, result, promptAsync] = AuthSession.useAuthRequest(
    {
      redirectUri: REDIRECT_URI,
      clientId: AUTH0_CLIENT_ID,
      responseType: 'id_token',
      scopes: ['openid', 'profile'],
      extraParams: {
        nonce: 'nonce',
      },
    },
    AuthSession.useAutoDiscovery(AUTH0_URI),
  );

  // This is the redirect URI which must be added to the list of accepted
  // callback URLs.
  if (REDIRECT_URI !== 'https://auth.expo.io/@fit3161/frontend') {
    throw new Error("Authentication redirect URI is incorrect. Please log in to your Expo acccount on the command line.")
  }

  // Store the users token for interfacing with the backend.
  const [accessToken, setAccessToken] = React.useState<string | undefined>(undefined);

  // When the user firsts opens the app, try and get the saved token.
  useEffect(() => {
    SecureStore.getItemAsync(ACCESS_TOKEN_KEY)
      .then(token => {
        if (token !== null) {
          setAccessToken(token);
        }
      });
  }, []);

  // The login function will simply begin the Auth0 flow. Once this is finished,
  // the 'result' variable will be updated with the result of the login. 
  const login = () => {
    promptAsync({useProxy: true}).catch(e => {
      console.log(`Auth0 promptAsync Error: ${e}`);
    });
  };
  
  // The logout function will clear the users access token, which will drop them
  // back to the login screen.
  const logout = () => {
    // TODO: Do we need to hit the /logout endpoint to log the user out on the
    //       Auth0 end? https://auth0.com/docs/api/authentication#logout
    
    // The following code works to log the user out, but does not properly redirect
    // back to our application.
    // https://github.com/auth0/react-native-auth0/blob/91c08f93d37e0dd2f2c41415ebb65f4cf720f1a4/src/webauth/index.js#L155
    //
    // await WebBrowser.openAuthSessionAsync(
    //  `https://dev-vak81b59.us.auth0.com/v2/logout?client_id=${encodeURIComponent(AUTH0_CLIENT_ID)}&returnTo=${encodeURIComponent(REDIRECT_URI)}`,
    //  REDIRECT_URI,
    // );

    // Delete the stored key, and update the state.
    SecureStore.deleteItemAsync(ACCESS_TOKEN_KEY).then(() => {
      setAccessToken(undefined);
    });
  };
  
  // When the 'result' from useAuthRequest changes, we will run this code to
  // determine if we are successfully logged in.
  React.useEffect(() => {
    if (result) {
      // TODO: Report error back to the caller.
      if (result.type === 'error') {
        console.log(`Auth0 Error: ${result.error}`);
        return;
      }

      // If we successfully logged in, set the access token.
      if (result.type === 'success') {
        const token = result.params['id_token'];
        SecureStore.setItemAsync(ACCESS_TOKEN_KEY, token)
          .then(() => {
            setAccessToken(token);
          });
      }
    }
  }, [result]);

  // Memoize the authentication state, to only re-render when isLoggedIn changes.
  const memo = React.useMemo(
    () => ({
      accessToken,
      loading: request === null,
      login,
      logout,
    }),
    [accessToken, request]
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
