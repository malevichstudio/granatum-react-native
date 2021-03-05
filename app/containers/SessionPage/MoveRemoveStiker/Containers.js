import React, { useMemo, memo } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from 'native-base';
import { View } from 'react-native';
import memoize from 'memoize-state';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

import { makeSelectTaskResultsBlockWidgets } from '../selectors';
import { moveContent } from '../actions';

import { STICKERS_CONTAINER_TYPE } from '../../../constants';

const extractStickersContainers = memoize((widgets) => {
  const stickerContainers = [];

  for (let i = 0; i < widgets.length; i += 1) {
    if (widgets[i].type === STICKERS_CONTAINER_TYPE) {
      stickerContainers.push(widgets[i]);
    }
  }

  return stickerContainers;
});

const Containers = ({
  block,
  stickerId,
  onShowMoveSticker,
  onCloseMoveRemove,
}) => {
  const dispatch = useDispatch();
  const selectBlockWidgets = useMemo(
    () => makeSelectTaskResultsBlockWidgets(block.id, block.ancestors[0]),
    [block.id, block.ancestors[0]],
  );
  const blockWidgets = useSelector(selectBlockWidgets, shallowEqual);
  const stickerContainers = extractStickersContainers(blockWidgets);

  const handleMoveSticker = (containerId) => () => {
    dispatch(moveContent(stickerId, containerId, block.id));
    onShowMoveSticker();
    onCloseMoveRemove();
  };

  return (
    <View>
      {stickerContainers.map((container) => {
        return (
          <TouchableOpacity
            key={container.id}
            onPress={handleMoveSticker(container.id)}>
            <View style={styles.container}>
              <Text variantBody2>{container.name}</Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
    minHeight: 48,
  },
});

export default memo(Containers);
