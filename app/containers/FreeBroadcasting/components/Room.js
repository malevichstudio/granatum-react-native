import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import { Spinner } from 'native-base';
import colors from 'app/theme/variables/colors/defaultColors';
import {
  SHEET_TYPE_COMMON,
  SHEET_TYPE_PERSONAL,
  SHEET_TYPE_TEAM,
} from '../../../constants';
import PeersWrapper from './PeersWrapper';
import Header from './Header';
import Bottom from './Bottom';

export default function Room({
  sheetType = null,
  isVideoChatOpen,
  isNotHearId,
  userIsUnassigned,
  connected,
}) {
  const showSpinner = (!connected && isVideoChatOpen) || userIsUnassigned;

  return (
    <View style={styles.content(connected, isVideoChatOpen)}>
      <Header
        userIsUnassigned={userIsUnassigned}
        connected={connected}
        sheetType={sheetType}
        isVideoChatOpen={isVideoChatOpen}
        isNotHearId={isNotHearId}
      />
      {showSpinner && (
        <Spinner
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          color={colors.primary}
        />
      )}

      {!userIsUnassigned && isVideoChatOpen && connected ? (
        <PeersWrapper
          isNotHearId={isNotHearId}
          isVideoChatOpen={isVideoChatOpen}
          sheetType={sheetType}
        />
      ) : null}
      {!userIsUnassigned && connected ? (
        <Bottom
          isNotHearId={isNotHearId}
          sheetType={sheetType}
          isVideoChatOpen={isVideoChatOpen}
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  content: (connected, isVideoChatOpen) => ({
    flex: 1,
    width: '100%',
    position: 'relative',
    height: '100%',
    justifyContent: connected || !isVideoChatOpen ? 'flex-end' : 'flex-start',
  }),
  bottom: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 40,
  },
});

Room.propTypes = {
  sheetType: PropTypes.oneOf([
    SHEET_TYPE_COMMON,
    SHEET_TYPE_PERSONAL,
    SHEET_TYPE_TEAM,
  ]),
};
