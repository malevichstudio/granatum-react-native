import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'native-base';
import useSessionColors from '../../../../../hooks/useSessionColors';
import useWidgetFontColors from '../../../../../hooks/useWidgetFontColors';

const TaskBlockHeader = ({
  name,
  optionName,
  teamName,
  blockId,
  backgroundColor,
  blockBackgroundType,
}) => {
  const { sessionColors } = useSessionColors();
  const colors = useWidgetFontColors({
    blockId,
    backgroundColor,
    blockBackgroundType,
  });
  const color = sessionColors[colors[0]];
  return (
    <View style={styles.wrapper}>
      <Text style={{ color }}>
        {name} - {optionName}
      </Text>
      <Text style={{ color }}>{teamName}</Text>
    </View>
  );
};

export default TaskBlockHeader;

const styles = StyleSheet.create({
  wrapper: {
    padding: 10,
  },
});
