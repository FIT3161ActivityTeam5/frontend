import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import useAuthentication from '../hooks/use-authentication';
import tailwind from 'tailwind-rn';
import { RefreshControl, ScrollView } from 'react-native';
import Text from '../components/text/text';
import useMaps from '../hooks/use-maps';
import MapCard from '../components/map-card/map-card';
import Button from '../components/button/button';

function MapList() {
  const [state, maps, refresh] = useMaps();

  return (
    <ScrollView
      style={tailwind('py-2')}
      refreshControl={
        <RefreshControl
          refreshing={state === 'loading'}
          onRefresh={refresh}
        />
      }
    >
      {state === 'error' || !maps ? <>
        <Text>Error occured!</Text>
      </> : <>
        {maps.map((m, i) => (
          <MapCard key={i} />
        ))}
      </>}
    </ScrollView>
  );
}

export default function MapListScreen() {
  const auth = useAuthentication();
  return (
    <SafeAreaView style={tailwind('flex-1 justify-between')}>
      <MapList />
      <Button onPress={() => {auth.logout()}} title="Log Out" />
    </SafeAreaView>
  );
}
