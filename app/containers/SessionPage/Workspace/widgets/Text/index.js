import React, { memo, useMemo, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StyleSheet, View } from 'react-native';
import { GRID_ROW_MARGIN, GRID_ROW_HEIGHT } from 'app/constants';
import {
  makeSelectTextWidget,
  makeSelectBlock,
  selectActiveBreakpoint,
} from '../../../selectors';
import TextElement from './TextElement';
import { changeWidgetLayout } from '../../../actions/index';

const TextWidget = ({ id, blockId }) => {
  const selectTextWidget = useMemo(() => makeSelectTextWidget(id), [id]);
  const dispatch = useDispatch();
  const widget = useSelector(selectTextWidget);
  const selectBlock = useMemo(() => makeSelectBlock(blockId), [blockId]);
  const block = useSelector(selectBlock);
  const activeBreakpoint = useSelector(selectActiveBreakpoint);
  const widgetLayout =
    block.layout[activeBreakpoint] &&
    block.layout[activeBreakpoint].find((item) => item.i === id);
  const blocksHeight = useRef([]);
  const blocks = widget?.contentState?.blocks;
  const entity = widget?.contentState?.entityMap;

  // Для вычисления высоту виджета, после рендера каждого блока
  // нам нужно записывать его высоту, потом проходится по всем блокам
  // сумировать высоту каждого и меня лейаут
  const handleSetWidgetHeight = (key) => (height) => {
    const index = blocksHeight.current.findIndex((item) => item.key === key);
    if (index === -1) {
      blocksHeight.current.push({ key, height });
    } else {
      blocksHeight.current[index].height = height;
    }
    // применяем когда прорендерелись все блоки
    handleChangeWidgetLayout();
  };

  const handleChangeWidgetLayout = () => {
    if (blocksHeight.current.length === blocks.length) {
      let height = 0;
      blocksHeight.current.map((blockItem) => (height += blockItem.height));
      const wrapHeight = Math.ceil(
        (height + GRID_ROW_MARGIN) / (GRID_ROW_HEIGHT + GRID_ROW_MARGIN),
      );

      const h =
        wrapHeight < widgetLayout?.persistentH
          ? widgetLayout?.persistentH
          : wrapHeight;

      dispatch(
        changeWidgetLayout(blockId, id, {
          h: h >= wrapHeight ? h : wrapHeight,
        }),
      );
    }
  };

  // нужно отслеживать когда удаляют блок текста
  // удалять или добавлять из массива где мы хранним высоту
  // и менять лейаут
  useEffect(() => {
    if (blocks.length < blocksHeight.current.length) {
      blocksHeight.current = blocksHeight.current.filter((heightItem) =>
        blocks.find((blockItem) => heightItem.key === blockItem.key),
      );
      handleChangeWidgetLayout();
    }
  }, [blocks.length]);

  useEffect(() => {
    handleChangeWidgetLayout();
  }, [widgetLayout?.h]);

  function addIndexForList(list) {
    const orderedList = [];

    let indexItem = 1;

    list.map((item, index) => {
      if (item?.type !== 'ordered-list-item') {
        return orderedList.push(item);
      }

      if (blocks[index - 1]?.type !== 'ordered-list-item') {
        indexItem++;
        return orderedList.push({ ...item, index: 1 });
      } else if (blocks[index + 1]?.type !== 'ordered-list-item') {
        orderedList.push({ ...item, index: indexItem });
        return (indexItem = 1);
      }
      orderedList.push({ ...item, index: indexItem });
      return indexItem++;
    });

    return orderedList;
  }

  const blocksListWithIndex = addIndexForList(blocks);

  return (
    <View style={styles.wrapper(widget?.decoration?.align)}>
      {blocksListWithIndex.map((element) =>
        element?.key ? (
          <TextElement
            setWidgetHeight={handleSetWidgetHeight(element.key)}
            element={element}
            entity={entity}
            widget={widget}
            key={element.key}
          />
        ) : null,
      )}
    </View>
  );
};

export default memo(TextWidget);

const styles = StyleSheet.create({
  wrapper: (align) => ({
    height: '100%',
    paddingHorizontal: 24,
    justifyContent: align || 'flex-start',
  }),
  placeholder: {
    opacity: 0.5,
  },
});
