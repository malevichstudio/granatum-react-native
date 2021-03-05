import React, { useState, useRef, useEffect } from 'react';
import {
  ScrollView,
  View,
  SafeAreaView,
  Keyboard,
  StyleSheet,
  Animated,
  Platform,
  TouchableOpacity,
} from 'react-native';
import { Text, Spinner } from 'native-base';
import { useSelector, useDispatch } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import differenceInSeconds from 'date-fns/differenceInSeconds';
import parseISO from 'date-fns/parseISO';
import isSameDay from 'date-fns/isSameDay';
import isToday from 'date-fns/isToday';

import FormatDate from 'app/components/dates/FormatDate';
import { selectUser } from 'app/containers/App/selectors';
import { selectPassing } from 'app/containers/SessionPage/selectors';
import colors from 'app/theme/variables/colors/defaultColors';
import ChatMessage from './ChatMessage';
import ChatEnterMessage from './ChatEnterMessage';
import textMessages from '../messages';
import { readMessage, getMessages } from '../actions';
import { selectIsUnreadMessages } from '../selectors';
import ArrowDown from 'app/components/icons/ArrowDown';

const ChatRoom = ({ chat }) => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const passing = useSelector(selectPassing);
  const isUnreadMessages = useSelector(selectIsUnreadMessages);
  const messages = chat && chat.messages ? chat.messages.content : [];

  const [loading, setLoading] = useState(false);
  const [isMount, setIsMount] = useState(false);
  const [isChatReady, setIsChatReady] = useState(false);
  const [lastPrevMessage, setLastPrevMessage] = useState(null);
  const [isUnreadMessage, setIsUnreadMessage] = useState(null);

  const scrollViewRef = useRef();
  const scrollViewPositionRef = useRef();
  const messagesRef = useRef({});
  const shift = useRef(new Animated.Value(0)).current;
  const scrollPositionBeforeKeyboardOpen = useRef(null);
  const scrollPositionIsBottom = useRef(false);

  // Прослушка отрытия клавиатуры
  useEffect(() => {
    const keyboardDidHideSubscribe = Keyboard.addListener(
      'keyboardDidHide',
      keyboardDidHideHandler,
    );
    const keyboardDidShowSubscribe = Keyboard.addListener(
      'keyboardDidShow',
      keyboardDidShowHandler,
    );

    return () => {
      keyboardDidHideSubscribe.remove();
      keyboardDidShowSubscribe.remove();
    };
  }, []);

  const keyboardDidShowHandler = (event) => {
    if (Platform.OS === 'ios') {
      Animated.timing(shift, {
        toValue: -event?.endCoordinates?.height,
        duration: 200,
        useNativeDriver: true,
      }).start();
    } else {
      setTimeout(() => {
        const CHAT_ENTER_MESSAGE_HEIGHT = 64;
        const diff =
          scrollViewPositionRef?.current?.contentSize?.height -
          scrollViewPositionRef?.current?.contentOffset?.y;
        const scrollToY =
          scrollViewPositionRef?.current?.contentSize?.height -
          diff +
          event?.endCoordinates?.height +
          CHAT_ENTER_MESSAGE_HEIGHT / 2;

        scrollPositionBeforeKeyboardOpen.current = Number(
          scrollViewPositionRef?.current?.contentOffset?.y.toFixed(),
        );

        scrollViewRef.current.scrollTo({
          x: 0,
          y: Number(scrollToY.toFixed()),
          animated: false,
        });
      }, 100);
    }
  };

  const keyboardDidHideHandler = () => {
    if (Platform.OS === 'ios') {
      Animated.timing(shift, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      }).start();
    } else {
      if (scrollPositionBeforeKeyboardOpen?.current) {
        scrollViewRef.current.scrollTo({
          x: 0,
          y: scrollPositionBeforeKeyboardOpen?.current,
          animated: false,
        });
      } else {
        scrollViewRef.current.scrollToEnd({ animated: false });
      }
    }
  };

  // Initial scroll to bottom & mount component
  useEffect(() => {
    if (isChatReady && !isMount) {
      if (!chat?.existNewMessages) {
        scrollToBottom();
      }
      setIsMount(true);
    } else if (messages.length === 0) {
      setIsMount(true);
    }
  }, [isChatReady]);

  // Когда происходит очистка чата
  useEffect(() => {
    if (messages?.length === 0) {
      messagesRef.current = {};
      setLastPrevMessage(null);
      setIsUnreadMessage(null);
    }
  }, [messages]);

  // Scroll to bottom after ADD/GET message
  useEffect(() => {
    // Прочитываем сообщения если они ввидны
    scrollViewRef?.current?.measure((...props) => {
      const scrollViewHeight = props[3];

      let messagesHeight = 0;
      for (let id in messagesRef?.current) {
        messagesHeight += messagesRef?.current[id]?.height;
      }

      if (scrollViewHeight >= messagesHeight) {
        scrollToBottom();
      }
    });

    // Скролим к новому полученному сообщению если мы внизу
    scrollViewRef?.current?.measure((...props) => {
      const scrollViewHeight = props[3];

      let messagesHeight = 0;
      let lastMessageY = 0;
      for (let id in messagesRef?.current) {
        messagesHeight += messagesRef?.current[id]?.height;
        if (messagesRef?.current[id]?.y > lastMessageY) {
          lastMessageY = messagesRef?.current[id]?.y;
        }
      }

      const isBottom = lastMessageY <= scrollViewHeight;

      if (!scrollPositionIsBottom.current && !isBottom) {
        return;
      }

      const currentOffset = Number(
        messagesHeight.toFixed(0) - scrollViewHeight,
      );

      if (Math.sign(currentOffset) === 1) {
        const positionIsBottom =
          scrollViewHeight + currentOffset ===
          Number(messagesHeight.toFixed(0));

        if (!loading && isMount && positionIsBottom) {
          scrollToBottom();
        }
      }
    });
  }, [messages]);

  // Add new message indicator
  useEffect(() => {
    if (chat?.existNewMessages && !positionIsBottom()) {
      const count = messages.reduce((accumulator, currentValue) => {
        if (currentValue?.unread) {
          return accumulator + 1;
        }
        return accumulator;
      }, 0);

      if (count > 0) {
        setIsUnreadMessage(count);
      }
    } else if (!chat?.existNewMessages) {
      if (isUnreadMessage !== null) {
        setIsUnreadMessage(null);
      }
    }
  }, [messages]);

  // When chat is first time opened - scroll to first unreaded message
  useEffect(() => {
    if (isChatReady && chat?.existNewMessages && !isMount) {
      scrollToUnreadMessage();
    }
  }, [isChatReady]);

  // After receiving prev messages scroll to last message
  useEffect(() => {
    if (isChatReady && lastPrevMessage?.id) {
      const lastMessage = messagesRef.current[lastPrevMessage.id];

      if (lastMessage) {
        scrollViewRef.current.scrollTo({
          x: 0,
          y: lastMessage.y + lastMessage.height,
          animated: false,
        });
      }
    }
  }, [lastPrevMessage, isChatReady]);

  function scrollToUnreadMessage() {
    const unreadMessages = [];

    messages?.forEach((message) => {
      if (message?.unread) {
        unreadMessages.push({
          ...messagesRef.current[message?.id],
          id: message?.id,
        });
      }
    });

    const firstUnreadedMessageY = Math.min(...unreadMessages.map((el) => el.y));

    const firstUnreadMessage = unreadMessages.find(
      (el) => el.y === firstUnreadedMessageY,
    );

    scrollViewRef?.current?.measure((...props) => {
      const scrollViewHeight = props[3];

      if (unreadMessages?.length > 1) {
        const lastUnreadedMessageY = Math.max(
          ...unreadMessages.map((el) => el.y),
        );
        const lastUnreadedMessage = unreadMessages.find(
          (el) => el?.y === lastUnreadedMessageY,
        );

        scrollViewRef.current.scrollTo({
          x: 0,
          y:
            firstUnreadMessage.y + firstUnreadMessage.height - scrollViewHeight,
          animated: scrollToUnreadMessage ? true : false,
        });
        if (
          lastUnreadedMessage?.y + lastUnreadedMessage?.height <
          scrollViewHeight
        ) {
          readMessageById(lastUnreadedMessage?.id);
        } else {
          readMessageById(firstUnreadMessage?.id);
        }
      } else {
        scrollToBottom();
      }
    });
  }

  // Scroll to bottom & read all message
  function scrollToBottom() {
    scrollViewRef.current.scrollToEnd({ animated: false });
    readAllMessages();
    scrollPositionBeforeKeyboardOpen.current = null;
  }

  // Get prev/next messages & update REF position & read visible messages
  function onScroll({ nativeEvent }) {
    scrollViewPositionRef.current = nativeEvent;
    if (lastPrevMessage) {
      setLastPrevMessage(null);
    }

    // Read visible messages
    const currentPosition =
      nativeEvent?.contentOffset?.y + nativeEvent?.layoutMeasurement?.height;

    if (
      Number(nativeEvent?.contentSize?.height).toFixed(0) ===
      Number(currentPosition).toFixed(0)
    ) {
      scrollPositionIsBottom.current = true;
      readAllMessages();
    } else {
      scrollPositionIsBottom.current = false;
      const unreadMessages = [];

      for (let id in messagesRef.current) {
        if (messagesRef.current[id]?.unread) {
          if (
            currentPosition >=
            messagesRef.current[id].y + messagesRef.current[id].height
          ) {
            unreadMessages.push({ ...messagesRef.current[id], id });
          }
        }
      }

      const lastUnreadedMessageY = Math.max(
        ...unreadMessages.map((el) => el.y),
      );
      const lastUnreadedMessage = unreadMessages.find(
        (el) => el?.y === lastUnreadedMessageY,
      );

      if (lastUnreadedMessage?.id) {
        readMessageById(lastUnreadedMessage?.id);
      }
    }

    // Get prev/next messages
    if (messages?.length !== 0 && !loading) {
      if (chat.messages.hasPrevious && nativeEvent?.contentOffset?.y === 0) {
        setLoading(true);
        dispatch(
          getMessages({
            chatId: chat.id,
            chatType: chat.type,
            lastMessageId: messages[0].id,
            direction: 'PREV',
          }),
        ).then((result) => {
          setLoading(false);
          setLastPrevMessage(
            result?.data?.content[result?.data?.content?.length - 1],
          );
        });
      } else if (chat.messages.hasNext && positionIsBottom()) {
        setLoading(true);
        dispatch(
          getMessages({
            chatId: chat.id,
            chatType: chat.type,
            lastMessageId: messages[messages.length - 1].id,
            direction: 'NEXT',
          }),
        ).then((result) => {
          setLoading(false);
          setTimeout(() => {
            const firstNextMessage = result?.data?.content[0];
            const position = messagesRef.current[firstNextMessage?.id];

            let lastMessageFromPrevY = 0;
            for (let id in messagesRef.current) {
              if (messagesRef.current[id]?.y > lastMessageFromPrevY) {
                lastMessageFromPrevY = messagesRef.current[id]?.y;
              }
            }

            scrollViewRef?.current?.measure((...props) => {
              const scrollViewHeight = props[3];

              scrollViewRef.current.scrollTo({
                x: 0,
                y: position?.y - scrollViewHeight + position?.height,
                animated: false,
              });
            });
          }, 200);
        });
      }
    }
  }

  function readMessageById(id) {
    if (id && isUnreadMessages) {
      return dispatch(
        readMessage({
          id,
          chatId: chat.id,
        }),
      );
    }
  }

  function readAllMessages() {
    const unreadMessages = [];

    for (let prop in messagesRef.current) {
      if (messagesRef.current[prop]?.unread) {
        unreadMessages.push({ ...messagesRef.current[prop], id: prop });
      }
    }

    const lastUnreadedMessageY = Math.max(...unreadMessages.map((el) => el.y));
    const lastUnreadedMessage = unreadMessages.find(
      (el) => el?.y === lastUnreadedMessageY,
    );

    readMessageById(lastUnreadedMessage?.id);

    if (isUnreadMessage !== null) {
      setIsUnreadMessage(null);
    }
  }

  function onLayoutMessage(event, item) {
    if (isChatReady) {
      setIsChatReady(false);
    }

    messagesRef.current[item.id] = {
      ...event?.nativeEvent?.layout,
      unread: item?.unread,
    };
    if (Object.keys(messagesRef.current)?.length === messages?.length) {
      setIsChatReady(true);
    }
  }

  function positionIsBottom() {
    const currentHeight = Number(
      scrollViewPositionRef?.current?.layoutMeasurement?.height?.toFixed(0),
    );
    const currentOffset = Number(
      scrollViewPositionRef?.current?.contentOffset?.y?.toFixed(0),
    );
    const fullHeight = Number(
      scrollViewPositionRef?.current?.contentSize?.height?.toFixed(0),
    );

    return currentHeight + currentOffset === fullHeight;
  }

  function isGroupMessage(index1, index2) {
    if (!messages[index1] || !messages[index2]) {
      return false;
    }

    return (
      differenceInSeconds(
        parseISO(messages[Math.max(index1, index2)].createdDate),
        parseISO(messages[Math.min(index1, index2)].createdDate),
      ) < 60 && messages[index1].accountId === messages[index2].accountId
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Animated.View
        style={[styles.wrapper, { transform: [{ translateY: shift }] }]}>
        {!isMount && (
          <View style={styles.overlay}>
            <Spinner color={colors.primary} />
          </View>
        )}
        <ScrollView
          ref={scrollViewRef}
          scrollEventThrottle={0}
          onScroll={onScroll}
          onScrollEndDrag={onScroll}
          style={styles.list}>
          {messages?.map((item, index) => (
            <View
              key={item.id}
              onLayout={(event) => onLayoutMessage(event, item)}>
              <DateSeparator messages={messages} index={index} />
              {!positionIsBottom() && (
                <HasNewMessage messages={messages} index={index} />
              )}
              <ChatMessage
                message={item}
                isSelfMessage={item.accountId === user.id}
                isGroup={isGroupMessage(index, index + 1)}
                showAuthor={!isGroupMessage(index - 1, index)}
                showAvatar={!isGroupMessage(index + 1, index)}
                isPersonalChat={chat?.type === 'PERSONAL'}
              />
            </View>
          ))}
        </ScrollView>
        {!passing && (
          <ChatEnterMessage chatId={chat?.id} sendHandler={scrollToBottom} />
        )}
        {isUnreadMessage && (
          <UnreadMessageIndicator
            count={isUnreadMessage}
            onPress={scrollToUnreadMessage}
          />
        )}
      </Animated.View>
    </SafeAreaView>
  );
};

export default ChatRoom;

const DateSeparator = ({ messages, index }) => {
  if (
    !messages[index - 1] ||
    !isSameDay(
      parseISO(messages[index].createdDate),
      parseISO(messages[index - 1].createdDate),
    )
  ) {
    return (
      <Text uppercase lightGray style={styles.dateSeparator} variantCaption>
        {isToday(parseISO(messages[index].createdDate)) ? (
          <FormattedMessage {...textMessages.today} />
        ) : (
          <FormatDate
            date={messages[index].createdDate}
            format="dd MMMM yyyy"
          />
        )}
      </Text>
    );
  }

  return null;
};

const HasNewMessage = ({ messages, index }) => {
  if (
    messages[index].unread &&
    (!messages[index - 1] || !messages[index - 1].unread)
  ) {
    return (
      <Text uppercase lightGray style={styles.dateSeparator} variantCaption>
        <FormattedMessage {...textMessages.newMessages} />
      </Text>
    );
  }
  return null;
};

const UnreadMessageIndicator = ({ count, onPress }) => {
  return (
    <TouchableOpacity style={styles.indicator} onPress={onPress}>
      <View style={styles.indicatorDot}>
        <Text semiBold alignCenter light style={styles.indicatorCount}>
          {count}
        </Text>
      </View>
      <ArrowDown style={styles.indicatorArrow} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
    flex: 1,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: 1000,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  list: {
    backgroundColor: colors.mainL6,
    paddingHorizontal: 16,
    flex: 1,
  },
  dateSeparator: {
    textAlign: 'center',
    margin: 4,
  },
  indicator: {
    position: 'absolute',
    right: 10,
    bottom: 80,
    zIndex: 10,
    width: 40,
    height: 40,
    backgroundColor: colors.white,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D3D4DD',
  },
  indicatorDot: {
    position: 'absolute',
    right: 11,
    top: -7,
    height: 16,
    borderRadius: 16 / 2,
    backgroundColor: colors.error,
    paddingHorizontal: 5,
  },
  indicatorCount: {
    fontSize: 12,
    position: 'relative',
    top: -1,
  },
  indicatorArrow: {
    position: 'relative',
    bottom: -2,
  },
});
