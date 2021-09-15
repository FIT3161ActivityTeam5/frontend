import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../components/button/button';
import useAuthentication from '../hooks/use-authentication';
import tailwind from 'tailwind-rn';
import clsx from 'clsx';
import { Alert, Modal, ScrollView, View } from 'react-native';
import Text from '../components/text/text';
import TextInput from '../components/text_input/input';

export default function MapListScreen() {
    
  return (
    <SafeAreaView style={tailwind('flex-1 bg-white justify-between p-8')}>
        <Text>To be added</Text>
    </SafeAreaView>
  );
}