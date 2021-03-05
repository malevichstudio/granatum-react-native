import React from 'react';
import loadable from '../../utils/loadable';

export default loadable(
  () => import(/* webpackChunkName:'recovery-page' */ './index'),
  {
    fallback: null,
  },
);
