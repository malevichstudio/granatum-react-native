import React from 'react';
import { useSelector } from 'react-redux';

import { selectCurrentTeamChat } from '../selectors';
import ChatRoom from './ChatRoom';

const TeamChat = () => {
  const chat = useSelector(selectCurrentTeamChat);

  if (chat && chat.id) return <ChatRoom chat={chat} />;
  return null;
};

export default TeamChat;
