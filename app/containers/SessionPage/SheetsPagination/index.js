import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Text, Footer, Button } from 'native-base';
import { useSelector } from 'react-redux';

import CommentsIcon from 'app/components/icons/CommentsIcon';
import ChevronRightIcon from 'app/components/icons/ChevronRightIcon';
import ChevronLeftIcon from 'app/components/icons/ChevronLeftIcon';
import FollowIcon from 'app/components/icons/FollowIcon';
import GroupAltIcon from 'app/components/icons/GroupAltIcon';
import IndividualIcon from 'app/components/icons/IndividualIcon';
import colors from 'app/theme/variables/colors/defaultColors';
import {
  controlsButton,
  controlsButtonText,
  disabledButton,
} from 'app/styles/buttons';
import {
  selectSheets,
  selectActiveSheetIndex,
  selectSessionFollowMode,
  selectSessionId,
  selectActiveSheetType,
  selectTeam,
  selectUserIsUnassigned,
} from '../selectors';
import { selectIsUnreadMessages } from '../../Chat/selectors';
import { selectPassing } from 'app/containers/SessionPage/selectors';
import List from './List';
import Timer from '../components/Timer';
import {
  SHEET_TYPE_PERSONAL,
  SHEET_TYPE_TEAM,
  SHEET_TYPE_COMMON,
} from '../../../constants';
import { FormattedMessage } from 'react-intl';
import messages from '../messages';

const SheetsPagination = ({ handleOpenChat }) => {
  const navigation = useNavigation();
  const [visible, setVisible] = useState(false);
  const sessionId = useSelector(selectSessionId);
  const isFollow = useSelector(selectSessionFollowMode);
  const sheetType = useSelector(selectActiveSheetType);
  const passing = useSelector(selectPassing);
  const isUnreadMessages = useSelector(selectIsUnreadMessages);
  const team = useSelector(selectTeam);
  const userIsUnassigned = useSelector(selectUserIsUnassigned);

  const sheets = useSelector(selectSheets);
  const activeSheetIndex = useSelector(selectActiveSheetIndex);
  const activeSheet = sheets[activeSheetIndex];

  if (!sheets?.length) {
    return null;
  }
  const originalSheets = sheets.filter((sheet) => sheet.id !== 'temp');

  const isPrevDisabled = activeSheetIndex === 0;
  const isNextDisabled = activeSheetIndex === originalSheets.length - 1;

  const handleNextSheet = () => {
    navigation.navigate('Session', {
      sessionId,
      sheetId: sheets[activeSheetIndex + 1].id,
    });
  };

  const handlePrevSheet = () => {
    navigation.navigate('Session', {
      sessionId,
      sheetId: sheets[activeSheetIndex - 1].id,
    });
  };

  const handleOpen = () => {
    if (!isFollow) {
      setVisible(true);
    }
  };

  const handleClose = () => {
    setVisible(false);
  };

  function getTeamName() {
    if (userIsUnassigned) {
      return <FormattedMessage {...messages.unassigned} />;
    }
    return team.name;
  }

  return (
    <>
      {sheetType !== SHEET_TYPE_COMMON && team.name ? (
        <View style={styles.footerTopBar(colors.white, colors.textL1)}>
          <Text alignCenter variantBody1>
            {getTeamName()}
          </Text>
        </View>
      ) : null}

      <Footer style={styles.footer}>
        {activeSheet?.useTimer ? (
          <View style={styles.timer}>
            <Timer parentId={activeSheet?.id} />
          </View>
        ) : null}
        <View style={controlsButton(colors.primary)}>
          {!isFollow && (
            <TouchableOpacity
              style={isPrevDisabled && disabledButton}
              transparent
              disabled={isPrevDisabled}
              onPress={handlePrevSheet}>
              <ChevronLeftIcon color={colors.white} />
            </TouchableOpacity>
          )}
          {isFollow && <FollowIcon color={colors.white} />}
          <TouchableOpacity transparent onPress={handleOpen}>
            <Text
              light
              variantSubtitle2
              style={controlsButtonText(colors.white)}>
              {activeSheetIndex + 1} / {originalSheets.length}
            </Text>
          </TouchableOpacity>
          {!isFollow && (
            <TouchableOpacity
              style={isNextDisabled && disabledButton}
              transparent
              disabled={isNextDisabled}
              onPress={handleNextSheet}>
              <ChevronRightIcon color={colors.white} />
            </TouchableOpacity>
          )}
          {sheetType !== SHEET_TYPE_COMMON && (
            <View style={styles.sheetType}>
              {sheetType === SHEET_TYPE_TEAM && <GroupAltIcon />}
              {sheetType === SHEET_TYPE_PERSONAL && <IndividualIcon />}
              {team.name ? (
                <>
                  <View style={styles.arrow(colors.textL1)} />
                  <View style={styles.arrowOverlay} />
                </>
              ) : null}
            </View>
          )}
        </View>

        <View style={styles.chatButton}>
          <Button transparent onPress={handleOpenChat}>
            {isUnreadMessages && !passing && <View style={styles.indicator} />}
            <CommentsIcon fill="#19191A" />
          </Button>
        </View>
      </Footer>

      <List
        activeSheetIndex={activeSheetIndex}
        sheets={sheets}
        visible={visible}
        handleOpen={handleOpen}
        handleClose={handleClose}
      />
    </>
  );
};

const arrowRootStyles = {
  position: 'absolute',
  width: 0,
  height: 0,
  borderStyle: 'solid',
  borderTopWidth: 8,
  borderRightWidth: 8,
  borderBottomWidth: 0,
  borderLeftWidth: 8,
  borderColor: 'transparent',
};

const styles = StyleSheet.create({
  sheetType: {
    position: 'absolute',
    right: -30,
    top: 12,
  },
  timer: {
    position: 'absolute',
    top: 12,
    left: 16,
    width: 82,
  },
  arrow: (color) => ({
    ...arrowRootStyles,
    top: -21,
    borderTopColor: color,
  }),
  arrowOverlay: {
    ...arrowRootStyles,
    top: -22,
    borderTopColor: '#fff',
  },
  footerTopBar: (bgColor, borderColor) => ({
    backgroundColor: bgColor,
    minHeight: 32,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopColor: borderColor,
    borderBottomColor: borderColor,
    borderTopWidth: 1,
    borderBottomWidth: 1,
  }),
  footer: {
    justifyContent: 'center',
    alignItems: 'center',
    // добавляем еле заметный верхний бордер,
    // т.к. тень здесь почему-то не срабатывает как надо
    borderTopColor: colors.mainL7,
    borderTopWidth: 0.5,
    borderRadius: 1,
  },
  chatButton: {
    position: 'absolute',
    marginHorizontal: 16,
    right: 0,
    top: 4,
  },
  indicator: {
    position: 'absolute',
    right: -3,
    top: 8,
    zIndex: 5,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#F6473B',
  },
});

export default SheetsPagination;
