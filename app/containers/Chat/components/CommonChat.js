import React from 'react';
import { useSelector } from 'react-redux';

import { selectCommonChat } from '../selectors';
import ChatRoom from './ChatRoom';

const CommonChat = () => {
  const chat = useSelector(selectCommonChat);

  if (chat && chat.id) return <ChatRoom chat={chat} />;
  return null;
};

export default CommonChat;
