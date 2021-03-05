import React from 'react';
import {
  Header as BaseHeader,
  Left,
  Button,
  Body,
  Title,
  Right,
} from 'native-base';
import { FormattedMessage } from 'react-intl';

import ChevronLeftIcon from 'app/components/icons/ChevronLeftIcon';
import variables from 'app/theme/variables/defaultTheme';
import messages from '../../messages';
import Menu from '../../../FreeBroadcasting/components/Header/Menu';

const Header = ({ handleCloseChat }) => {
  return (
    <BaseHeader>
      <Left style={{ flex: 1 }}>
        <Button transparent onPress={handleCloseChat}>
          <ChevronLeftIcon color={variables.textDark} />
        </Button>
      </Left>
      <Body style={{ flex: 1 }}>
        <Title screenTitle>
          <FormattedMessage {...messages.chatTitle} />
        </Title>
      </Body>
      <Right style={{ flex: 1 }}>
        <Menu isChat />
      </Right>
    </BaseHeader>
  );
};

export default Header;
