import loadable from '../../../utils/loadable';

export default loadable(
  () => import(/* webpackChunkName:'projects-page' */ './index'),
  {
    fallback: null,
  },
);
