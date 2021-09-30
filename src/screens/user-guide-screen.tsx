import React from 'react';
import {WebView} from 'react-native-webview';


export default function UserGuideScreen() {
  return (
        <WebView source={{ uri: 'https://drive.google.com/file/d/1YKQbuUwe1IVU7w2Pgvzj_cGuphcaQYkp/view?usp=sharing' }} />
  );
}
