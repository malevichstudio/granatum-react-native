import loadable from '../../utils/loadable';

export default loadable(
  () => import(/* webpackChunkName:'projects-root' */ './index'),
  {
    fallback: null,
  },
);
