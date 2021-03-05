import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { Button as ButtonNB, Text, View } from 'native-base';
import { FormattedMessage } from 'react-intl';
import { useRoute } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import DotsVerticalIcon from 'app/components/icons/DotsVerticalIcon';
import TurnCameraIcon from 'app/components/icons/TurnCameraIcon';
import LightBulbIcon from 'app/components/icons/LightBulbIcon';
import Button from 'app/components/Button';
import HeaderDropDownMenu from 'app/components/HeaderDropDownMenu';
import colors from 'app/theme/variables/colors/defaultColors';
import { toggleHelpChat } from 'app/containers/App/actions';
import { helpButton } from 'app/styles/buttons';
import { withRoomContext } from '../../RoomContext';
import messages from '../../messages';
import { selectProducers, selectWebcamInProgress } from '../../selectors';
import { addNotification } from '../../../App/actions';

const Menu = ({ roomClient, isChat }) => {
  const [showMenu, setShowMenu] = useState(false);
  const dispatch = useDispatch();
  const route = useRoute();
  const webcamInProgress = useSelector(selectWebcamInProgress);
  const producers = useSelector(selectProducers);
  const producersArray = Object.values(producers);
  const videoProducer = producersArray.find(
    (producer) => producer.track.kind === 'video' && producer.type !== 'share',
  );

  const handleShowMenuToggle = () => {
    setShowMenu((prevState) => !prevState);
  };

  const changeWebCam = () => {
    if (!webcamInProgress && videoProducer) {
      roomClient?.changeWebcam();
    } else {
      dispatch(
        addNotification({
          message: messages.turnCameraFirst,
          type: 'warning',
        }),
      );
    }
    handleShowMenuToggle();
  };

  const handleOpenHelpChat = () => {
    handleShowMenuToggle();
    dispatch(toggleHelpChat(route));
  };

  return (
    <>
      <ButtonNB transparent onPress={handleShowMenuToggle}>
        <DotsVerticalIcon color={isChat ? '#000' : colors.white} />
      </ButtonNB>
      <HeaderDropDownMenu onRequestClose={handleShowMenuToggle} show={showMenu}>
        <TouchableOpacity style={styles.menuItem} onPress={changeWebCam}>
          <TurnCameraIcon
            fill={
              !(!webcamInProgress && videoProducer)
                ? colors.textLight
                : colors.textDark
            }
            style={styles.menuItemIcon}
          />
          <Text
            style={{
              color: !(!webcamInProgress && videoProducer)
                ? colors.textLight
                : colors.textDark,
            }}
            variantBody1>
            <FormattedMessage {...messages.turnCamera} />
          </Text>
          <View style={styles.underline} />
        </TouchableOpacity>
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
  menuButtonItem: {
    paddingTop: 0,
  },
  menuItemIcon: {
    marginRight: 12,
  },
});

export default withRoomContext(Menu);
