import loadable from '../../../utils/loadable';

export default loadable(
  () => import(/* webpackChunkName:'session-page' */ './index'),
  {
    fallback: null,
  },
);
