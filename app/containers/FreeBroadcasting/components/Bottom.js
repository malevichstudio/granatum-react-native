import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import {
  SHEET_TYPE_COMMON,
  SHEET_TYPE_PERSONAL,
  SHEET_TYPE_TEAM,
} from '../../../constants';
import MeVideo from './MeVideo';
import UsersCounter from './UsersCounter';
import Message from './Message';
import messages from '../messages';

export default function Bottom({
  sheetType = null,
  isVideoChatOpen,
  isNotHearId,
}) {
  return (
    <View style={styles.bottom(isVideoChatOpen || isNotHearId ? 50 : 0)}>
      {isVideoChatOpen && <UsersCounter />}
      {isNotHearId && <Message message={messages.hostNotHear} />}
      {isVideoChatOpen && <MeVideo sheetType={sheetType} />}
    </View>
  );
}

const styles = StyleSheet.create({
  bottom: (height) => ({
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    height,
  }),
});

Bottom.propTypes = {
  sheetType: PropTypes.oneOf([
    SHEET_TYPE_COMMON,
    SHEET_TYPE_PERSONAL,
    SHEET_TYPE_TEAM,
  ]),
};
