import React, { useCallback } from 'react';
import { TouchableOpacity, Linking } from 'react-native';
import { Text, View } from 'native-base';
import { useDispatch } from 'react-redux';

import { getStyle } from '../../../../../utils/widgets';
import useAvailableColor from '../../../../../hooks/useAvailableColor';
import useWidgetFontColors from '../../../../../hooks/useWidgetFontColors';
import useSessionColors from '../../../../../hooks/useSessionColors';
import { addNotification } from 'app/containers/App/actions';
import { parseUrl } from 'app/utils/strings';
import messages from '../../../messages';
import { navigate } from 'app/utils/RootNavigation';

const TextWithStyles = ({
  text,
  styles,
  href,
  widget,
  align,
  listItemIndex,
}) => {
  const dispatch = useDispatch();
  const fontColors = useWidgetFontColors(widget);
  const { sessionColors } = useSessionColors();
  const { availableColor, availableColors } = useAvailableColor(widget);

  const handlePress = useCallback(async () => {
    if (href) {
      /*
        Если ссылка на granatum - пытаемся открыть ее в приложении,
        если не получаеться то отрываем в браузере
      */
      if (href.includes('https://testing.granatum.solutions/')) {
        const url = parseUrl(href);

        if (url?.projects && url?.course) {
          navigate('Course', {
            projectId: url?.projects,
            courseId: url?.course,
          });
        } else if (url?.projects) {
          navigate('Project', {
            projectId: url?.projects,
          });
        } else if (url?.session) {
          navigate('Session', {
            sessionId: url?.session,
            sheetId: url?.sheet,
          });
        } else {
          openLink(href);
        }
      } else {
        openLink(href);
      }
    }
  }, [href]);

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

  const options = [...styles, href && 'LINK'];

  const style = {
    fontSize: 16,
    color: availableColor,
    textAlign: align,
    ...getStyle(options, availableColors, fontColors, sessionColors),
  };

  const content = getListItemContent(styles, text, listItemIndex, style);

  if (href) {
    return (
      <TouchableOpacity onPress={handlePress}>
        <Text style={style}>{content}</Text>
      </TouchableOpacity>
    );
  }

  if (
    styles.includes('VERTICAL_ALIGN_TOP') ||
    styles.includes('VERTICAL_ALIGN_BOTTOM')
  ) {
    return (
      <Text>
        <View>
          <Text style={style}>{content}</Text>
        </View>
      </Text>
    );
  }
  return <Text style={style}>{content}</Text>;
};

export default TextWithStyles;

function getListItemContent(styles, text, listItemIndex, style) {
  if (styles?.includes('unordered-list-item')) {
    return (
      <Text style={{ paddingTop: 5 }}>
        <Text style={style}>{'\u2022  '}</Text>
        <Text style={style}>{text}</Text>
      </Text>
    );
  }

  if (styles?.includes('ordered-list-item')) {
    return (
      <Text style={{ paddingTop: 5 }}>
        <Text style={style}>{listItemIndex}. </Text>
        <Text style={style}>{text}</Text>
      </Text>
    );
  }

  return text;
}
