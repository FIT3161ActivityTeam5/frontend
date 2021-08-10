import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { ActionSheetIOS, View } from 'react-native';
import tailwind from 'tailwind-rn';
import {
  useFonts,
  Poppins_100Thin,
  Poppins_100Thin_Italic,
  Poppins_200ExtraLight,
  Poppins_200ExtraLight_Italic,
  Poppins_300Light,
  Poppins_300Light_Italic,
  Poppins_400Regular,
  Poppins_400Regular_Italic,
  Poppins_500Medium,
  Poppins_500Medium_Italic,
  Poppins_600SemiBold,
  Poppins_600SemiBold_Italic,
  Poppins_700Bold,
  Poppins_700Bold_Italic,
  Poppins_800ExtraBold,
  Poppins_800ExtraBold_Italic,
  Poppins_900Black,
  Poppins_900Black_Italic,
} from '@expo-google-fonts/poppins';
import Button from './components/button/button';
import useAuthentication, { AuthenticationProvider } from './hooks/use-authentication';

function AuthScreen() {
  const auth = useAuthentication();
  return (
    <View style={tailwind('flex-1 bg-white items-center justify-center')}>
      {auth.accessToken ? (
        <Button title="Log Out" onPress={auth.logout} />
      ) : (
        <Button title="Log In" onPress={auth.login} disabled={auth.loading} />
      )}
    </View>
  );
}

export default function App() {
  // Load the fonts.
  const [fontsLoaded] = useFonts({
    Poppins_100Thin,
    Poppins_100Thin_Italic,
    Poppins_200ExtraLight,
    Poppins_200ExtraLight_Italic,
    Poppins_300Light,
    Poppins_300Light_Italic,
    Poppins_400Regular,
    Poppins_400Regular_Italic,
    Poppins_500Medium,
    Poppins_500Medium_Italic,
    Poppins_600SemiBold,
    Poppins_600SemiBold_Italic,
    Poppins_700Bold,
    Poppins_700Bold_Italic,
    Poppins_800ExtraBold,
    Poppins_800ExtraBold_Italic,
    Poppins_900Black,
    Poppins_900Black_Italic,
  });

  // TODO: We could render some sort of loading screen here.
  if (!fontsLoaded) {
    return null;
  }

  return (
    <AuthenticationProvider>
      <AuthScreen />
    </AuthenticationProvider>
  );
}
