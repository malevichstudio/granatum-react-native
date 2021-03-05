import React, { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { Button, Text, Left, Right } from 'native-base';

import colors from 'app/theme/variables/colors/defaultColors';
import GranatumIconPressed from 'app/components/icons/GranatumIconPressed';
import GranatumIcon from 'app/components/icons/GranatumIcon';
import { addNotification } from 'app/containers/App/actions';

import { addLike } from '../../../actions';
import Status from './Status';
import messages from '../../../messages';

const Controls = ({
  contentId,
  authorId,
  authorName,
  editorName = null,
  teamName = null,
  edited,
  isEditable,
  blockType,
  authorType,
  isLiked = false,
  canAddLike,
  likesCount,
  userId,
  role,
}) => {
  const dispatch = useDispatch();

  const handleLikePressed = () => {
    if (isLiked || canAddLike) {
      dispatch(addLike(contentId));
    } else {
      dispatch(
        addNotification({
          message: messages.removeAccess,
          type: 'warning',
        }),
      );
    }
  };
  return (
    <>
      <Left>
        <Status
          authorName={authorName}
          edited={edited}
          editorName={editorName}
          teamName={teamName}
          isEditable={isEditable}
          authorType={authorType}
        />
      </Left>

      <Right style={styles.left}>
        <View>
          <Text variantBody2 style={styles.likesCount}>
            {likesCount}
          </Text>
        </View>
        <View>
          <Button transparent onPress={handleLikePressed} style={styles.button}>
            {isLiked ? (
              <GranatumIconPressed />
            ) : (
              <GranatumIcon fill={colors.main} />
            )}
          </Button>
        </View>
      </Right>
    </>
  );
};

export default memo(Controls);

const styles = StyleSheet.create({
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  likesCount: { lineHeight: 24, marginHorizontal: 4 },
  button: { height: 24 },
});
