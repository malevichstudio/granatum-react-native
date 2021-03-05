import React, { memo, useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { Text, View } from 'native-base';

import SandClockIcon from 'app/components/icons/SandClockIcon';
import colors from 'app/theme/variables/colors/defaultColors';
import { makeSelectTimer } from '../selectors';

function Timer({ parentId }) {
  const selectTimer = useMemo(() => makeSelectTimer(parentId), [parentId]);
  const { duration } = useSelector(selectTimer);

  if (!duration) {
    return null;
  }

  return (
    <View style={styles.wrapper}>
      <SandClockIcon fill={colors.textDark} style={styles.icon} />
      <Text variantSubtitle2 style={styles.text}>
        {duration.length > 4
          ? `${duration.slice(-5, -2)}:${duration.slice(-2)}`
          : `${duration.slice(0, 2)}:${duration.slice(2)}`}
      </Text>
    </View>
  );
}

export default memo(Timer);

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    marginRight: 5,
    position: 'relative',
  },
  text: {
    width: 55,
    lineHeight: 30,
  },
});
