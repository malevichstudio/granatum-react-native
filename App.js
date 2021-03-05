import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import 'react-native-gesture-handler';
import 'intl';
import 'intl/locale-data/jsonp/en';
import SplashScreen from 'react-native-splash-screen';

import { StyleProvider } from 'native-base';
import configureStore from './app/configureStore';
import App from './app/containers/App';
import getTheme from './app/theme/components';
import material from './app/theme/variables/defaultTheme';
import LanguageProvider from './app/containers/LanguageProvider';

const store = configureStore();

export default function AppRoot() {
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    <Provider store={store}>
      <LanguageProvider>
        <StyleProvider style={getTheme(material)}>
          <App />
        </StyleProvider>
      </LanguageProvider>
    </Provider>
  );
}
