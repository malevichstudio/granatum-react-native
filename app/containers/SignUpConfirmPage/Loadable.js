import loadable from '../../utils/loadable';

export default loadable(
  () => import(/* webpackChunkName:'sign-up-confirm-page' */ './index'),
  {
    fallback: null,
  },
);
