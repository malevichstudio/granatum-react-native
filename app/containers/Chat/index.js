import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { View, StyleSheet } from 'react-native';
import { Tab, Tabs, TabHeading } from 'native-base';

import colors from 'app/theme/variables/colors/defaultColors';
import {
  selectSession,
  selectActiveSheetType,
  selectUserIsUnassigned,
} from 'app/containers/SessionPage/selectors';
import {
  selectCommonChatIsUnreadMessages,
  selectPersonalChatsIsUnreadMessages,
  selectCommandChatsIsUnreadMessages,
} from './selectors';
import { SESSION_TYPE_SELF_STUDY, SHEET_TYPE_TEAM } from '../../constants';

import CommonChat from './components/CommonChat';
import PersonalChat from './components/PersonalChat';
import TeamChat from './components/TeamChat';

import IndividualIcon from 'app/components/icons/IndividualIcon';
import CollectiveIcon from 'app/components/icons/CollectiveIcon';
import GroupAltIcon from 'app/components/icons/GroupAltIcon';

function Chat() {
  const session = useSelector(selectSession);
  const commonChatIsUnreadMessages = useSelector(
    selectCommonChatIsUnreadMessages,
  );
  const personalChatsIsUnreadMessages = useSelector(
    selectPersonalChatsIsUnreadMessages,
  );
  const commandChatsIsUnreadMessages = useSelector(
    selectCommandChatsIsUnreadMessages,
  );
  const sheetType = useSelector(selectActiveSheetType);
  const userIsUnassigned = useSelector(selectUserIsUnassigned);

  const [value, setValue] = useState(
    session.sessionType !== SESSION_TYPE_SELF_STUDY ? 0 : 2,
  );

  const TABS = [
    {
      isVisible: session.sessionType !== SESSION_TYPE_SELF_STUDY,
      hasUnreadMessage: commonChatIsUnreadMessages,
      icon: (color) => <CollectiveIcon fill={color} />,
      chat: <CommonChat />,
    },
    {
      isVisible: sheetType === SHEET_TYPE_TEAM && !userIsUnassigned,
      hasUnreadMessage: commandChatsIsUnreadMessages,
      icon: (color) => <GroupAltIcon fill={color} />,
      chat: <TeamChat />,
    },
    {
      isVisible: true,
      hasUnreadMessage: personalChatsIsUnreadMessages,
      icon: (color) => <IndividualIcon fill={color} />,
      chat: <PersonalChat />,
    },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <Tabs
        page={value}
        tabBarUnderlineStyle={{ backgroundColor: '#3294E6' }}
        onChangeTab={({ i }) => setValue(i)}>
        {TABS.filter((tab) => tab.isVisible).map((tab, index) => (
          <Tab
            key={index}
            heading={
              <TabHeading style={styles.tab}>
                {tab.hasUnreadMessage && <View style={styles.indicator} />}
                {tab.icon(index === value ? colors.textDark : colors.textL2)}
              </TabHeading>
            }>
            {tab.chat}
          </Tab>
        ))}
      </Tabs>
    </View>
  );
}

export default Chat;

const styles = StyleSheet.create({
  tab: {
    position: 'relative',
    backgroundColor: colors.white,
  },
  indicator: {
    position: 'absolute',
    right: '50%',
    top: 12,
    marginRight: -10,
    zIndex: 5,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.error,
  },
});
