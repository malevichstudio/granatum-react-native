import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { Text, Button } from 'native-base';
import { RESULTS_BLOCK_TYPE, STICKER_TYPE } from 'app/constants';
import { addNotification } from 'app/containers/App/actions';
import PlusIcon from 'app/components/icons/PlusIcon';
import { createContent } from '../../../actions';
import messages from '../../../messages';

function AddStickerButton({
  widgetId,
  blockType,
  canAddStickers,
  buttonBg,
  passing,
  addNewStickerHandler,
}) {
  const dispatch = useDispatch();

  function handleAddSticker() {
    if (canAddStickers) {
      dispatch(createContent(widgetId, STICKER_TYPE)).then((result) => {
        addNewStickerHandler(result?.id);
      });
    } else {
      dispatch(
        addNotification({
          message: messages.removedFromProject,
        }),
      );
    }
  }

  if (blockType === RESULTS_BLOCK_TYPE || passing) {
    return null;
  }

  return (
    <View
      style={{
        marginTop: 10,
        width: '100%',
      }}>
      <Button
        style={{
          backgroundColor: buttonBg,
          maxWidth: 375,
          alignSelf: 'center',
          width: '100%',
        }}
        variantPrimary
        full
        small
        rounded
        onPress={handleAddSticker}>
        <PlusIcon color="#fff" />
        <Text light>
          <FormattedMessage {...messages.addNote} />
        </Text>
      </Button>
    </View>
  );
}

AddStickerButton.propTypes = {
  widgetId: PropTypes.string.isRequired,
  blockType: PropTypes.string.isRequired,
};

export default React.memo(AddStickerButton);
