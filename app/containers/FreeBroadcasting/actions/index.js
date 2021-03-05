import * as types from '../constants';

export const setRoomState = state => ({
  type: types.SET_ROOM_STATE,
  payload: { state },
});

export const setRoomActiveSpeaker = peerId => ({
  type: types.SET_ROOM_ACTIVE_SPEAKER,
  payload: { peerId },
});

export const setMe = payload => ({
  type: types.SET_ME,
  payload,
});

export const setProduce = produce => ({
  type: types.SET_PRODUCE,
  produce,
});

export const setDisplayName = displayName => ({
  type: types.SET_DISPLAY_NAME,
  displayName,
});

export const setMediaCapabilities = ({ canSendMic, canSendWebcam }) => ({
  type: types.SET_MEDIA_CAPABILITIES,
  payload: { canSendMic, canSendWebcam },
});

export const setCanChangeWebcam = flag => ({
  type: types.SET_CAN_CHANGE_WEBCAM,
  payload: flag,
});

export const setAudioMutedState = enabled => ({
  type: types.SET_AUDIO_MUTED_STATE,
  payload: { enabled },
});

export const addProducer = producer => ({
  type: types.ADD_PRODUCER,
  payload: { producer },
});

export const removeProducer = producerId => ({
  type: types.REMOVE_PRODUCER,
  payload: { producerId },
});

export const setProducerPaused = producerId => ({
  type: types.SET_PRODUCER_PAUSED,
  payload: { producerId },
});

export const setProducerResumed = producerId => ({
  type: types.SET_PRODUCER_RESUMED,
  payload: { producerId },
});

export const setProducerTrack = (producerId, track) => ({
  type: types.SET_PRODUCER_TRACK,
  payload: { producerId, track },
});

export const setProducerScore = (producerId, score) => ({
  type: types.SET_PRODUCER_SCORE,
  payload: { producerId, score },
});

export const setWebcamInProgress = flag => ({
  type: types.SET_WEBCAM_IN_PROGRESS,
  payload: { flag },
});

export const setShareInProgress = flag => ({
  type: types.SET_SHARE_IN_PROGRESS,
  payload: { flag },
});

export const addPeer = peer => ({
  type: types.ADD_PEER,
  peer,
});

export const addSpeakerPeer = peer => ({
  type: types.ADD_SPEAKER_PEER,
  peer,
});

export const addPinnedPeer = peer => ({
  type: types.ADD_PINNED_PEER,
  peer,
});

export const removePeer = peerId => ({
  type: types.REMOVE_PEER,
  payload: { peerId },
});

export const removeSpeakerPeer = peerId => ({
  type: types.REMOVE_SPEAKER_PEER,
  payload: { peerId },
});

export const removePinnedPeer = peerId => ({
  type: types.REMOVE_PINNED_PEER,
  payload: { peerId },
});

export const setPeerDisplayName = (displayName, peerId) => ({
  type: types.SET_PEER_DISPLAY_NAME,
  displayName,
  peerId,
});

export const changePeerSettings = payload => ({
  type: types.CHANGE_PEER_SETTINGS,
  payload,
});

export const changeMeSettings = settings => ({
  type: types.CHANGE_ME_SETTINGS,
  settings,
});

export const addConsumer = (consumer, peerId) => ({
  type: types.ADD_CONSUMER,
  payload: { consumer, peerId },
});

export const removeConsumer = (consumerId, peerId) => ({
  type: types.REMOVE_CONSUMER,
  payload: { consumerId, peerId },
});

export const setConsumerPaused = (consumerId, originator) => ({
  type: types.SET_CONSUMER_PAUSED,
  payload: { consumerId, originator },
});

export const setConsumerResumed = (consumerId, originator) => ({
  type: types.SET_CONSUMER_RESUMED,
  payload: { consumerId, originator },
});

export const setConsumerCurrentLayers = (
  consumerId,
  spatialLayer,
  temporalLayer,
) => ({
  type: types.SET_CONSUMER_CURRENT_LAYERS,
  payload: { consumerId, spatialLayer, temporalLayer },
});

// export const setConsumerCurrentLayers = (
//   consumerId,
//   spatialLayer,
//   temporalLayer,
// ) => ({
//   type: types.SET_CONSUMER_CURRENT_LAYERS,
//   payload: { consumerId, spatialLayer, temporalLayer },
// });
//
// export const setTeamConsumerCurrentLayers = (
//   consumerId,
//   spatialLayer,
//   temporalLayer,
// ) => ({
//   type: types.SET_TEAM_CONSUMER_CURRENT_LAYERS,
//   payload: { consumerId, spatialLayer, temporalLayer },
// });
//
// export const setSessionConsumerPreferredLayers = (
//   consumerId,
//   spatialLayer,
//   temporalLayer,
// ) => ({
//   type: types.SET_CONSUMER_PREFERRED_LAYERS,
//   payload: { consumerId, spatialLayer, temporalLayer },
// });
//
// export const setTeamConsumerPreferredLayers = (
//   consumerId,
//   spatialLayer,
//   temporalLayer,
// ) => ({
//   type: types.SET_TEAM_CONSUMER_PREFERRED_LAYERS,
//   payload: { consumerId, spatialLayer, temporalLayer },
// });

// export const setConsumerScore = (consumerId, score) => ({
//   type: types.SET_CONSUMER_SCORE,
//   payload: { consumerId, score },
// });
