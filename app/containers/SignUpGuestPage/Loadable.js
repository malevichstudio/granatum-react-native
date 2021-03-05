import loadable from '../../utils/loadable';

export default loadable(
  () => import(/* webpackChunkName:'sign-up-guest-page' */ './index'),
  {
    fallback: null,
  },
);
