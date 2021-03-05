import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container,
  Text,
  Content,
  List,
  ListItem,
  Left,
  Right,
} from 'native-base';
import { StyleSheet } from 'react-native';
import { FormattedMessage } from 'react-intl';
import { changeLang } from '../App/actions';
import { selectUserLang } from '../App/selectors';
import Radio from 'app/components/form/Radio';
import { DEFAULT_LOCALE } from 'app/i18n';
import messages from './messages';

const LanguagePage = () => {
  const dispatch = useDispatch();
  const userLang = useSelector(selectUserLang);

  const handleChangeLang = (lang) => () => {
    dispatch(changeLang(lang));
  };

  function getLangName() {
    if (DEFAULT_LOCALE === 'ru') return ' (русский)';
    if (DEFAULT_LOCALE === 'en') return ' (english)';
    if (DEFAULT_LOCALE === 'hu') return ' (תיִרְבִע)';
  }

  const isSelected = (lang) => userLang === lang;

  return (
    <Container>
      <Content>
        <List>
          <ListItem onPress={handleChangeLang(null)}>
            <Left>
              <Text variantBody1>
                <FormattedMessage {...messages.auto} />
                {!userLang ? (
                  <Text variantBody1 style={styles.lang}>
                    {getLangName()}
                  </Text>
                ) : null}
              </Text>
            </Left>
            <Right>
              <Radio selected={!userLang} />
            </Right>
          </ListItem>
          <ListItem onPress={handleChangeLang('ru')}>
            <Left>
              <Text variantBody1>Русский</Text>
            </Left>
            <Right>
              <Radio selected={isSelected('ru')} />
            </Right>
          </ListItem>
          <ListItem onPress={handleChangeLang('en')}>
            <Left>
              <Text variantBody1>English</Text>
            </Left>
            <Right>
              <Radio selected={isSelected('en')} />
            </Right>
          </ListItem>
          {/* <ListItem onPress={handleChangeLang('hu')}>
            <Left>
              <Text variantBody1>תיִרְבִע</Text>
            </Left>
            <Right>
              <Radio selected={isSelected('hu')} />
            </Right>
          </ListItem> */}
        </List>
      </Content>
    </Container>
  );
};

export default LanguagePage;

const styles = StyleSheet.create({
  lang: {
    color: '#7D7F8C',
  },
});
