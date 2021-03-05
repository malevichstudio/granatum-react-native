import React, { useState, useEffect } from 'react';
import { StyleSheet, Platform, BackHandler } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button, View } from 'native-base';
import { useSelector, useDispatch } from 'react-redux';
import { useIntl } from 'react-intl';

import colors from 'app/theme/variables/colors/defaultColors';
import ChevronLeftIcon from 'app/components/icons/ChevronLeftIcon';
import Menu from './Menu';
import Me from '../Me';
import PeersWrapper from '../PeersWrapper';
import {
  selectCourseId,
  selectProjectId,
} from '../../../SessionPage/selectors';
import messages from '../../messages';
import { showConfirmModal } from 'app/containers/App/actions';

const SessionHeader = ({
  sheetType,
  isVideoChatOpen,
  isNotHearId,
  connected,
}) => {
  const dispatch = useDispatch();
  const intl = useIntl();
  const navigation = useNavigation();
  const projectId = useSelector(selectProjectId);
  const courseId = useSelector(selectCourseId);

  const [isBack, setIsBack] = useState(false);

  useEffect(() => {
    function backAction() {
      dispatch(
        showConfirmModal({
          title: intl.formatMessage(messages.doYouWantToExitSession),
          confirmText: intl.formatMessage(messages.exit),
          cancelText: intl.formatMessage(messages.cancel),
          onConfirm: () => {
            navigation.navigate('Course', {
              projectId,
              courseId,
            });
          },
          onCancel: () => setIsBack(false),
        }),
      );
      return true;
    }

    if (isBack) {
      backAction();
    }
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, [isBack]);

  const handleBack = () => {
    setIsBack(true);
  };

  return (
    <View style={[styles.container, isVideoChatOpen && { paddingBottom: 0 }]}>
      <View style={styles.leftColumn}>
        <Button transparent onPress={handleBack}>
          <ChevronLeftIcon color={colors.textL1} width={24} height={24} />
        </Button>
      </View>
      {connected ? (
        <View style={{ flexDirection: 'row' }}>
          <View>
            {!isVideoChatOpen && (
              <PeersWrapper
                isNotHearId={isNotHearId}
                isVideoChatOpen={isVideoChatOpen}
                sheetType={sheetType}
              />
            )}
          </View>

          <View>
            <Me isVideoChatOpen={isVideoChatOpen} />
          </View>
        </View>
      ) : null}
      <View style={styles.rightColumn}>
        <Menu />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 0,
    paddingTop: Platform.OS === 'ios' ? 33 : 3,
    paddingBottom: 10,
  },
  leftColumn: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  rightColumn: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  counter: {
    alignItems: 'center',
    flexDirection: 'row',
    marginRight: 18,
  },
  counterText: {
    paddingLeft: 2,
    width: 30,
  },
});

export default SessionHeader;
