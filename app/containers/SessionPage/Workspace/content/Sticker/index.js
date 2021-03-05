import React, { memo } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Card, CardItem, Body, Text } from 'native-base';
import { useDispatch } from 'react-redux';

import { RESULTS_BLOCK_TYPE } from 'app/constants';
import colors from 'app/theme/variables/colors/defaultColors';
import Controls from './Controls';
import { addNotification } from '../../../../App/actions';
import { setMoveRemoveStickerId } from '../../../actions';

import messages from '../../../messages';
import EditableText from './EditableText';

const Sticker = ({
  originalAuthor,
  originalText,
  text,
  id,
  focusedStickerHandler,
  authorId,
  blockType,
  authorName,
  editorName,
  teamName,
  edited,
  userId,
  editorId,
  authorType,
  canAddLike,
  isLiked,
  likesCount,
  role,
  color,
  passing,
}) => {
  const dispatch = useDispatch();
  const isEditable = edited && userId === editorId;

  function handleToggleEdit() {
    if (blockType !== RESULTS_BLOCK_TYPE && !passing) {
      if (!edited) {
        focusedStickerHandler(id);
      } else if (!isEditable) {
        dispatch(
          addNotification({
            message: messages.pleaseWaitStickerBeingEdited,
            type: 'warning',
          }),
        );
      }
    }
  }

  const handleMoveRemove = () => {
    dispatch(setMoveRemoveStickerId(id));
  };

  return (
    <TouchableOpacity onLongPress={handleMoveRemove}>
      <Card style={styles.card}>
        {teamName && <View style={styles.line(color)} />}
        <CardItem>
          <Body>
            {isEditable && blockType !== RESULTS_BLOCK_TYPE ? (
              <EditableText
                id={id}
                text={text}
                edited={edited}
                blockType={blockType}
              />
            ) : (
              <TouchableOpacity
                style={styles.text}
                onPress={handleToggleEdit}
                onLongPress={handleMoveRemove}>
                <Text variantBody2>{text}</Text>
              </TouchableOpacity>
            )}
            {originalText && originalAuthor && (
              <View style={styles.quote}>
                <View style={styles.quoteBorder} />
                <Text variantSubtitle2 style={styles.quoteAuthor}>
                  {originalAuthor}:{' '}
                </Text>
                <Text variantBody2>{originalText}</Text>
              </View>
            )}
          </Body>
        </CardItem>
        <CardItem footer style={styles.cardFooter}>
          <Controls
            contentId={id}
            authorId={authorId}
            blockType={blockType}
            authorName={authorName}
            editorName={editorName}
            teamName={teamName}
            edited={edited}
            isEditable={isEditable}
            authorType={authorType}
            canAddLike={canAddLike}
            isLiked={isLiked}
            likesCount={likesCount}
            userId={userId}
            role={role}
          />
        </CardItem>
      </Card>
    </TouchableOpacity>
  );
};

export default memo(Sticker);

const styles = StyleSheet.create({
  card: {
    position: 'relative',
    borderRadius: 4,
    paddingVertical: 8,
    paddingHorizontal: 8,
  },
  line: (color) => ({
    height: '100%',
    width: 4,
    backgroundColor: color,
    position: 'absolute',
    left: 4,
    top: 8,
    zIndex: 2,
    borderRadius: 2,
    flex: 1,
  }),
  text: { minHeight: 60, width: '100%', paddingHorizontal: 8 },
  cardFooter: {
    minHeight: 17,
    maxHeight: 44,
    borderRadius: 0,
    width: '100%',
    height: 'auto',
    paddingHorizontal: 8,
    marginTop: 16,
  },
  quote: { paddingHorizontal: 16 },
  quoteBorder: {
    position: 'absolute',
    left: 6,
    width: 3,
    backgroundColor: colors.primary,
    height: '100%',
  },
  quoteAuthor: { lineHeight: 17, marginBottom: 8 },
});
