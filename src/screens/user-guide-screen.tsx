import React from 'react';
import {WebView} from 'react-native-webview';


export default function UserGuideScreen() {
  return (
        <WebView source={{ uri: 'https://drive.google.com/file/d/1oHTtM7ptAjqANdLE9w6DLcOqFzJmvkde/view?usp=sharing' }} />
  );
}
