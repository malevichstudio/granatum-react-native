import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Spinner } from 'native-base';

import { DAEMON } from 'app/utils/constants';
import { injectionKeys } from 'app/config';
import { useInjectSaga } from 'app/utils/injectSaga';
import { selectOpenedByLink } from 'app/containers/App/selectors';
import { signUpConfirm } from './actions';
import { setOpenedByLink } from 'app/containers/App/actions';
import saga from './sagas';

function SignUpConfirmPage() {
  useInjectSaga({
    key: injectionKeys.signUpConfirm,
    saga,
    mode: DAEMON,
  });
  const dispatch = useDispatch();
  const openedByLink = useSelector(selectOpenedByLink);

  useEffect(() => {
    if (openedByLink?.confirmToken) {
      dispatch(
        signUpConfirm({
          token: openedByLink?.confirmToken,
          courseId: openedByLink?.courseId,
          sessionId: openedByLink?.sessionId,
          projectId: openedByLink?.projectId,
        }),
      );
      dispatch(setOpenedByLink(null));
    }
  }, []);

  return <Spinner color="blue" />;
}

export default SignUpConfirmPage;
