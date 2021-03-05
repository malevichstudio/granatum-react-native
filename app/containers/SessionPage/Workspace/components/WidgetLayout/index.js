import React from 'react';
import { View, StyleSheet, ImageBackground, Dimensions } from 'react-native';
import { Text } from 'native-base';
import { useSelector } from 'react-redux';
import useSessionColors from 'app/hooks/useSessionColors';
import { GRID_ROW_HEIGHT, GRID_ROW_MARGIN, DRAWING_TYPE } from 'app/constants';
import { columns } from 'app/config';
import { selectActiveBreakpoint } from 'app/containers/SessionPage/selectors';

const WidgetLayout = ({ blockLayout, widget, children }) => {
  const breakpoint = useSelector(selectActiveBreakpoint);
  const colWidth =
    (Dimensions.get('window').width -
      GRID_ROW_MARGIN * (columns[breakpoint] - 1) -
      10 * 2) /
    columns[breakpoint];

  const { sessionColors } = useSessionColors(widget.backgroundColor);

  let layoutStyles = {};
  const element = blockLayout[breakpoint].find((el) => el.i === widget.id);

  // все эти формулы я взял с библиотеки которую мы испольуем на вебе react-grid-layout
  if (element) {
    let width = Math.round(
      colWidth * element.w + Math.max(0, element.w - 1) * GRID_ROW_MARGIN,
    );

    const height = Math.round(
      GRID_ROW_HEIGHT * element.h +
        Math.max(0, element.h - 1) * GRID_ROW_MARGIN,
    );

    const transform = [
      {
        translateX: Math.round(
          (colWidth + GRID_ROW_MARGIN) * element?.x + GRID_ROW_MARGIN + 2,
        ),
      },
      {
        translateY:
          Math.round(
            (GRID_ROW_HEIGHT + GRID_ROW_MARGIN) * element?.y + GRID_ROW_MARGIN,
          ) + 24,
      },
    ];

    layoutStyles = element
      ? {
          width,
          height,
          transform,
        }
      : {};
  }

  if (widget.type === DRAWING_TYPE) {
    return (
      <View
        style={[
          styles.wrapper,
          layoutStyles,
          { alignItems: 'center', justifyContent: 'center' },
        ]}>
        <Text>Доска для рисования в процессе разработки</Text>
      </View>
    );
  }

  if (widget?.backgroundType === 'image' && widget?.backgroundImage) {
    return (
      <ImageBackground
        resizeMode="cover"
        source={{ uri: widget?.backgroundImage }}
        style={[styles.wrapper, layoutStyles]}>
        {children}
      </ImageBackground>
    );
  }

  if (
    widget?.backgroundType === 'color' &&
    sessionColors[widget?.backgroundColor]
  ) {
    return (
      <View
        style={[
          styles.wrapper,
          layoutStyles,
          {
            backgroundColor: sessionColors[widget?.backgroundColor],
          },
        ]}>
        {children}
      </View>
    );
  }

  return <View style={[styles.wrapper, layoutStyles]}>{children}</View>;
};

export default WidgetLayout;

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
  },
});
