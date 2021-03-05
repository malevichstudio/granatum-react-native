import React, { useMemo, useRef } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { View, Animated, StyleSheet } from 'react-native';

import { makeSelectBlockWidgets, selectPassing } from '../../selectors';
import WidgetSelector from './WidgetSelector';
import WidgetWrapper from './WidgetWrapper';
import sortWidgets from '../../../../utils/arrays/sortWidgets';
import BlockLayout from '../components/BlockLayout';
import WidgetLayout from '../components/WidgetLayout';
import * as types from 'app/constants';
import Timer from '../../components/Timer';

const Block = ({ block, scrollPosition, startFrom }) => {
  const selectBlockWidgets = useMemo(() => makeSelectBlockWidgets(block.id), [
    block.id,
  ]);
  const widgets = useSelector(selectBlockWidgets, shallowEqual);
  const sortedWidgets = sortWidgets(block, widgets);
  const passing = useSelector(selectPassing);
  const viewHeightRef = useRef(0);
  const topAnim = useRef(new Animated.Value(0)).current;

  function getTopPosition() {
    if (scrollPosition <= startFrom) {
      return 0;
    }

    const currentHeight = Number(
      startFrom + viewHeightRef?.current - 50,
    ).toFixed(0);

    if (scrollPosition >= currentHeight) {
      return currentHeight;
    }

    return Number(scrollPosition - startFrom).toFixed(0);
  }

  React.useEffect(() => {
    Animated.timing(topAnim, {
      toValue: getTopPosition() || 16,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [topAnim, scrollPosition]);

  const showTimer =
    [types.BLOCK_TYPE].includes(block.type) && block.useTimer && !passing;

  return (
    <View
      onLayout={(event) => {
        viewHeightRef.current = event?.nativeEvent?.layout?.height;
      }}>
      {showTimer ? (
        <Animated.View style={styles.timer(topAnim)}>
          <Timer parentId={block.id} />
        </Animated.View>
      ) : null}
      <BlockLayout block={block}>
        {sortedWidgets?.map((widget) => (
          <WidgetLayout
            widget={widget}
            blockLayout={block.layout}
            key={widget.id}>
            <WidgetWrapper widgetId={widget.id} type={widget.type}>
              <WidgetSelector
                id={widget.id}
                type={widget.type}
                blockId={block.id}
              />
            </WidgetWrapper>
          </WidgetLayout>
        ))}
      </BlockLayout>
    </View>
  );
};

export default Block;

const styles = StyleSheet.create({
  timer: (top) => ({
    position: 'absolute',
    zIndex: 1,
    left: 16,
    top: top || 16,
    flexDirection: 'row',
    alignItems: 'center',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
    backgroundColor: '#fff',
    width: 82,
    paddingVertical: 4,
    paddingRight: 12,
    paddingLeft: 14,
    borderRadius: 20,
  }),
});
