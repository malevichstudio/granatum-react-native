import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import { AppState, Platform, StatusBar } from 'react-native';
import VIForegroundService from '@voximplant/react-native-foreground-service';
import {
  enterSession,
  enterSheet,
  leaveSheet,
  leaveSession as leaveSessionAction,
} from './actions';
import { useInjectSaga } from '../../utils/injectSaga';
import { injectionKeys } from '../../config';
import saga from './sagas';
import { DAEMON } from '../../utils/constants';
import { bindToSaga } from '../../configureStore';
import { useInjectReducer } from '../../utils/injectReducer';
import reducer from './reducers';
import Session from './Session';
import leaveSession from './sagas/leaveSession';
import { selectSessionId } from './selectors';
import { selectHelpChatOpen, selectSocketConnectError } from '../App/selectors';
import { socketApi } from '../App/sagas';

const SessionPage = ({ route }) => {
  useInjectSaga({ key: injectionKeys.session, saga, mode: DAEMON });
  useInjectReducer({
    key: injectionKeys.session,
    reducer,
  });
  const dispatch = useDispatch();
  const sessionId = useSelector(selectSessionId);
  const helpChatOpen = useSelector(selectHelpChatOpen);
  const appState = useRef(AppState.currentState);
  const socketConnectError = useSelector(selectSocketConnectError);
  const [reloadData, setReloadData] = useState(false);
  const socketErrorRef = useRef(socketConnectError);

  useEffect(() => {
    // Если было отключение сокета, перезапрашиваем данные
    if (socketErrorRef.current && !socketConnectError) {
      setReloadData(true);
    }
    socketErrorRef.current = socketConnectError;
  }, [socketConnectError]);

  const startService = async () => {
    if (Platform.OS !== 'android') {
      return;
    }
    if (Platform.Version >= 26) {
      const channelConfig = {
        id: 'ForegroundServiceChannel',
        name: 'Notification Channel',
        description: 'Notification Channel for Foreground Service',
        enableVibration: false,
        importance: 2,
      };
      await VIForegroundService.createNotificationChannel(channelConfig);
    }
    const notificationConfig = {
      id: 3456,
      title: 'Granatum',
      text: 'Granatum solution запущен',
      icon: 'ic_notification',
      priority: 0,
    };
    if (Platform.Version >= 26) {
      notificationConfig.channelId = 'ForegroundServiceChannel';
    }
    await VIForegroundService.startService(notificationConfig);
  };

  const stopService = async () => {
    if (Platform.OS !== 'android') {
      return;
    }
    await VIForegroundService.stopService();
  };

  const handleAppStateChange = (nextAppState) => {
    // Если это ios и его перевели в неактивный режим, при возврате перезапрашиваем данные
    if (
      appState.current === 'background' &&
      nextAppState === 'active' &&
      !socketApi.socket.connected &&
      Platform.OS === 'ios'
    ) {
      setReloadData(true);
    }

    if (
      appState.current.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      stopService();
    }
    if (
      nextAppState.match(/inactive|background/) &&
      appState.current === 'active'
    ) {
      startService();
    }
    appState.current = nextAppState;
  };

  useFocusEffect(
    useCallback(() => {
      if (typeof route?.params?.sessionId === 'string') {
        dispatch(enterSession(route.params.sessionId, route?.params?.sheetId));
        setReloadData(false);
      }

      return () => {
        if (typeof route?.params?.sessionId === 'string') {
          // Приходится вызывать сагу напрямую, потому что иначе она не вызывается,
          // поскольку мы пытаемя сделать это на размонтировании родительского
          // компонента

          const leaveSessionGenerator = bindToSaga(leaveSession);
          leaveSessionGenerator({
            sessionId: route.params.sessionId,
          });

          // этот экшен удалит все данные в стейте, поэтому запускаем его в конце
          // иначе мы не сможем отписаться
          dispatch(leaveSessionAction(route.params.sessionId));
        }
      };
    }, [route.params.sessionId, reloadData]),
  );

  useFocusEffect(
    useCallback(() => {
      if (typeof route?.params?.sheetId === 'string' && sessionId) {
        dispatch(enterSheet(route.params.sheetId));
      }

      return () => {
        if (typeof route?.params?.sheetId === 'string' && sessionId) {
          dispatch(leaveSheet(route?.params.sheetId));
        }
      };
    }, [route.params.sheetId, sessionId]),
  );

  useFocusEffect(
    useCallback(() => {
      AppState.addEventListener('change', handleAppStateChange);
      return () => {
        AppState.removeEventListener('change', handleAppStateChange);
        stopService();
      };
    }, []),
  );

  useEffect(() => {
    if (!helpChatOpen) {
      StatusBar.pushStackEntry({
        backgroundColor: '#1A1A1A',
        barStyle: 'light-content',
        animated: false,
      });
    }
  }, [helpChatOpen]);

  return (
    <Session
      possibleSessionId={route?.params.sessionId}
      sheetId={route?.params.sheetId}
    />
  );
};

export default SessionPage;
