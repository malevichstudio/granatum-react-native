import React, { memo } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Text } from 'native-base';

import Avatar from './Avatar';
import FormatDate from 'app/components/dates/FormatDate';
import theme from 'app/theme/variables/defaultTheme';

const ChatMessage = ({
  message,
  isSelfMessage,
  isPersonalChat,
  showAvatar,
  showAuthor,
  isGroup,
}) => {
  const avatarIsVisible = showAvatar && !isSelfMessage && !isPersonalChat;

  return (
    <View
      style={styles.wrapper(isSelfMessage, avatarIsVisible, isPersonalChat)}>
      {avatarIsVisible && (
        <Avatar
          uri={message?.avatar}
          name={message?.name}
          color={message?.color}
          isOnline={message?.online}
        />
      )}
      <View
        style={[styles.inner(isGroup), isSelfMessage && styles.selfMessage]}>
        {showAuthor && !isSelfMessage && (
          <Text variantSubtitle2 style={[isSelfMessage && styles.white]}>
            {message?.name}
          </Text>
        )}
        <View style={styles.box(isPersonalChat)}>
          <Text style={[styles.text, isSelfMessage && styles.white]}>
            {message?.text}
          </Text>
          <Text style={[styles.time, isSelfMessage && styles.white]}>
            <FormatDate date={message?.createdDate} format="HH:mm" />
          </Text>
        </View>
      </View>
    </View>
  );
};

export default memo(ChatMessage);

const styles = StyleSheet.create({
  wrapper: (isSelfMessage, avatarIsVisible, isPersonalChat) => ({
    flexDirection: isSelfMessage ? 'column' : 'row',
    alignItems: 'flex-end',
    marginLeft: !avatarIsVisible && !isPersonalChat ? 48 : 0,
  }),
  inner: (isGroup) => ({
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#fff',
    marginVertical: isGroup ? 2 : 6,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
    alignSelf: 'flex-start',
  }),
  selfMessage: {
    backgroundColor: theme?.brandPrimary,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 12,
    alignSelf: 'flex-end',
    marginRight: 0,
    marginLeft: 16,
  },
  text: {
    marginRight: 10,
  },
  white: {
    color: '#fff',
  },
  time: {
    fontSize: 11,
    color: 'rgba(0,0,0, 0.5)',
    marginLeft: 'auto',
    marginTop: 5,
  },
  box: (isPersonalChat) => ({
    flexDirection: 'row',
    alignItems: 'baseline',
    flexWrap: 'wrap',
    maxWidth: Dimensions.get('window').width - (isPersonalChat ? 57 : 105),
  }),
});
