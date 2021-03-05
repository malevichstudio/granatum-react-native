import React, { memo } from 'react';
import { FormattedMessage } from 'react-intl';
import { Text } from 'native-base';
import { StyleSheet, View } from 'react-native';

import { AUTHOR_USER_TYPE } from 'app/constants';
import colors from 'app/theme/variables/colors/defaultColors';
import messages from '../../../messages';

const Status = ({
  authorName,
  isEditable,
  edited,
  editorName = null,
  authorType,
  teamName = null,
}) => {
  if (isEditable) {
    return (
      <View>
        <Text
          variantSubtitle2
          gray
          italic
          ellipsizeMode="tail"
          numberOfLines={1}>
          <FormattedMessage {...messages.youAreEditing} />
        </Text>
      </View>
    );
  }

  if (edited && editorName) {
    return (
      <View>
        <Text
          variantSubtitle2
          gray
          ellipsizeMode="tail"
          numberOfLines={2}
          italic
          style={styles.text}>
          {editorName} <FormattedMessage {...messages.editing} />
          {'...'}
        </Text>
      </View>
    );
  }

  const name = teamName ? `${teamName} – ${authorName}` : authorName;

  return (
    <View>
      <Text
        variantSubtitle2
        gray
        ellipsizeMode="tail"
        numberOfLines={2}
        style={styles.text}>
        {authorType !== AUTHOR_USER_TYPE && teamName ? name : authorName}
      </Text>
    </View>
  );
};

export default memo(Status);

const styles = StyleSheet.create({
  text: { lineHeight: 17, color: colors.textDark },
});
