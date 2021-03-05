import React from 'react';

import { injectionKeys } from '../../config';
import { useInjectReducer } from '../../utils/injectReducer';
import reducer from './reducers';
import FreeBroadcasting from './FreeBroadcasting';

export default React.memo(function FreeBroadcastingRoot() {
  useInjectReducer({
    key: injectionKeys.videoChat,
    reducer,
  });

  return <FreeBroadcasting />;
});
