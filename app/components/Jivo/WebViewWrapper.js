import React, { useState, useRef } from 'react';
import { WebView } from 'react-native-webview';
import { Platform } from 'react-native';
import BackgroundTimer from 'react-native-background-timer';

const WebViewWrapper = ({ setShowLoader, getTrackingOptions }) => {
  const [webviewKey, setWebviewKey] = useState(0);
  const webview = useRef();

  const reload = () => {
    setWebviewKey((prevState) => prevState + 1);
  };

  const handleOnLoadEnd = () => {
    webview?.current?.postMessage(getTrackingOptions());

    if (Platform.OS === 'ios') {
      BackgroundTimer.start();
    }
    BackgroundTimer.setTimeout(() => {
      setShowLoader(false);
    }, 2000);
    if (Platform.OS === 'ios') {
      BackgroundTimer.stop();
    }
  };

  return (
    <WebView
      key={webviewKey}
      onContentProcessDidTerminate={reload}
      originWhitelist={['*']}
      ref={webview}
      javaScriptEnabled={true}
      domStorageEnabled={true}
      onLoadStart={() => setShowLoader(true)}
      onLoadEnd={handleOnLoadEnd}
      source={{
        uri: 'https://testing.granatum.solutions/jivo',
      }}
    />
  );
};

export default WebViewWrapper;
