import React, { useCallback, useMemo } from 'react';
import { StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { View, Text, Content, ListItem, List } from 'native-base';
import { useDispatch, useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import { FormattedMessage } from 'react-intl';

import FormatDistance from 'app/components/dates/FormatDistance';
import FormatDate from 'app/components/dates/FormatDate';
import CalendarIcon from 'app/components/icons/CalendarIcon';
import ClockIcon from 'app/components/icons/ClockIcon';
import variables from 'app/theme/variables/defaultTheme';

import SessionIcon from '../components/SessionIcon';
import { selectActiveCourse, selectSessions } from '../selectors';
import { enterCourse, enterProject, getSessions } from '../actions';
import { bindToSaga } from '../../../configureStore';
import leaveProject from '../sagas/leaveProject';
import leaveCourse from '../sagas/leaveCourse';
import { title } from '../../../styles/projects';
import messages from '../messages';
import { isSessionAdmin } from 'app/utils/permissions';

const Course = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const sessions = useSelector(selectSessions);
  const course = useSelector(selectActiveCourse);

  useFocusEffect(
    useCallback(() => {
      dispatch(enterProject(route.params.projectId));
      return () => {
        // Приходится вызывать сагу напрямую, потому что иначе она не вызывается,
        // поскольку мы пытаемя сделать это на размонтировании родительского
        // компонента
        const leaveProjectGenerator = bindToSaga(leaveProject);
        leaveProjectGenerator(route.params.projectId);
      };
    }, [route.params.projectId]),
  );

  useFocusEffect(
    useCallback(() => {
      dispatch(enterCourse(route.params.courseId));
      dispatch(getSessions({ courseId: route.params.courseId }));
      return () => {
        if (route.params.courseId) {
          const leaveCourseGenerator = bindToSaga(leaveCourse);
          leaveCourseGenerator(route.params.courseId);
        }
      };
    }, [route.params.courseId]),
  );

  const handleGoToSession = (sessionId, startDate, role) => () => {
    if (!isSessionAdmin(role) && Date.parse(startDate) > Date.now()) {
      return;
    }
    navigation.navigate('Session', {
      sessionId,
    });
  };

  const SessionsHeader = () => {
    return (
      <View style={styles.sessionsHeader}>
        <Text variantH5>{course.name}</Text>
        <Text gray variantBody2>
          <FormattedMessage {...messages.countSessions} />:{' '}
          {course?.numberOfSessions || 0}
        </Text>
      </View>
    );
  };

  return (
    <FlatList
      stickyHeaderIndices={[0]}
      data={sessions}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={<SessionsHeader />}
      renderItem={({ item, index }) => (
        <ListItem key={item.id} style={styles.listItem}>
          <TouchableOpacity
            onPress={handleGoToSession(item.id, item?.startDate, item?.role)}
            style={styles.button}>
            <View style={styles.sessionIcon}>
              <SessionIcon
                type={item.sessionType}
                available={item.available}
                finished={item.finished}
              />
            </View>

            <View>
              <Text gray variantBody2 style={{ marginBottom: 4 }}>
                <FormattedMessage {...messages.session} /> {index + 1}
              </Text>

              <Text variantH6 ellipsizeMode="tail" numberOfLines={2}>
                {item.name}
              </Text>
              {item.startDate && item.endDate && (
                <View style={{ marginTop: 8 }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <CalendarIcon
                      style={{ color: variables.textGray, marginRight: 8 }}
                    />
                    <Text gray variantBody2>
                      <FormatDate date={item.startDate} />
                      {' - '}
                      <FormatDate date={item.endDate} />
                    </Text>
                  </View>

                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <ClockIcon
                      style={{ color: variables.textGray, marginRight: 8 }}
                    />
                    <Text gray variantBody2>
                      <FormatDistance
                        startDate={item?.startDate}
                        endDate={item?.endDate}
                      />
                    </Text>
                  </View>
                </View>
              )}
            </View>
          </TouchableOpacity>
        </ListItem>
      )}
    />
  );
};

const styles = StyleSheet.create({
  title,
  listItem: {
    marginLeft: 0,
    padding: 16,
    backgroundColor: '#fff',
  },
  button: {
    paddingLeft: 64,
    width: '100%',
  },
  sessionIcon: {
    position: 'absolute',
  },
  sessionsHeader: {
    backgroundColor: '#fff',
    padding: 16,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    justifyContent: 'center',
  },
});

export default Course;
