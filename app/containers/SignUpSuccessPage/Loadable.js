import loadable from '../../utils/loadable';

export default loadable(
  () => import(/* webpackChunkName:'sign-up-success-page' */ './index'),
  {
    fallback: null,
  },
);
