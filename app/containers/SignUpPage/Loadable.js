import loadable from '../../utils/loadable';

export default loadable(
  () => import(/* webpackChunkName:'sign-up-page' */ './index'),
  {
    fallback: null,
  },
);
