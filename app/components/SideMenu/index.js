import React from 'react';
import { Button, Text } from 'native-base';
import { View, StyleSheet } from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { useDispatch, useSelector } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { signOut } from '../../containers/App/actions';
import Hat from '../../components/icons/Hat';
import Avatar from '../../components/Avatar';
import { selectUser } from '../../containers/App/selectors';
import messages from './messages';

const SideMenu = (props) => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const handleLogOut = () => {
    dispatch(signOut());
  };
  const handleGoProjects = () => {
    props.navigation.navigate('Projects');
  };
  return (
    <DrawerContentScrollView style={styles.menuWrap} {...props}>
      <View style={styles.avatarWrap}>
        <Avatar src={user.avatar} />
        <View style={styles.userName}>
          <Text style={styles.userNameText}>{user.name}</Text>
        </View>
        <View>
          <Text style={styles.userEmail}>{user.email}</Text>
        </View>
      </View>
      <Button style={styles.menuButton} transparent onPress={handleGoProjects}>
        <Hat />
        <Text style={styles.menuItem}>
          <FormattedMessage {...messages.projectsTitle} />
        </Text>
      </Button>
      <Button style={styles.menuButton} transparent onPress={handleLogOut}>
        <Hat />
        <Text style={styles.menuItem}>
          <FormattedMessage {...messages.accountLogout} />
        </Text>
      </Button>
    </DrawerContentScrollView>
  );
};

export default SideMenu;

const styles = StyleSheet.create({
  menuItem: {
    fontSize: 14,
    fontWeight: '600',
    color: '#383A48',
  },
  menuButton: {
    marginBottom: 8,
  },
  userNameText: {
    fontSize: 17,
    fontWeight: '800',
    color: '#383A48',
  },
  userName: {
    marginBottom: 3,
    marginTop: 10,
  },
  userEmail: {
    fontSize: 14,
    fontWeight: '400',
    color: '#777988',
  },
  avatarWrap: {
    marginBottom: 30,
  },
  menuWrap: {
    paddingVertical: 10,
    paddingHorizontal: 30,
  },
});
