import React, { useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { StyleSheet, View } from 'react-native';
import { Text } from 'native-base';
import { FormattedMessage } from 'react-intl';
import {
  SHEET_TYPE_COMMON,
  SHEET_TYPE_PERSONAL,
  SHEET_TYPE_TEAM,
} from '../../../constants';
import {
  selectSpeaker,
  selectActiveSpeakerId,
  selectConsumers,
} from '../selectors';
import { selectUserId } from '../../App/selectors';
import { withRoomContext } from '../RoomContext';
import SpeakerPeer from './SpeakerPeer';
import SpeakingPeer from './SpeakingPeer';
import SpeakerMe from './SpeakerMe';
import { makeSelectIsMeSpeaker } from '../../SessionPage/selectors';
import messages from '../messages';

function PeersWrapper({ isVideoChatOpen, sheetType, isNotHearId, roomClient }) {
  const userId = useSelector(selectUserId);
  const speakerPeer = useSelector(selectSpeaker);
  const consumers = useSelector(selectConsumers);
  const activeSpeakerId = useSelector(selectActiveSpeakerId);
  const selectIsMeSpeaker = useMemo(() => makeSelectIsMeSpeaker(userId), [
    userId,
  ]);
  const isMeSpeaker = useSelector(selectIsMeSpeaker);

  useEffect(() => {
    Object.keys(consumers).map((consId) => {
      const consumer = consumers[consId];
      if (!consumer.share && consumer.track.kind === 'video') {
        const isNeedVideo = [
          isNotHearId,
          speakerPeer?.id,
          activeSpeakerId,
        ].includes(consumer.peerId);

        if (!isNeedVideo && consumer) {
          roomClient.pauseConsumerById(consId);
        } else if (consumer.locallyPaused) {
          roomClient.resumeConsumerById(consId);
        }
      }
    });
  }, [consumers, speakerPeer, activeSpeakerId, isNotHearId]);

  return (
    <View style={isVideoChatOpen ? styles.content : styles.contentClosed}>
      {!isMeSpeaker && speakerPeer && sheetType === SHEET_TYPE_COMMON && (
        <SpeakerPeer isVideoChatOpen={isVideoChatOpen} sheetType={sheetType} />
      )}
      {isMeSpeaker && sheetType === SHEET_TYPE_COMMON && (
        <SpeakerMe isVideoChatOpen={isVideoChatOpen} sheetType={sheetType} />
      )}

      {/* если есть ведущий то закрепляем его, потому что если он */}
      {/* не на том же листе, мы не сможем получать его через activeSpeakerId */}
      {isNotHearId && (
        <SpeakingPeer
          peerId={isNotHearId}
          isVideoChatOpen={isVideoChatOpen}
          sheetType={sheetType}
        />
      )}

      {activeSpeakerId &&
        activeSpeakerId !== isNotHearId &&
        !((isMeSpeaker || speakerPeer) && isNotHearId) && (
          <SpeakingPeer
            peerId={activeSpeakerId}
            isVideoChatOpen={isVideoChatOpen}
            sheetType={sheetType}
          />
        )}

      {(!isMeSpeaker || (isMeSpeaker && sheetType !== SHEET_TYPE_COMMON)) &&
        (!speakerPeer || (speakerPeer && sheetType !== SHEET_TYPE_COMMON)) &&
        !activeSpeakerId &&
        isVideoChatOpen &&
        !isNotHearId && (
          <View style={styles.noSpeakers}>
            <Text light variantBody2>
              <FormattedMessage {...messages.noSpeakers} />
            </Text>
          </View>
        )}
    </View>
  );
}

export default withRoomContext(PeersWrapper);

const styles = StyleSheet.create({
  content: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: 10,
    paddingTop: 10,
    width: 344,
    alignSelf: 'center',
  },
  contentClosed: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: 0,
    paddingTop: 0,
    width: 104,
    marginRight: 16,
  },
  noSpeakers: {
    height: 168,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

PeersWrapper.propTypes = {
  sheetType: PropTypes.oneOf([
    SHEET_TYPE_COMMON,
    SHEET_TYPE_PERSONAL,
    SHEET_TYPE_TEAM,
  ]),
};
