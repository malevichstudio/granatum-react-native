import React from 'react';
import { Button, Footer, FooterTab } from 'native-base';
import {
  useRoute,
  useNavigation,
  getFocusedRouteNameFromRoute,
} from '@react-navigation/native';

import HomeIcon from 'app/components/icons/HomeIcon';
import FolderIcon from 'app/components/icons/FolderIcon';
import UserAccountIcon from 'app/components/icons/UserAccountIcon';
import GearIcon from 'app/components/icons/GearIcon';
import variables from 'app/theme/variables/defaultTheme';

const FooterMenu = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const currentRoute = getFocusedRouteNameFromRoute(route);

  const getIconColor = (page) => {
    if (page === 'ProfilePage') {
      if (
        currentRoute === 'ProfilePassword' ||
        currentRoute === 'ProfileSocials' ||
        currentRoute === page
      ) {
        return variables.brandPrimary;
      }
    } else if (page === 'Projects') {
      if (
        currentRoute === 'Projects' ||
        currentRoute === 'Project' ||
        currentRoute === 'Course'
      ) {
        return variables.brandPrimary;
      }
    } else if (page === 'Settings') {
      if (currentRoute === 'AppSettings' || currentRoute === 'LanguagePage') {
        return variables.brandPrimary;
      }
    } else {
      if (currentRoute === page) {
        return variables.brandPrimary;
      }
    }

    return variables.textL1;
  };

  const handleGoSettings = () => {
    navigation.navigate('AppSettings');
  };

  return (
    <Footer>
      <FooterTab>
        <Button transparent onPress={() => navigation.navigate('Projects')}>
          <HomeIcon fill={getIconColor('Projects')} />
        </Button>
        <Button transparent onPress={() => navigation.navigate('Projects')}>
          <FolderIcon fill={getIconColor('Folder')} />
        </Button>
        <Button
          active
          transparent
          onPress={() => navigation.navigate('ProfilePage')}>
          <UserAccountIcon fill={getIconColor('ProfilePage')} />
        </Button>
        <Button transparent onPress={handleGoSettings}>
          <GearIcon fill={getIconColor('Settings')} />
        </Button>
      </FooterTab>
    </Footer>
  );
};

export default FooterMenu;
