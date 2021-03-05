import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { StyleSheet, View } from 'react-native';
import { Button } from 'native-base';
import color from 'color';

import ClockIcon from 'app/components/icons/ClockIcon';
import GranatumIcon from 'app/components/icons/GranatumIcon';
import { compare } from 'app/utils/arrays';
import { sortStickersByLike } from '../../../actions';

const Controls = ({ widgetId, buttonBg, buttonColor }) => {
  const dispatch = useDispatch();

  const sortStickers = (isLikeSort) => () => {
    dispatch(
      sortStickersByLike({
        id: widgetId,
        sortByLikesCount: isLikeSort,
      }),
    );
  };

  return (
    <View style={styles.wrap}>
      <Button
        style={styles.button(buttonBg, buttonColor)}
        onPress={sortStickers(false)}>
        <ClockIcon fill={buttonColor} />
      </Button>

      <Button
        style={styles.button(buttonBg, buttonColor)}
        onPress={sortStickers(true)}>
        <GranatumIcon fill={buttonColor} />
      </Button>
    </View>
  );
};

Controls.propTypes = {
  widgetId: PropTypes.string.isRequired,
};

function propsAreEqual(prev, next) {
  return (
    prev.widgetId === next.widgetId &&
    prev.blockType === next.blockType &&
    compare(prev.colors, next.colors)
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    marginVertical: 16,
  },
  button: (buttonBg, buttonColor) => ({
    width: 64,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
    borderRadius: 4,
    backgroundColor: color(buttonBg).fade(0.7).string(),
    color: buttonColor,
    elevation: 0,
    shadowColor: null,
    shadowOffset: null,
    shadowRadius: null,
    shadowOpacity: null,
  }),
});

export default React.memo(Controls, propsAreEqual);
