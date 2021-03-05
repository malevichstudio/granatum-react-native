import React, { useState, useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import { View, Text } from 'native-base';

import messages from './messages';

function Timer({ minSecOnly, seconds, onFinish = null, children = null }) {
  const [time, setTime] = useState(seconds);
  const [hours, setHours] = useState(null);
  const [minutes, setMinutes] = useState(null);
  const [days, setDays] = useState(null);
  const [timerSeconds, setTimerSeconds] = useState(null);

  useEffect(() => {
    setTime(seconds);
  }, [seconds]);

  useEffect(() => {
    setTimer();
  }, []);

  useEffect(() => {
    let didCancel;
    let timer;
    if (time > 0) {
      timer = setTimeout(() => {
        // Если компонент уже размонтирован, ничего не делаем
        if (!didCancel) {
          setTimer();
        }
      }, 1000);
    } else if (onFinish) {
      onFinish();
    }

    return () => {
      didCancel = true;
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [time]);

  function setTimer() {
    const newTime = time - 1;
    setTime(newTime);
    const s = Math.floor(newTime % 60);
    const m = Math.floor((newTime / 60) % 60);
    const h = Math.floor((newTime / (60 * 60)) % 24);
    const d = Math.floor(newTime / (60 * 60 * 24));

    setTimerSeconds(s < 10 ? `0${s}` : s);
    setMinutes(m < 10 ? `0${m}` : m);
    setHours(h < 10 ? `0${h}` : h);
    setDays(d);
  }

  if (children) {
    return children(days, hours, minutes, timerSeconds);
  }

  return (
    <>
      {!minSecOnly ? (
        <View>
          <Text>{hours !== '00' && `${hours}:`}</Text>
          <Text>
            {minutes}:{timerSeconds}
          </Text>
        </View>
      ) : (
        <View>
          <Text>
            {minutes} <FormattedMessage {...messages.minutes} /> {timerSeconds}{' '}
          </Text>
          <Text>
            <FormattedMessage {...messages.seconds} />!
          </Text>
        </View>
      )}
    </>
  );
}

export default Timer;
