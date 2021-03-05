import loadable from '../../utils/loadable';

export default loadable(
  () => import(/* webpackChunkName:'sign-up-course-page' */ './index'),
  {
    fallback: null,
  },
);
