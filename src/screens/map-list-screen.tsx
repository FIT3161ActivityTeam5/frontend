import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../components/button/button';
import useAuthentication from '../hooks/use-authentication';
import { ListItem, Image } from 'react-native-elements';
import tailwind from 'tailwind-rn';

export default function MapListScreen() {
    const auth = useAuthentication();

    // Testing list for displaying maps
    const mapList = [
        {
            name: 'Map Number 1',
            image: require('../assets/adaptive-icon.png')
        },
        {
            name: 'Map Number 2',
            image: require('../assets/adaptive-icon.png')
        },
        {
            name: 'Map Number 3',
            image: require('../assets/adaptive-icon.png')
        }
    ]

  return (
      <SafeAreaView style={tailwind('flex-1 bg-white justify-between p-8')}>
          {
              mapList.map((l, i) => (
                  <ListItem key={i} bottomDivider>
                      <Image source={ l.image } style={{width: 180, height:180}}></Image>
                      <ListItem.Content>
                          <ListItem.Title>{l.name}</ListItem.Title>
                      </ListItem.Content>
                  </ListItem>
              ))
          }
          <Button title="Log Out" onPress={auth.logout} />
    </SafeAreaView>
  );
}
