import React, { useEffect, useState } from 'react';
import { call, select } from 'redux-saga/effects';
import { Linking } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { Content, Spinner } from 'native-base';
import { createStackNavigator } from '@react-navigation/stack';

import colors from 'app/theme/variables/colors/defaultColors';
import loadUserData from './containers/App/sagas/loadUserData';
import {
  selectUserId,
  selectIsQuest,
  selectOpenedByLink,
} from './containers/App/selectors';
import { bindToSaga } from './configureStore';
import { navigationRef, navigate } from './utils/RootNavigation';
import {
  setOpenedByLink,
  setIsQuest,
  getCourseAccess,
} from './containers/App/actions';

import ProjectsRoot from './containers/AccountPage/Loadable';
import SessionPage from './containers/SessionPage/Loadable';
import SignInPage from './containers/SignInPage/Loadable';
import SignUpSocialPage from './containers/SignUpSocialPage/Loadable';
import SignUpPage from './containers/SignUpPage/Loadable';
import SignUpSuccessPage from './containers/SignUpSuccessPage/Loadable';
import SignUpConfirmPage from './containers/SignUpConfirmPage/Loadable';
import SignUpCoursePage from './containers/SignUpCoursePage/Loadable';
import SignUpGuestPage from './containers/SignUpGuestPage/Loadable';
import RecoveryPage from './containers/RecoveryPage/Loadable';
import RecoverySuccessPage from './containers/RecoverySuccessPage/Loadable';
import RestorePage from './containers/RestorePage/Loadable';
import SignUpFinishingPage from './containers/SignUpFinishingPage';
import EmailConfirmPage from './containers/EmailConfirmPage';

const Drawer = createStackNavigator();

export default function Routes() {
  const dispatch = useDispatch();
  const userId = useSelector(selectUserId);
  const openedByLink = useSelector(selectOpenedByLink);
  const isQuest = useSelector(selectIsQuest);

  const [granted, setGranted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isMount, setIsMount] = useState(false);
  const [navigationIsReady, setNavigationIsReady] = useState(false);

  useEffect(() => {
    if (navigationIsReady && openedByLink) {
      if (granted) {
        if (openedByLink?.confirmToken) {
          navigate('EmailConfirmPage', { ...openedByLink });
        } else if (openedByLink?.projects && openedByLink?.course) {
          navigate('Course', {
            projectId: openedByLink?.projects,
            courseId: openedByLink?.course,
          });
        } else if (openedByLink?.projects) {
          navigate('Project', {
            projectId: openedByLink?.projects,
          });
        } else if (openedByLink?.session) {
          navigate('Session', {
            sessionId: openedByLink?.session,
            sheetId: openedByLink?.sheet,
          });
        } else if (openedByLink?.courseToken) {
          dispatch(
            getCourseAccess({
              token: openedByLink?.courseToken,
              ...openedByLink,
            }),
          );
        }
        if (!openedByLink?.courseToken) {
          dispatch(setOpenedByLink(null));
        }
      } else if (openedByLink?.confirmToken) {
        navigate('SignUpConfirmPage');
      } else if (openedByLink?.courseToken) {
        navigate('SignUpCoursePage');
      } else if (isQuest) {
        dispatch(setIsQuest(false));
        navigate('SignUpGuestPage');
      } else if (openedByLink?.restoreToken) {
        navigate('RestorePage', {
          token: openedByLink?.restoreToken,
        });
        dispatch(setOpenedByLink(null));
      }
    }
  }, [openedByLink, navigationIsReady, granted, userId, isQuest]);

  useEffect(() => {
    Linking.addEventListener('url', handleUrl);
    Linking.getInitialURL().then((url) => {
      if (url) {
        dispatch(setOpenedByLink(url));
      }
      setIsMount(true);
    });
    return () => Linking.removeEventListener('url', handleUrl);
  }, []);

  useEffect(() => {
    /*
      Добавляем зависимость от **isMount** что бы загрузка пользователя
      была уже с учетом открытой ссылки (например инвайт в открытый проект)
    */
    if (isMount) {
      let didCancel = false;

      // we call saga right here, because we need to wait till it will download
      // fresh user data and only after that update `granted` state
      function* loadData() {
        // when user already logged in, skip data fetching
        const isLoggedInBefore = yield select((state) => state.user.id);

        // Добавляем также проверку - !openedByLink - елси открыто по ссылке
        // то нужно еще раз запросить данные пользователя, так как
        // ссылка может быть на открытый проект и нужно получить к нему доступ
        if (isLoggedInBefore && !didCancel && !openedByLink) {
          return setGranted(!!isLoggedInBefore);
        }
        setLoading(true);
        setNavigationIsReady(false);
        yield call(loadUserData);
        setLoading(false);
        const isLoggedIn = yield select((state) => state.user.id);

        if (!didCancel) {
          setGranted(!!isLoggedIn);
        }

        return null;
      }

      const loadDataGenerator = bindToSaga(loadData);

      loadDataGenerator();

      return () => {
        // отменяем изменение стейта на unmount
        didCancel = true;
      };
    }
  }, [userId, isMount]);

  function handleUrl(url) {
    /*
      Если приложение было уже открыто и был переход по ссылке
      мы размонтируем компонент isMount = false - подгружаем данные пользователя и
      делаем ререндер компонента что бы навигация снова отрендерилась.
      Также делаем состояние навигации не активным для того что бы небыло переходов
      на экраны когда навигация еще не отрендерилась
    */
    setIsMount(false);
    setNavigationIsReady(false);
    dispatch(setOpenedByLink(url?.url));

    setIsMount(true);
  }

  if (loading || !isMount) {
    return (
      <Content padder>
        <Spinner color={colors.primary} />
      </Content>
    );
  }

  const linking = {
    prefixes: ['https://testing.granatum.solutions/'],
  };

  return (
    <NavigationContainer
      ref={navigationRef}
      linking={linking}
      onReady={() => setNavigationIsReady(true)}>
      <Drawer.Navigator headerMode="none">
        {granted ? (
          <>
            <Drawer.Screen name="ProjectsRoot" component={ProjectsRoot} />
            <Drawer.Screen
              name="Session"
              component={SessionPage}
              options={{
                gestureEnabled: false,
              }}
            />
            <Drawer.Screen
              name="EmailConfirmPage"
              component={EmailConfirmPage}
            />
          </>
        ) : (
          <>
            <Drawer.Screen name="SignInPage" component={SignInPage} />
            <Drawer.Screen
              name="SignUpSocialPage"
              component={SignUpSocialPage}
            />
            <Drawer.Screen name="SignUpPage" component={SignUpPage} />
            <Drawer.Screen
              name="SignUpSuccessPage"
              component={SignUpSuccessPage}
            />
            <Drawer.Screen
              name="SignUpConfirmPage"
              component={SignUpConfirmPage}
            />
            <Drawer.Screen
              name="SignUpCoursePage"
              component={SignUpCoursePage}
            />
            <Drawer.Screen name="SignUpGuestPage" component={SignUpGuestPage} />
            <Drawer.Screen name="RecoveryPage" component={RecoveryPage} />
            <Drawer.Screen
              name="RecoverySuccessPage"
              component={RecoverySuccessPage}
            />
            <Drawer.Screen name="RestorePage" component={RestorePage} />
            <Drawer.Screen
              name="SignUpFinishingPage"
              component={SignUpFinishingPage}
            />
          </>
        )}
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
