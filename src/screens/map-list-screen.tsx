import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import tailwind, { getColor } from 'tailwind-rn';
import { RefreshControl, ScrollView, View } from 'react-native';
import Text from '../components/text/text';
import useMaps from '../hooks/use-maps';
import MapCard from '../components/map-card/map-card';
import NewUserCard from '../components/new-user-card/new-user-card';
import useCreateMap from '../hooks/use-create-map';
import useDeleteMap from '../hooks/use-delete-map';
import { RootStackParamList, TabBarParamList } from './authenticated-screen';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type MapListScreenProps = CompositeScreenProps<
  BottomTabScreenProps<TabBarParamList, 'MapList'>,
  NativeStackScreenProps<RootStackParamList>
>;

/**
 * Responsible for rendering the map list.
 */
export default function MapListScreen({route, navigation}: MapListScreenProps) {
  const [state, maps, refresh] = useMaps();
  const [createMap] = useCreateMap();
  const [deleteMap] = useDeleteMap();

  return (
    <SafeAreaView style={tailwind('flex-1 justify-between')}>
      <ScrollView
        style={tailwind('py-2')}
        refreshControl={
          <RefreshControl
            colors={[getColor('purple-500')]}
            refreshing={state === 'loading'}
            onRefresh={refresh}
          />
        }
      >
        {state === 'loading' ? <>
          <View style={tailwind('flex-row bg-gray-200 bg-opacity-80 mx-4 my-2 rounded-md')}>
            <View style={[tailwind('w-1/3'), {aspectRatio: 1}]}></View>
          </View>
          <View style={tailwind('flex-row bg-gray-200 bg-opacity-60 mx-4 my-2 rounded-md')}>
            <View style={[tailwind('w-1/3'), {aspectRatio: 1}]}></View>
          </View>
          <View style={tailwind('flex-row bg-gray-200 bg-opacity-30 mx-4 my-2 rounded-md')}>
            <View style={[tailwind('w-1/3'), {aspectRatio: 1}]}></View>
          </View>
        </> : state === 'error' || !maps ? (
          <Text>Error occured!</Text>
        ) : <>
          {maps.length === 0 ? <>
            <NewUserCard
              onPressPrompt={() => createMap(() => {
                refresh();
              })}
            />
          </> : <>
            {maps.map((m, i) => (
              <MapCard
                key={i}
                mapId={m.mapID}
                onDelete={() => {
                  deleteMap(m.mapID, () => {
                    refresh();
                  });
                }}
                onOpen={() => {
                  navigation.navigate('MapView');
                }}
              />
            ))}
          </>}
        </>}
      </ScrollView>
    </SafeAreaView>
  );
}
