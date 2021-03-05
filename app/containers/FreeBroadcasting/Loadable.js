import React from 'react';
import loadable from '../../utils/loadable';


export default loadable(
  () => import(/* webpackChunkName:'free-broadcasting' */ './index'),
  {
    fallback: null,
  },
);
