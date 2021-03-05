import React from 'react';
import loadable from '../../utils/loadable';

export default loadable(
  () => import(/* webpackChunkName:'sign-in-page' */ './index'),
  {
    fallback: null,
  },
);
