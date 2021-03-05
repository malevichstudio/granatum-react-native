import React from 'react';
import { StyleSheet } from 'react-native';
import { View, Button, Text, Right, Left, Header } from 'native-base';
import { FormattedMessage } from 'react-intl';
import { useSelector } from 'react-redux';

import ArrowBackIcon from 'app/components/icons/ArrowBackIcon';
import {
  selectCourseId,
  selectProjectId,
} from 'app/containers/SessionPage/selectors';
import { navigate } from 'app/utils/RootNavigation';
import messages from '../messages';
import Timer from 'app/components/Timer';
import Menu from '../../AccountPage/components/Header/Menu';

const SessionStartTimer = ({ timeToStart }) => {
  const projectId = useSelector(selectProjectId);
  const courseId = useSelector(selectCourseId);

  const handleBack = () => {
    navigate('Course', {
      projectId,
      courseId,
    });
  };

  return (
    <>
      <Header>
        <Left>
          <Button transparent onPress={handleBack}>
            <ArrowBackIcon color="#000" width={24} height={24} />
          </Button>
        </Left>
        <Right style={{ flex: 1 }}>
          <Menu />
        </Right>
      </Header>

      <View style={styles.content}>
        <View style={styles.container}>
          <Text variantSubtitle2 alignCenter>
            <FormattedMessage {...messages.sessionWillStart} />:
          </Text>
          <Timer seconds={timeToStart}>
            {(days, hours, minutes, seconds) => (
              <View style={styles.wrapper}>
                <View style={styles.item}>
                  <Text variantH5 style={styles.number}>
                    {days}
                  </Text>
                  <Text variantCaption gray>
                    <FormattedMessage {...messages.days} />
                  </Text>
                </View>
                <View style={styles.item}>
                  <Text variantH5 style={styles.number}>
                    {hours}
                  </Text>
                  <Text variantH5 style={styles.colon}>
                    :
                  </Text>
                  <Text variantCaption gray>
                    <FormattedMessage {...messages.hours} />
                  </Text>
                </View>
                <View style={styles.item}>
                  <Text variantH5 style={styles.number}>
                    {minutes}
                  </Text>
                  <Text variantH5 style={styles.colon}>
                    :
                  </Text>
                  <Text variantCaption gray>
                    <FormattedMessage {...messages.minutes} />
                  </Text>
                </View>
                <View style={styles.item}>
                  <Text variantH5 style={styles.number}>
                    {seconds}
                  </Text>
                  <Text variantCaption gray>
                    <FormattedMessage {...messages.seconds} />
                  </Text>
                </View>
              </View>
            )}
          </Timer>
        </View>
      </View>
    </>
  );
};

export default SessionStartTimer;

const styles = StyleSheet.create({
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    backgroundColor: '#fff',
    paddingVertical: 16,
    paddingHorizontal: 8,
    borderRadius: 12,
    alignSelf: 'center',
  },
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    width: 52,
    paddingVertical: 4,
    marginHorizontal: 8,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  colon: { position: 'absolute', right: -12, top: 16 },
  number: { lineHeight: 46 },
});
