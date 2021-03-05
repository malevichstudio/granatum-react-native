import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { View, Text } from 'native-base';
import { useRoute } from '@react-navigation/native';
import { FormattedMessage } from 'react-intl';
import { useDispatch } from 'react-redux';
import DotsVerticalIcon from 'app/components/icons/DotsVerticalIcon';
import HeaderDropDownMenu from 'app/components/HeaderDropDownMenu';
import Button from 'app/components/Button';
import colors from 'app/theme/variables/colors/defaultColors';
import { toggleHelpChat } from 'app/containers/App/actions';
import { helpButton } from 'app/styles/buttons';
import messages from '../../messages';
import LightBulbIcon from 'app/components/icons/LightBulbIcon';

const Menu = () => {
  const dispatch = useDispatch();
  const route = useRoute();
  const [showMenu, setShowMenu] = useState(false);

  const handleShowMenuToggle = () => {
    setShowMenu((prevState) => !prevState);
  };

  const handleOpenHelpChat = () => {
    handleShowMenuToggle();
    dispatch(toggleHelpChat(route));
  };

  return (
    <>
      <TouchableOpacity onPress={handleShowMenuToggle} style={styles.button}>
        <DotsVerticalIcon color={colors.textDark} />
      </TouchableOpacity>
      <HeaderDropDownMenu onRequestClose={handleShowMenuToggle} show={showMenu}>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() =>
            Linking.openURL('https://knowledge.granatum.solutions/')
          }>
          <LightBulbIcon style={styles.menuItemIcon} />
          <Text dark variantBody1>
            <FormattedMessage {...messages.knowledgeBase} />
          </Text>
        </TouchableOpacity>
        <View style={[styles.menuItem, styles.menuButtonItem]}>
          <Button
            variantPrimary
            onPress={handleOpenHelpChat}
            style={helpButton}>
            <FormattedMessage {...messages.help} />
          </Button>
        </View>
      </HeaderDropDownMenu>
    </>
  );
};

const styles = StyleSheet.create({
  underline: {
    height: 1,
    width: '100%',
    backgroundColor: colors.textLight,
    position: 'absolute',
    bottom: 0,
  },
  menuItem: {
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemIcon: {
    marginRight: 16,
  },
  button: {
    height: 48,
    width: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Menu;
