import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../components/button/button';
import useAuthentication from '../hooks/use-authentication';
import { ListItem, Image, Input } from 'react-native-elements';
import tailwind from 'tailwind-rn';
import clsx from 'clsx';
import { Alert, Modal, ScrollView, View } from 'react-native';
import Text from '../components/text/text';

export default function MapListScreen() {
    const auth = useAuthentication();
    const [modalVisible, setModalVisible] = useState(false);

    // Testing list for displaying maps
    const mapList = [
        {
            name: 'Map Number 1',
            image: require('../../assets/adaptive-icon.png')
        },
        {
            name: 'Map Number 2',
            image: require('../../assets/adaptive-icon.png')
        },
        {
            name: 'Map Number 3',
            image: require('../../assets/adaptive-icon.png')
        }
    ]

  return (
      <SafeAreaView style={tailwind('flex-1 bg-white justify-between p-8')}>
          <View style={tailwind('items-center')}>
              <Text style={tailwind('text-purple-800 font-semibold text-3xl')}>
                  ACTIVITY
              </Text>
          </View>
          <View style={ tailwind('items-end')}>
              <Button title="+" onPress={() => console.log("Add")} style={clsx('font-bold w-1/6')}></Button>
          </View>
          <ScrollView>
          {
              mapList.map((l, i) => (
                  <ListItem key={i} bottomDivider>
                      <ListItem.Content style={{ flexDirection: "row", justifyContent: "center"}}>
                          <Image source={l.image} style={{ width: 130, height: 130 }}></Image>
                          <Button title={l.name} onPress={() => console.log("Open Map")} style={clsx('w-1/2 px-2 py-2')}></Button>
                          <Button title=". . ." onPress={() => setModalVisible(true)} style={clsx(' w-10 px-2 py-2')}></Button>
                      </ListItem.Content>
                  </ListItem>
              ))
          }
          </ScrollView>

          <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                  Alert.alert("Modal has been closed.");
                  setModalVisible(!modalVisible);
              }}
          >
              <SafeAreaView style={tailwind('flex-1 justify-center items-center')}>
                  <SafeAreaView style={ tailwind('items-center bg-white') }>
                      <Text style={tailwind('text-purple-600 font-semibold text-2xl')}>Edit Map</Text>
                      <Input style={ tailwind('border-purple-800 py-2 px-2')}></Input>
                      <Button title="Close" onPress={() => setModalVisible(!modalVisible)}></Button>
                  </SafeAreaView>
              </SafeAreaView>
          </Modal>
    </SafeAreaView>
  );
}