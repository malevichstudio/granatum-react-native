import loadable from '../../utils/loadable';

export default loadable(() => import(/* webpackChunkName:'chat' */ './index'), {
  fallback: null,
});
