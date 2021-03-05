import React, { useEffect, useState } from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
import { FormattedMessage } from 'react-intl';
import { Button, Spinner, Left, Body, Title, Header, Right } from 'native-base';
import { useDispatch, useSelector } from 'react-redux';
import { toggleHelpChat } from '../../containers/App/actions';
import {
  selectHelpChatOpen,
  selectJivoTracking,
} from '../../containers/App/selectors';
import ChevronLeftIcon from '../icons/ChevronLeftIcon';
import variables from '../../theme/variables/defaultTheme';
import messages from './messages';
import colors from '../../theme/variables/colors/defaultColors';
import WebViewWrapper from './WebViewWrapper';

const Jivo = () => {
  const dispatch = useDispatch();
  const [showLoader, setShowLoader] = useState(false);
  const helpChatOpen = useSelector(selectHelpChatOpen);
  const jivoTracking = useSelector(selectJivoTracking);

  const handleClose = () => {
    dispatch(toggleHelpChat());
  };

  useEffect(() => {
    if (helpChatOpen) {
      StatusBar.pushStackEntry({
        backgroundColor: '#fff',
        barStyle: 'dark-content',
        animated: false,
      });
    }
  }, [helpChatOpen]);

  if (!helpChatOpen) {
    return null;
  }

  function getTrackingOptions() {
    let result = 'https://testing.granatum.solutions/';

    if (jivoTracking?.name === 'ProjectsRoot') {
      const routesLength = jivoTracking?.state?.routes?.length;
      const currentRoute = jivoTracking?.state?.routes[routesLength - 1];

      if (currentRoute?.name === 'Projects' && !currentRoute?.params) {
        result += 'projects';
      } else if (
        currentRoute?.params?.projectId &&
        !currentRoute?.params?.courseId
      ) {
        result += `project/${currentRoute?.params?.projectId}/courses`;
      } else if (
        currentRoute?.params?.projectId &&
        currentRoute?.params?.courseId
      ) {
        result += `projects/${currentRoute?.params?.projectId}/course/${currentRoute?.params?.courseId}/sessions`;
      }
    } else if (jivoTracking?.name === 'Session') {
      result += `session/${jivoTracking?.params?.sessionId}/sheet/${jivoTracking?.params?.sheetId}`;
    }

    return result;
  }

  return (
    <View style={styles.wrapper}>
      <Header>
        <Left style={{ flex: 1 }}>
          <Button transparent onPress={handleClose}>
            <ChevronLeftIcon color={variables.textDark} />
          </Button>
        </Left>

        <Body style={{ flex: 1 }}>
          <Title screenTitle>
            <FormattedMessage {...messages.help} />
          </Title>
        </Body>
        <Right style={{ flex: 1 }} />
      </Header>
      <View style={styles.inner}>
        {showLoader && (
          <Spinner
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            color={colors.primary}
          />
        )}
        <WebViewWrapper
          setShowLoader={setShowLoader}
          getTrackingOptions={getTrackingOptions}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    zIndex: 100,
    backgroundColor: '#fff',
    height: '100%',
  },
  inner: {
    flex: 1,
    height: '100%',
    paddingTop: 0,
    backgroundColor: '#fff',
  },
});

export default Jivo;
