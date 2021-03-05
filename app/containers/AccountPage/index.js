import React from 'react';
// import { StyleSheet } from 'react-native';
import { Container } from 'native-base';
import { createStackNavigator } from '@react-navigation/stack';
import Projects from './Projects/Loadable';
import Project from './Project/Loadable';
import Course from './Course/Loadable';
import Header from './components/Header';
import Footer from './components/Footer';
import { useInjectSaga } from '../../utils/injectSaga';
import { useInjectReducer } from '../../utils/injectReducer';
import { injectionKeys } from '../../config';
import saga from './sagas';
import reducer from './reducers';
import { DAEMON } from '../../utils/constants';
import AppSettingsPage from '../AppSettingsPage/Loadable';
import LanguagePage from '../AppSettingsPage/LanguagePage';
import ProfilePage from 'app/containers/ProfilePage/Loadable';
import ProfileInfo from 'app/containers/ProfilePage/components/ProfileInfo';
import ProfilePassword from 'app/containers/ProfilePage/components/ProfilePassword';
import ProfileSocials from 'app/containers/ProfilePage/components/ProfileSocials';

const Drawer = createStackNavigator();

const ProjectsRoot = () => {
  useInjectSaga({ key: injectionKeys.projects, saga, mode: DAEMON });
  useInjectReducer({
    key: injectionKeys.projects,
    reducer,
  });

  return (
    <Container>
      <Header />
      <Drawer.Navigator
        headerMode={'none'}
        screenOptions={{ gestureEnabled: false }}>
        <Drawer.Screen name="Projects" component={Projects} />
        <Drawer.Screen name="Project" component={Project} />
        <Drawer.Screen name="Course" component={Course} />
        <Drawer.Screen name="ProfilePage" component={ProfilePage} />
        <Drawer.Screen name="ProfileInfo" component={ProfileInfo} />
        <Drawer.Screen name="ProfilePassword" component={ProfilePassword} />
        <Drawer.Screen name="ProfileSocials" component={ProfileSocials} />
        <Drawer.Screen name="AppSettings" component={AppSettingsPage} />
        <Drawer.Screen name="LanguagePage" component={LanguagePage} />
      </Drawer.Navigator>
      <Footer />
    </Container>
  );
};

// const styles = StyleSheet.create({});

export default ProjectsRoot;
