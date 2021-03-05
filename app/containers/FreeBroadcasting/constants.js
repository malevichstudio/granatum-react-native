const prefix = 'FreeBroadcasting';

export const SET_ROOM_STATE = `${prefix}/SET_ROOM_STATE`;
export const SET_ROOM_ACTIVE_SPEAKER = `${prefix}/SET_ROOM_ACTIVE_SPEAKER`;
export const SET_ME = `${prefix}/SET_ME`;
export const SET_PRODUCE = `${prefix}/SET_PRODUCE`;
export const SET_DISPLAY_NAME = `${prefix}/SET_DISPLAY_NAME`;
export const SET_MEDIA_CAPABILITIES = `${prefix}/SET_MEDIA_CAPABILITIES`;
export const SET_CAN_CHANGE_WEBCAM = `${prefix}/SET_CAN_CHANGE_WEBCAM`;
export const SET_AUDIO_MUTED_STATE = `${prefix}/SET_AUDIO_MUTED_STATE`;
export const ADD_PRODUCER = `${prefix}/ADD_PRODUCER`;
export const REMOVE_PRODUCER = `${prefix}/REMOVE_PRODUCER`;
export const SET_PRODUCER_PAUSED = `${prefix}/SET_PRODUCER_PAUSED`;
export const SET_PRODUCER_RESUMED = `${prefix}/SET_PRODUCER_RESUMED`;
export const SET_PRODUCER_TRACK = `${prefix}/SET_PRODUCER_TRACK`;
export const SET_PRODUCER_SCORE = `${prefix}/SET_PRODUCER_SCORE`;
export const SET_WEBCAM_IN_PROGRESS = `${prefix}/SET_WEBCAM_IN_PROGRESS`;
export const SET_SHARE_IN_PROGRESS = `${prefix}/SET_SHARE_IN_PROGRESS`;

export const ADD_PEER = `${prefix}/ADD_PEER`;
export const ADD_SPEAKER_PEER = `${prefix}/ADD_SPEAKER_PEER`;
export const ADD_PINNED_PEER = `${prefix}/ADD_PINNED_PEER`;

export const REMOVE_PEER = `${prefix}/REMOVE_PEER`;
export const REMOVE_SPEAKER_PEER = `${prefix}/REMOVE_SPEAKER_PEER`;
export const REMOVE_PINNED_PEER = `${prefix}/REMOVE_PINNED_PEER`;

export const SET_PEER_DISPLAY_NAME = `${prefix}/SET_PEER_DISPLAY_NAME`;
export const CHANGE_PEER_SETTINGS = `${prefix}/CHANGE_PEER_SETTINGS`;
// пока-что нам не нужен этот экшен для команды
export const CHANGE_ME_SETTINGS = `${prefix}/CHANGE_ME_SETTINGS`;
export const ADD_CONSUMER = `${prefix}/ADD_CONSUMER`;
export const REMOVE_CONSUMER = `${prefix}/REMOVE_CONSUMER`;
export const SET_CONSUMER_PAUSED = `${prefix}/SET_CONSUMER_PAUSED`;
export const SET_CONSUMER_RESUMED = `${prefix}/SET_CONSUMER_RESUMED`;
export const SET_CONSUMER_PREFERRED_LAYERS = `${prefix}/SET_CONSUMER_PREFERRED_LAYERS`;
export const SET_CONSUMER_CURRENT_LAYERS = `${prefix}/SET_CONSUMER_CURRENT_LAYERS`;
