import React, { useState } from 'react';
import { Image, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Text, Card, CardItem, Body, View, Spinner } from 'native-base';
import { useDispatch, useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import { FormattedMessage } from 'react-intl';

import variables from 'app/theme/variables/defaultTheme';
import { cardPlaceholder } from 'app/components/images';
import FormatDate from 'app/components/dates/FormatDate';
import { selectCourses, selectPagination } from '../selectors';
import { enterProject, getCourses } from '../actions';
import { bindToSaga } from '../../../configureStore';
import leaveProject from '../sagas/leaveProject';
import { title } from '../../../styles/projects';
import messages from '../messages';
import colors from 'app/theme/variables/colors/defaultColors';
import ArrowDownIcon from 'app/components/icons/ArrowDownIcon';

const Project = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const courses = useSelector(selectCourses);
  const { page, totalPages } = useSelector(selectPagination);
  const [loading, setLoading] = useState(false);
  const [showAllDesc, setShowAllDesc] = useState(null);

  useFocusEffect(
    React.useCallback(() => {
      dispatch(enterProject(route.params.projectId));
      dispatch(getCourses({ id: route.params.projectId, filters: {} }));
      return () => {
        // Приходится вызывать сагу напрямую, потому что иначе она не вызывается,
        // поскольку мы пытаемя сделать это на размонтировании родительского
        // компонента
        const leaveProjectGenerator = bindToSaga(leaveProject);
        leaveProjectGenerator(route.params.projectId);
      };
    }, [route.params.projectId]),
  );

  const handleGoToCourse = (courseId) => () => {
    navigation.navigate('Course', {
      courseId,
      projectId: route.params.projectId,
    });
  };

  function loadMore() {
    if (totalPages && totalPages > page + 1) {
      setLoading(true);
      dispatch(
        getCourses({
          id: route.params.projectId,
          page: page + 1,
        }),
      ).then(() => setLoading(false));
    }
  }

  const handleShowMoreDesc = (id) => () => {
    setShowAllDesc(!showAllDesc || showAllDesc !== id ? id : null);
  };

  return (
    <View>
      <FlatList
        onEndReached={loadMore}
        onEndReachedThreshold={0.9}
        keyExtractor={(item) => item.id}
        data={courses}
        renderItem={({ item: course }) => {
          return (
            <Card key={course.id} shadow1 style={styles.card}>
              <TouchableOpacity onPress={handleGoToCourse(course.id)}>
                <CardItem cardBody style={styles.cardItemImage}>
                  <View
                    style={[
                      styles.cardLabel,
                      {
                        backgroundColor:
                          course.status === 'PUBLISHED'
                            ? variables.success
                            : variables.textGray,
                      },
                    ]}>
                    <Text variantCaption2 uppercase statusLabel>
                      {course.status}
                    </Text>
                  </View>
                  <Image
                    source={
                      course.mainCover
                        ? {
                            uri: course.mainCover,
                          }
                        : cardPlaceholder
                    }
                    style={{ height: 200, width: null, flex: 1 }}
                  />
                </CardItem>

                <CardItem
                  style={styles.cardItemText(showAllDesc === course.id)}>
                  <Body>
                    <Text ellipsizeMode="tail" numberOfLines={1} variantH6>
                      {course.name}
                    </Text>
                    <Text
                      ellipsizeMode="tail"
                      numberOfLines={showAllDesc === course.id ? null : 2}
                      variantBody2
                      gray
                      style={[
                        styles.textMargins,
                        styles.description(showAllDesc === course.id),
                      ]}>
                      {course.mainDescription}
                    </Text>

                    <View style={[styles.textMargins, styles.bottomTextRow]}>
                      <Text variantBody2 gray style={styles.numberOfSessions}>
                        <FormattedMessage {...messages.numberOfSessions} />:{' '}
                        {course.numberOfSessions ? course.numberOfSessions : 0}
                      </Text>

                      {course.startDate && course.endDate && (
                        <View style={styles.dates}>
                          <Text variantBody2 alignRight gray>
                            <FormatDate
                              date={course.startDate}
                              format="dd.MM.yyyy"
                            />
                            {' - '}
                            <FormatDate
                              date={course.endDate}
                              format="dd.MM.yyyy"
                            />
                          </Text>
                        </View>
                      )}
                      {course.mainDescription ? (
                        <TouchableOpacity
                          style={styles.showMoreDescButton(
                            showAllDesc === course.id,
                          )}
                          onPress={handleShowMoreDesc(course.id)}>
                          <ArrowDownIcon color="#000" />
                        </TouchableOpacity>
                      ) : null}
                    </View>
                  </Body>
                </CardItem>
              </TouchableOpacity>
            </Card>
          );
        }}
        contentContainerStyle={{
          paddingHorizontal: 10,
          paddingVertical: 5,
        }}
      />
      {loading ? (
        <Spinner style={styles.spinner} color={colors?.primary} />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  spinner: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    height: 40,
  },
  title,
  card: { borderRadius: 8, position: 'relative' },
  cardItemImage: {
    padding: 0,
    zIndex: 0,
    overflow: 'hidden',
    borderBottomEndRadius: 0,
    borderBottomStartRadius: 0,
  },
  cardItemText: (showAllDesc) => ({
    height: showAllDesc ? 'auto' : 144,
    paddingHorizontal: 24,
    paddingVertical: 16,
  }),
  cardLabel: {
    position: 'absolute',
    top: 16,
    left: 16,
    backgroundColor: 'red',
    zIndex: 9,
    borderRadius: 3,
    paddingHorizontal: 8,
  },
  draftLabel: {},
  publishedLabel: {},
  description: (showAllDesc) => ({
    height: showAllDesc ? 'auto' : 40,
  }),
  showMoreDescButton: (showAllDesc) => ({
    marginLeft: 10,
    position: 'relative',
    top: -2,
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    transform: [{ rotate: showAllDesc ? '180deg' : '0deg' }],
  }),
  textMargins: {
    marginTop: 12,
  },
  bottomTextRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  numberOfSessions: {
    flexBasis: '40%',
  },
  dates: {
    flex: 1,
  },
});

export default Project;
