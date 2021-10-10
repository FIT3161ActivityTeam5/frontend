import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import tailwind, { getColor } from 'tailwind-rn';
import { RefreshControl, ScrollView, View } from 'react-native';
import Text from '../components/text/text';
import useMaps from '../hooks/use-maps';
import MapCard from '../components/map-card/map-card';
import NewUserCard, { PromptIntent } from '../components/new-user-card/new-user-card';
import useCreateMap from '../hooks/use-create-map';
import useDeleteMap from '../hooks/use-delete-map';
import { RootStackParamList, TabBarParamList } from './authenticated-screen';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Map from '../lib/entities/map';
import Graph from '../lib/entities/graph';
import Button from '../components/button/button';

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

  const createNewMap = (intent: PromptIntent) => {
    if (intent === 'blank') {
      createMap({
        name: "New Map",
        nodes: {},
        edges: []
      });
    }

    if (intent === 'template') {
      createMap({
        name: "New Map",
        nodes: {
          'a': {
            pos: [242, 712]
          },
          'b': {
            pos: [600, 623]
          },
          'c': {
            pos: [812, 200]
          },
          'd': {
            pos: [492, 475]
          }
        },
        edges: [
          {start: 'a', end: 'b'},
          {start: 'b', end: 'c'},
          {start: 'd', end: 'b'},
        ]
      });
    }
    refresh();
  };

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
              onPressPrompt={createNewMap}
            />
          </> : <>
            {maps.map((m, i) => (
              <MapCard
                key={i}
                mapId={m.mapID}
                map={m}
                mapName={m.mapData.name}
                mapNodeCount={Object.keys(m.mapData.nodes).length}
                mapEdgeCount={m.mapData.edges.length}
                onDelete={() => {
                  deleteMap(m.mapID, () => {
                    refresh();
                  });
                }}
                onOpen={() => {
                  navigation.navigate('MapView', {
                    map: m,
                  });
                }}
                onUpdate={() => {
                  refresh();
                }}
              />
            ))}
            <View style={tailwind('items-center mt-4 mb-16')}>
              <Button
                title="Create New Map"
                onPress={() => createNewMap('blank')}
                style="w-full w-1/2"
              />
            </View>
          </>}
        </>}
      </ScrollView>
    </SafeAreaView>
  );
}