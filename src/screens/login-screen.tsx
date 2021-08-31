import React from 'react';
import Text from '../components/text/text';
import Button from '../components/button/button';
import tailwind from 'tailwind-rn';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ImageBackground, Image } from 'react-native';


/**
 * The LoginScreen contains the login form.
 */
export default function LoginScreen() {
    return( 
    

        <SafeAreaView style={tailwind('flex-1 bg-blue-300 items-center justify-around p-8')}>
           
            <Text style={tailwind('text-purple-800 font-semibold text-3xl  text-center ')}>
                Welcome to ACTIVITY
            </Text>


            <Text style={tailwind('text-purple-800 font-semibold text-3xl  text-center')}>
                An Acceptance and Commitment Therapy Informed Visual Intervention Tool for You
            </Text>

            <Button title="Continue"  onPress={() => {}} />
            
        </SafeAreaView>

    )
    ;

    
}
