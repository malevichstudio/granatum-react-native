import React, { useEffect, useState } from 'react';
import {
  View,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  ScrollView,
  Image,
  Platform,
} from 'react-native';
import { Container, Text, Spinner } from 'native-base';
import { FormattedMessage } from 'react-intl';
import { useSelector, useDispatch } from 'react-redux';
import { Backdrop } from 'react-native-backdrop';

import { injectionKeys } from '../../config';
import { useInjectSaga } from '../../utils/injectSaga';
import saga from './sagas';
import { DAEMON } from '../../utils/constants';
import messages from './messages';
import { selectCourse } from './selectors';
import reducer from './reducers';
import { useInjectReducer } from '../../utils/injectReducer';
import { selectOpenedByLink } from 'app/containers/App/selectors';
import { getAuthToken } from 'app/utils/storage';
import { getCourse, getCourseAccess } from './actions';
import { cardPlaceholder } from 'app/components/images';
import Button from 'app/components/Button';
import CalendarIcon from 'app/components/icons/CalendarIcon';
import FormatDate from 'app/components/dates/FormatDate';
import ArrowBackIcon from 'app/components/icons/ArrowBackIcon';
import { setOpenedByLink } from 'app/containers/App/actions';

const SignUpCoursePage = ({ navigation }) => {
  useInjectSaga({ key: injectionKeys.registerCourse, saga, mode: DAEMON });
  useInjectReducer({ key: injectionKeys.registerCourse, reducer });

  const dispatch = useDispatch();
  const openedByLink = useSelector(selectOpenedByLink);
  const course = useSelector(selectCourse);

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    (async function () {
      if (openedByLink?.courseToken) {
        const accessToken = await getAuthToken();

        if (typeof accessToken === 'string') {
          dispatch(getCourseAccess({ token: courseToken }));
        } else {
          dispatch(
            getCourse({
              courseId: openedByLink?.courseId,
              sessionId: openedByLink?.sessionId,
            }),
          );
        }
      }
    })();
  }, []);

  if (!course.id) {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <Spinner color="blue" />
      </View>
    );
  }

  const handleOpen = () => {
    setVisible(true);
  };

  const handleClose = () => {
    setVisible(false);
  };

  function goBack() {
    navigation.goBack();
    dispatch(setOpenedByLink(null));
  }

  function getHeight(percent) {
    return Number((Dimensions.get('window').height * percent).toFixed(0));
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.top(Platform.OS)}>
        <TouchableOpacity onPress={goBack} style={styles.back}>
          <ArrowBackIcon
            fill={visible ? '#000' : '#fff'}
            width={35}
            height={35}
          />
        </TouchableOpacity>
      </View>
      <Container>
        <Image
          style={styles.image(getHeight(0.56))}
          source={
            course?.registrationCover
              ? {
                  uri: course?.registrationCover,
                }
              : cardPlaceholder
          }
        />
        <Backdrop
          visible={visible}
          handleOpen={handleOpen}
          handleClose={handleClose}
          swipeConfig={{
            velocityThreshold: 0.3,
            directionalOffsetThreshold: 80,
          }}
          animationConfig={{
            speed: 14,
            bounciness: 4,
          }}
          overlayColor="rgba(0,0,0,0.32)"
          containerStyle={styles.container(getHeight(0.46))}
          closedHeight={getHeight(0.46) - 1}>
          <View>
            <View style={styles.header}>
              <View style={styles.headerLine} />
            </View>
            <ScrollView>
              <View style={styles.content}>
                <Text variantH6 style={styles.name}>
                  {course?.name}
                </Text>
                {course.startDate && course.endDate ? (
                  <View style={styles.date}>
                    <CalendarIcon style={styles.dateIcon} />
                    <Text style={styles.dateText} variantBody2>
                      <FormatDate date={course.startDate} />
                      {' - '}
                      <FormatDate date={course.endDate} />
                    </Text>
                  </View>
                ) : null}
                <Text variantBody1>{course?.registrationDescription}</Text>
              </View>
            </ScrollView>
          </View>
        </Backdrop>
      </Container>
      <View style={styles.bottom}>
        <Button
          large
          fullWidth
          variantPrimary
          onPress={() => navigation.push('SignUpSocialPage')}>
          <Text button light>
            <FormattedMessage {...messages.goToProject} />
          </Text>
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  top: (os) => ({
    position: 'absolute',
    zIndex: 99999999,
    top: os === 'ios' ? 60 : 30,
    left: 0,
    right: 0,
    width: '100%',
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
  }),
  bottom: {
    position: 'absolute',
    zIndex: 99999999,
    bottom: 0,
    right: 0,
    left: 0,
    width: '100%',
    backgroundColor: '#fff',
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  image: (height) => ({
    width: '100%',
    height: height || 260,
    resizeMode: 'cover',
  }),
  container: (height) => ({
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    backgroundColor: '#fff',
    minHeight: height || 200,
  }),
  header: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  headerLine: {
    width: 30,
    height: 4,
    backgroundColor: '#D3D4DD',
    borderRadius: 3,
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 15,
    paddingBottom: 80,
  },
  name: {
    marginBottom: 16,
  },
  date: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  dateText: {
    fontSize: 15,
  },
  dateIcon: {
    marginRight: 8,
    color: '#000',
    position: 'relative',
    top: -2,
  },
});

export default SignUpCoursePage;
