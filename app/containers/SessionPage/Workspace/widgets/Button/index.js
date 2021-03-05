import React, { useMemo, memo } from 'react';
import { StyleSheet, View, TouchableHighlight, Linking } from 'react-native';
import { Text } from 'native-base';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { FormattedMessage } from 'react-intl';
import color from 'color';

import useSessionColors from 'app/hooks/useSessionColors';
import {
  button,
  buttonText,
  buttonSmall,
  buttonLarge,
  buttonMedium,
} from 'app/styles/buttons';
import messages from '../../../messages';
import {
  makeSelectButtonWidget,
  selectSessionId,
  selectSheets,
  selectActiveSheetIndex,
} from '../../../selectors';
import { addNotification } from 'app/containers/App/actions';
import { parseUrl } from 'app/utils/strings';
import {
  BUTTON_WIDGET_TYPE_BLOCK,
  BUTTON_WIDGET_TYPE_EXTERNAL,
} from 'app/constants';

const ButtonWidget = ({ id }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const sessionId = useSelector(selectSessionId);
  const selectButtonWidget = useMemo(() => makeSelectButtonWidget(id), [id]);
  const widget = useSelector(selectButtonWidget);
  const sheets = useSelector(selectSheets);
  const activeSheetIndex = useSelector(selectActiveSheetIndex);
  const { accentColor, sessionColors } = useSessionColors(widget);
  const underlayColor = color(accentColor).darken(0.1).string();

  const handlePress = async () => {
    if (widget?.url && widget?.buttonType === BUTTON_WIDGET_TYPE_EXTERNAL) {
      /*
        Если ссылка на granatum - пытаемся открыть ее в приложении,
        если не получаеться то отрываем в браузере
      */
      if (widget.url.includes('https://testing.granatum.solutions/')) {
        const url = parseUrl(widget?.url);

        if (url?.projects && url?.course) {
          navigation.navigate('Course', {
            projectId: url?.projects,
            courseId: url?.course,
          });
        } else if (url?.projects) {
          navigation.navigate('Project', {
            projectId: url?.projects,
          });
        } else if (url?.session) {
          navigation.navigate('Session', {
            sessionId: url?.session,
            sheetId: url?.sheet,
          });
        } else {
          openLink(widget?.url);
        }
      } else {
        openLink(widget?.url);
      }
    }

    // Переходим к листу/блоку в текущей сессии
    if (
      widget?.targetSheetId &&
      widget?.buttonType === BUTTON_WIDGET_TYPE_BLOCK
    ) {
      navigation.navigate('Session', {
        sessionId,
        sheetId: widget?.targetSheetId,
        blockId: widget?.targetBlockId,
        isCurrentSheet: sheets[activeSheetIndex]?.id === widget?.targetSheetId,
        clickId: Date.now(),
      });
    }
  };

  async function openLink(link) {
    const supported = await Linking.canOpenURL(link);

    if (supported) {
      await Linking.openURL(link);
    } else {
      dispatch(
        addNotification({
          message: { ...messages.invalidLink },
          type: 'error',
        }),
      );
    }
  }

  return (
    <View style={styles.buttonBg}>
      <TouchableHighlight
        onPress={handlePress}
        style={[
          button(accentColor),
          styles[widget?.size],
          widget?.fullWidth && styles.fullWidth,
          { alignSelf: 'center' },
        ]}
        activeOpacity={0.7}
        underlayColor={underlayColor}>
        <Text semiBold style={[buttonText(sessionColors.colorOne)]}>
          {widget?.text || <FormattedMessage {...messages.button} />}
        </Text>
      </TouchableHighlight>
    </View>
  );
};

export default memo(ButtonWidget);

const styles = StyleSheet.create({
  fullWidth: {
    width: '100%',
  },
  average: buttonSmall,
  big: buttonMedium,
  extraBig: buttonLarge,
  buttonBg: {
    padding: 24,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
