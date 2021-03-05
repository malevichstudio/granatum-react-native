import React, { useCallback } from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import {
  useFocusEffect,
  useNavigation,
  useRoute,
  getFocusedRouteNameFromRoute,
} from '@react-navigation/native';
import { Header, Left, Button, Body, Text, Right } from 'native-base';

import ChevronLeftIcon from 'app/components/icons/ChevronLeftIcon';
import variables from 'app/theme/variables/defaultTheme';
import Menu from './Menu';
import messages from '../../messages';
import { selectProjectsRoot } from '../../selectors';

const AccountHeader = ({}) => {
  const intl = useIntl();
  const route = useRoute();
  const projects = useSelector(selectProjectsRoot);
  const currentRoute = getFocusedRouteNameFromRoute(route);

  useFocusEffect(
    useCallback(() => {
      StatusBar.pushStackEntry({
        backgroundColor: '#fff',
        barStyle: 'dark-content',
        animated: false,
      });
    }, []),
  );

  const getTitle = () => {
    switch (currentRoute) {
      case 'Projects': {
        return intl.formatMessage(messages.projectsTitle);
      }
      case 'Project': {
        return intl.formatMessage(messages.myCourses);
      }
      case 'Course': {
        return intl.formatMessage(messages.mySessions);
      }
      case 'AppSettings': {
        return intl.formatMessage(messages.settings);
      }
      case 'LanguagePage': {
        return intl.formatMessage(messages.language);
      }
      case 'ProfilePage': {
        return intl.formatMessage(messages.profile);
      }
      case 'ProfileInfo': {
        return intl.formatMessage(messages.generalInfo);
      }
      case 'ProfilePassword': {
        return intl.formatMessage(messages.changePassword);
      }
      case 'ProfileSocials': {
        return intl.formatMessage(messages.linkedAccounts);
      }
      default:
        return intl.formatMessage(messages.projectsTitle);
    }
  };
  const navigation = useNavigation();
  const handleBack = () => {
    navigation.goBack();
  };

  if (currentRoute === 'ProfilePage') {
    return null;
  }

  function isRenderBackButton() {
    if (currentRoute) {
      if (currentRoute === 'Projects') return false;
      if (currentRoute === 'Project') {
        return projects?.projects?.length > 1;
      }
      return true;
    }
  }

  return (
    <Header>
      <Left style={{ flex: 1 }}>
        {isRenderBackButton() && (
          <Button transparent onPress={handleBack}>
            <ChevronLeftIcon color={variables.textDark} />
          </Button>
        )}
      </Left>

      <Body style={{ flex: 3 }}>
        <Text variantSubtitle1 semiBold style={styles.title}>
          {getTitle()}
        </Text>
      </Body>
      <Right style={{ flex: 1 }}>
        <Menu />
      </Right>
    </Header>
  );
};

export default AccountHeader;

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    width: '100%',
  },
  hidden: { display: 'none' },
});
