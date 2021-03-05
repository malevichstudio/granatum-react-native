import React from 'react';
import loadable from '../../utils/loadable';

export default loadable(
  () => import(/* webpackChunkName:'restore-page' */ './index'),
  {
    fallback: null,
  },
);
