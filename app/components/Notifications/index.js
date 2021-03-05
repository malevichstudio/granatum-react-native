import React, { useState, useEffect } from 'react';
import { StyleSheet, Platform, TouchableOpacity } from 'react-native';
import { View, Text } from 'native-base';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import * as Animatable from 'react-native-animatable';
import BackgroundTimer from 'react-native-background-timer';

import { selectNotifications } from 'app/containers/App/selectors';
import { removeNotification } from 'app/containers/App/actions';
import { selectSessionId } from 'app/containers/SessionPage/selectors';
import CloseIcon from 'app/components/icons/CloseIcon';
import Button from 'app/components/Button';

const Notifications = () => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const notifications = useSelector(selectNotifications);
  const sessionId = useSelector(selectSessionId);
  const [listening, setListening] = useState([]);

  function handleClose(id) {
    dispatch(removeNotification(id));
  }

  useEffect(() => {
    if (!sessionId) {
      listening?.forEach((item) => {
        if (item?.type === 'widget') {
          handleClose(item?.id);
        }
      });
    }
  }, [sessionId]);

  useEffect(() => {
    notifications?.forEach((item) => {
      const index = listening?.findIndex((el) => el?.id === item?.id);

      if (index === -1) {
        setListening((prev) => [...prev, { id: item?.id, type: item?.type }]);

        if (Platform.OS === 'ios') {
          BackgroundTimer.start();
        }
        BackgroundTimer.setTimeout(() => {
          handleClose(item?.id);
          setListening((prev) => prev?.filter((el) => el?.id !== item?.id));
        }, item?.duration || 3000);
        if (Platform.OS === 'ios') {
          BackgroundTimer.stop();
        }
      }
    });
  }, [notifications?.length]);

  if (notifications?.length === 0) return null;

  function getButtonColor(type) {
    if (type === 'error') return '#7C2B32';
    if (type === 'info') return '#2D4E83';
    if (type === 'success') return '#2D6642';
    if (type === 'warning') return '#7F6121';
    if (type === 'dark') return '#3F3F3F';
    if (type === 'widget') return '#2E303D';
    return '#2D4E83';
  }

  const notification = notifications[0];
  const isWidget = notification?.type === 'widget';
  const isDark = notification?.type === 'dark' || isWidget;

  function renderButton() {
    return (
      <View>
        <Button
          full
          transparent={isDark}
          small={isDark}
          style={styles.button(getButtonColor(notification?.type), isDark)}
          onPress={() => {
            notification?.onButtonClick && notification?.onButtonClick();
            handleClose(notification?.id);
          }}>
          <Text black style={styles.buttonText(isDark)}>
            {notification?.buttonText}
          </Text>
        </Button>
      </View>
    );
  }

  return (
    <View style={styles.wrapper}>
      <Animatable.View animation="slideInUp" duration={300}>
        <View style={[styles.item, styles[notification?.type || 'info']]}>
          <View style={styles.inner(isWidget)}>
            <Text style={styles.text(notification?.type)}>
              {intl.formatMessage(notification?.message, {
                ...notification?.message.values,
              })}
            </Text>
            {isWidget ? <>{renderButton()}</> : null}
            {!notification?.buttonText && !isWidget ? (
              <TouchableOpacity
                style={styles.close}
                onPress={() => handleClose(notification?.id)}>
                <CloseIcon
                  color={notification?.type === 'warning' ? '#000' : '#fff'}
                />
              </TouchableOpacity>
            ) : null}
          </View>
          {notification?.buttonText && !isWidget ? <>{renderButton()}</> : null}
        </View>
      </Animatable.View>
    </View>
  );
};

export default Notifications;

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    zIndex: 99999999,
    bottom: 0,
    left: 0,
    right: 0,
    width: '100%',
    paddingBottom: 20,
    paddingLeft: 8,
    paddingRight: 8,
  },
  item: {
    padding: 16,
    borderRadius: 8,
  },
  info: {
    backgroundColor: '#3294E6',
  },
  success: {
    backgroundColor: '#56C969',
  },
  error: {
    backgroundColor: '#F6473B',
  },
  warning: {
    backgroundColor: '#FBBF0B',
  },
  dark: {
    backgroundColor: '#3F3F3F',
  },
  widget: {
    backgroundColor: '#2E303D',
  },
  inner: (isWidget) => ({
    flexDirection: 'row',
    alignItems: isWidget ? 'center' : 'flex-start',
  }),
  text: (type) => ({
    marginRight: 'auto',
    color: type === 'warning' ? '#000' : '#fff',
    fontSize: 15,
    lineHeight: 20,
    flex: 1,
  }),
  close: {
    marginLeft: 10,
    marginTop: 2,
  },
  button: (color, isDark) => ({
    marginTop: isDark ? 0 : 16,
    backgroundColor: color,
  }),
  buttonText: (isDark) => ({
    fontSize: 15,
    color: isDark ? '#559CEE' : '#fff',
  }),
});
