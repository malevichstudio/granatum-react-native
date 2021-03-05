import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { FormattedMessage } from 'react-intl';
import {
  Container,
  Text,
  Content,
  List,
  ListItem,
  Left,
  Right,
  Switch,
} from 'native-base';
import ArrowRight from '../../components/icons/ArrowRight';
import EarthIcon from '../../components/icons/EarthIcon';
import NotificationIcon from '../../components/icons/NotificationIcon';
import messages from './messages';
import colors from 'app/theme/variables/colors/defaultColors';

const AppSettingsPage = ({ navigation }) => {
  const [checked, setChecked] = useState(false);

  function handleChange() {
    setChecked((prev) => !prev);
  }

  return (
    <Container>
      <Content>
        <List>
          <ListItem onPress={() => navigation.navigate('LanguagePage')}>
            <Left>
              <EarthIcon fill="#2E303D" style={styles.icon} />
              <Text variantBody1>
                <FormattedMessage {...messages.language} />
              </Text>
            </Left>
            <Right>
              <ArrowRight fill="#A9ABB7" />
            </Right>
          </ListItem>
          <ListItem>
            <Left>
              <NotificationIcon fill="#2E303D" style={styles.icon} />
              <Text variantBody1>
                <FormattedMessage {...messages.notification} />
              </Text>
            </Left>
            <Right>
              <Switch
                value={checked}
                onValueChange={handleChange}
                trackColor={{ false: colors.mainL5, true: colors.primary }}
                thumbColor={'#fff'}
                ios_backgroundColor={colors.mainL5}
              />
            </Right>
          </ListItem>
        </List>
      </Content>
    </Container>
  );
};

const styles = StyleSheet.create({
  icon: {
    marginRight: 20,
  },
});

export default AppSettingsPage;
