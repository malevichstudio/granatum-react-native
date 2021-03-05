import loadable from '../../../utils/loadable';

export default loadable(
  () => import(/* webpackChunkName:'project-page' */ './index'),
  {
    fallback: null,
  },
);
