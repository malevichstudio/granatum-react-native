import React, { useState } from 'react';
import {
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  View,
} from 'react-native';
import { Text } from 'native-base';
import { useFocusEffect } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { Card, CardItem, Spinner, Body } from 'native-base';

import ProjectLogoIcon from 'app/components/icons/ProjectLogoIcon';
import { selectProjects, selectPagination } from '../selectors';
import { getProjects, enterProjects } from '../actions';
import { bindToSaga } from '../../../configureStore';
import leaveProjects from '../sagas/leaveProjects';
import colors from 'app/theme/variables/colors/defaultColors';
import {
  selectOpenedByLink,
} from 'app/containers/App/selectors';
// import { title } from '../../styles/projects';

const ProjectsPage = ({ navigation }) => {
  const dispatch = useDispatch();
  const { page, totalPages } = useSelector(selectPagination);
  const openedByLink = useSelector(selectOpenedByLink);
  const [loading, setLoading] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      dispatch(enterProjects());
      dispatch(getProjects({})).then((result) => {
        if (result.totalElements === 1) {
          if (!openedByLink) {
            navigation.navigate('Project', { projectId: result.content[0].id });
          }
        }
      });

      return () => {
        const leaveProjectsGenerator = bindToSaga(leaveProjects);
        leaveProjectsGenerator();
      };
    }, []),
  );

  const projects = useSelector(selectProjects);
  const handleGoToProject = (projectId) => () => {
    navigation.navigate('Project', { projectId });
  };

  function loadMore() {
    if (totalPages && totalPages > page + 1) {
      setLoading(true);
      dispatch(
        getProjects({
          page: page + 1,
        }),
      ).then(() => setLoading(false));
    }
  }

  return (
    <View>
      <FlatList
        onEndReached={loadMore}
        onEndReachedThreshold={0.9}
        keyExtractor={(item) => item.id}
        data={projects}
        renderItem={({ item: project }) => {
          return (
            <Card key={project.id} shadow1 style={styles.card}>
              <TouchableOpacity onPress={handleGoToProject(project.id)}>
                <CardItem cardBody>
                  {project.logo ? (
                    <Image
                      source={{
                        uri: project.logo,
                      }}
                      style={styles.projectLogo}
                    />
                  ) : (
                    <ProjectLogoIcon />
                  )}
                </CardItem>
                <CardItem style={styles.cardItem}>
                  <Body>
                    <Text
                      ellipsizeMode="tail"
                      numberOfLines={1}
                      variantH6
                      style={styles.text}>
                      {project.name}
                    </Text>
                    <Text
                      ellipsizeMode="tail"
                      numberOfLines={2}
                      variantBody2
                      gray
                      style={styles.text}>
                      {project.description}
                    </Text>
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
  // title,
  card: { padding: 16, borderRadius: 8 },
  cardItem: {
    padding: 0,
  },
  projectLogo: {
    height: 64,
    width: 'auto',
    maxWidth: 64,
    flex: 1,
    marginHorizontal: 8,
    marginBottom: 12,
  },
  text: {
    marginTop: 12,
  },
});

export default ProjectsPage;
