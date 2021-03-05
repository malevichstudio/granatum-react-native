import React from 'react';
import loadable from '../../utils/loadable';

export default loadable(
  () => import(/* webpackChunkName:'recovery-success-page' */ './index'),
  {
    fallback: null,
  },
);
