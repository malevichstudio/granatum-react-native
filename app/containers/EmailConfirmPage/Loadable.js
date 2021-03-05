import loadable from '../../utils/loadable';

export default loadable(
  () => import(/* webpackChunkName:'email-confirm-page' */ './index'),
  {
    fallback: null,
  },
);
