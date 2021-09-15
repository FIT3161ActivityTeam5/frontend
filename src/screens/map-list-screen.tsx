import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import tailwind from 'tailwind-rn';
import { RefreshControl, ScrollView, View } from 'react-native';
import Text from '../components/text/text';
import useMaps from '../hooks/use-maps';
import MapCard from '../components/map-card/map-card';
import Button from '../components/button/button';
import useCreateMap from '../hooks/use-create-map';

type NewUserCardProps = {
  onCreateFirst: () => void;
};

function NewUserCard(props: NewUserCardProps) {
  const [createMap, loading] = useCreateMap();

  return (
    <View style={tailwind('items-center p-8')}>
      <Text style={tailwind('text-xl text-center text-gray-600')}>
        Looks like you don't have any maps, press the button below to get started.
      </Text>
      <Button
        title={loading ? "Loading..." : "New Map"}
        onPress={() => createMap(() => {
          props.onCreateFirst();
        })}
        style="mt-8 h-10 w-2/3"
      />
      <Text style={tailwind('text-sm text-center text-gray-600 mt-2')}>
        Unsure where to begin?{'\n'}
        Check out the user guide in the <Text style={tailwind("text-purple-700")}>settings screen</Text>.
      </Text>
    </View>
  );
}

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
      {state === 'loading' ? (
        <Text>Loading!</Text>
      ) : state === 'error' || !maps ? (
        <Text>Error occured!</Text>
      ) : <>
        {maps.length === 0 ? <>
          <NewUserCard onCreateFirst={refresh} />
        </> : <>
          {maps.map((m, i) => (
            <MapCard key={i} mapId={m.mapID} />
          ))}
        </>}
      </>}
    </ScrollView>
  );
}

export default function MapListScreen() {
  return (
    <SafeAreaView style={tailwind('flex-1 justify-between')}>
      <MapList />
    </SafeAreaView>
  );
}
