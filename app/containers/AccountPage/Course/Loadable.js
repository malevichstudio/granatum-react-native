import loadable from '../../../utils/loadable';

export default loadable(
  () => import(/* webpackChunkName:'course-page' */ './index'),
  {
    fallback: null,
  },
);
