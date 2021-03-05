import loadable from '../../utils/loadable';

export default loadable(
  () => import(/* webpackChunkName:'sign-up-social-page' */ './index'),
  {
    fallback: null,
  },
);
