import loadable from '../../utils/loadable';

export default loadable(
  () => import(/* webpackChunkName: 'profile-page' */ './index'),
  {
    fallback: null,
  },
);
