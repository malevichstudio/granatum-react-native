import React from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native';
import { useSelector } from 'react-redux';

import useSessionColors from 'app/hooks/useSessionColors';
import { GRID_ROW_HEIGHT, GRID_ROW_MARGIN } from 'app/constants';
import { bottom } from 'app/utils/blocks/responsiveGridUtils';
import { selectActiveBreakpoint } from '../../../selectors';

const BlockLayout = ({ block, children, withoutBg = false }) => {
  const breakpoint = useSelector(selectActiveBreakpoint);
  const nbRow = bottom(block.layout[breakpoint]);
  const height =
    nbRow * GRID_ROW_HEIGHT +
    (nbRow - 1) * GRID_ROW_MARGIN +
    GRID_ROW_MARGIN * 2 +
    48;

  const { sessionColors } = useSessionColors(block?.backgroundColor);

  if (
    block?.backgroundType === 'image' &&
    block?.backgroundImage &&
    !withoutBg
  ) {
    return (
      <ImageBackground
        resizeMode="cover"
        source={{ uri: block?.backgroundImage }}
        style={[styles.wrapper, { height }]}>
        {children}
      </ImageBackground>
    );
  }

  if (
    block?.backgroundType === 'color' &&
    sessionColors[block?.backgroundColor] &&
    !withoutBg
  ) {
    return (
      <View
        style={[
          styles.wrapper,
          { height },
          { backgroundColor: sessionColors[block?.backgroundColor] },
        ]}>
        {children}
      </View>
    );
  }

  return <View style={[styles.wrapper, { height }]}>{children}</View>;
};

export default BlockLayout;

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    overflow: 'hidden',
    position: 'relative',
  },
});
