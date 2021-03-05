import React, { useState, useMemo, memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Text } from 'native-base';
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useIntl } from 'react-intl';

import colors from 'app/theme/variables/colors/defaultColors';
import ChatRoom from './ChatRoom';
import Avatar from './Avatar';
import FormatDate from 'app/components/dates/FormatDate';
import { isSessionAdmin } from 'app/utils/permissions';
import { selectCurrentPersonalChat, selectPersonalChats } from '../selectors';
import { selectPersonalChat } from '../actions';
import SearchIcon from 'app/components/icons/SearchIcon';
import CloseIcon from 'app/components/icons/CloseIcon';
import ListIcon from 'app/components/icons/ListIcon';
import messages from '../messages';

const PersonalChat = () => {
  const dispatch = useDispatch();
  const chat = useSelector(selectCurrentPersonalChat);
  const chats = useSelector(selectPersonalChats);
  const intl = useIntl();

  const [search, setSearch] = useState('');

  const searchChats = useMemo(() => {
    if (search !== '') {
      return chats.filter(
        (chat) =>
          chat.user.name.toLowerCase().indexOf(search.toLowerCase()) !== -1,
      );
    }
    return chats;
  }, [search, chats]);

  function handleSelectChat(id) {
    dispatch(selectPersonalChat({ id }));
  }

  function handleUnselectChat() {
    dispatch(selectPersonalChat({ id: false }));
  }

  function handleChangeSearch(value) {
    setSearch(value);
  }

  function handleClearSearch() {
    setSearch('');
  }

  if (chat && chat.id) {
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.back}>
          <TouchableOpacity onPress={handleUnselectChat}>
            <ListIcon fill="#000" />
          </TouchableOpacity>
          <View style={styles.backAvatar}>
            <Avatar
              uri={chat?.user?.avatar}
              name={chat?.user?.name}
              color={chat?.user?.color}
              isOnline={chat?.user?.online}
              isAdmin={isSessionAdmin(chat?.user?.role)}
            />
          </View>
          <Text variantSubtitle2>{chat?.user?.name}</Text>
        </View>
        <ChatRoom chat={chat} />
      </View>
    );
  }

  return (
    <View style={styles.wrapper}>
      <View style={styles.search}>
        <TextInput
          value={search}
          onChangeText={handleChangeSearch}
          placeholder={intl.formatMessage(messages.findUser)}
          maxLength={50}
          autoCapitalize="none"
          autoCompleteType="off"
          autoCorrect={false}
          style={styles.input}
        />
        {search ? (
          <TouchableOpacity style={styles.icon} onPress={handleClearSearch}>
            <CloseIcon fill="#ccc" />
          </TouchableOpacity>
        ) : (
          <SearchIcon style={styles.icon} fill="#ccc" />
        )}
      </View>
      <ScrollView style={styles.list}>
        {searchChats.map(
          ({ message, messages, user, id, existNewMessages }) => (
            <TouchableOpacity
              key={id}
              style={styles.chat}
              onPress={() => handleSelectChat(id)}>
              <View style={styles.avatar}>
                <Avatar
                  uri={user?.avatar}
                  name={user?.name}
                  color={user?.color}
                  isOnline={user?.online}
                  isAdmin={isSessionAdmin(user?.role)}
                />
              </View>
              <View style={styles.center}>
                <Text variantSubtitle2>{user?.name}</Text>
                {message?.text && (
                  <Text style={styles.text} numberOfLines={1}>
                    {message?.text}
                  </Text>
                )}
              </View>
              <View style={styles.right}>
                {message?.createdDate && (
                  <Text style={styles.time}>
                    <FormatDate date={message?.createdDate} format="HH:mm" />
                  </Text>
                )}
                {existNewMessages && (
                  <UnreadMessageIndicator messages={messages.content} />
                )}
              </View>
            </TouchableOpacity>
          ),
        )}
      </ScrollView>
    </View>
  );
};

export default memo(PersonalChat);

const UnreadMessageIndicator = ({ messages }) => {
  const unreadMessages = messages.filter((message) => message.unread);
  return (
    <View style={styles.unreadCounter}>
      <Text variantCaption style={styles.unreadCounterText}>
        {unreadMessages.length}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  search: {
    marginTop: 8,
    position: 'relative',
    borderBottomColor: colors.mainL6,
    borderBottomWidth: 1,
    paddingHorizontal: 16,
  },
  icon: {
    position: 'absolute',
    top: '50%',
    right: 16,
    marginTop: -8,
    width: 16,
    height: 16,
  },
  input: {
    paddingVertical: 10,
    paddingRight: 40,
  },
  list: { paddingHorizontal: 16 },
  chat: {
    flexDirection: 'row',
    marginTop: 16,
  },
  avatar: {
    bottom: -6,
  },
  text: { color: colors.textD2 },
  back: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  backAvatar: {
    bottom: -6,
    marginLeft: 20,
  },
  center: {
    marginRight: 20,
    flex: 1,
  },
  right: {
    marginLeft: 'auto',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    flexDirection: 'column',
  },
  time: {
    fontSize: 11,
    lineHeight: 20,
    color: 'rgba(0,0,0, 0.5)',
  },
  unreadCounter: {
    borderRadius: 10,
    paddingHorizontal: 6,
    backgroundColor: colors.error,
    minWidth: 24,
  },
  unreadCounterText: { color: colors.white, textAlign: 'center' },
});
