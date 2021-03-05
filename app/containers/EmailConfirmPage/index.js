import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Spinner } from 'native-base';

import { DAEMON } from 'app/utils/constants';
import colors from 'app/theme/variables/colors/defaultColors';
import { injectionKeys } from 'app/config';
import { useInjectSaga } from 'app/utils/injectSaga';
import { signUpConfirm } from './actions';
import saga from './sagas';

function EmailConfirmPage({ route }) {
  useInjectSaga({ key: injectionKeys.signUpConfirm, saga, mode: DAEMON });

  const dispatch = useDispatch();

  useEffect(() => {
    if (route?.params?.confirmToken) {
      dispatch(
        signUpConfirm({
          token: route?.params?.confirmToken,
          courseId: route?.params?.courseId,
          sessionId: route?.params?.sessionId,
          projectId: route?.params?.projectId,
        }),
      );
    }
  }, []);

  return <Spinner color={colors.primary} />;
}

export default EmailConfirmPage;
