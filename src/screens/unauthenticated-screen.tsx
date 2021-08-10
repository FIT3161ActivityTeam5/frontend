import React from 'react';
import LoginScreen from './login-screen';

/**
 * The UnauthenticatedScreen is the screen which is shown to the user when they
 * are not logged in. For now it just contains the LoginScreen, but could contain
 * other stuff such as privacy notice etc.
 */
export default function UnauthenticatedScreen() {
  return <LoginScreen />;
}
