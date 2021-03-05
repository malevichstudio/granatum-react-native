export const getMicState = (audioProducer, canSendMic, allowed = true) => {
  // из-за вот этого кейса: https://granatum.atlassian.net/browse/TASK-4179
  // нам пришлось расположить эту проверку в самом верху
  if (audioProducer && !audioProducer.paused) {
    return 'on';
  }
  if (!allowed) {
    return 'denied';
  }
  if (!canSendMic || !audioProducer) {
    return 'unsupported';
  }
  return 'off';
};

export const getCamState = (videoProducer, canSendWebcam, allowed = true) => {
  // мы можем быть со включённой камерой когда до этого мы были спикером, поэтому
  // эта проверка должна идти первой
  // подробней: https://granatum.atlassian.net/browse/TASK-4179
  if (videoProducer && videoProducer.type !== 'share') {
    return 'on';
  }
  if (!allowed) {
    return 'denied';
  }
  if (!canSendWebcam) {
    return 'unsupported';
  }
  return 'off';
};

export const getShareState = videoProducer => {
  if (videoProducer && videoProducer.type === 'share') {
    return 'on';
  }
  return 'off';
};

/**
 * Вещает ли пир на все листы?
 * @param peerId
 * @param peers
 * @returns {boolean|*}
 */
export const isBroadcasting = (peerId, peers) => {
  if (peerId in peers) {
    return peers[peerId].settings.broadcastToAll;
  }

  return false;
};
