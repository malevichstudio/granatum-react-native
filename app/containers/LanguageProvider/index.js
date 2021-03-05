/*
 *
 * LanguageProvider
 *
 * this component connects the redux state language locale to the
 * IntlProvider component and i18n messages (loaded from `app/translations`)
 */

import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { IntlProvider } from 'react-intl';

import { translationMessages } from '../../i18n';
import { selectUserLanguage } from '../App/selectors';

export default function LanguageProvider(props) {
  const lang = useSelector(selectUserLanguage);

  return (
    <IntlProvider locale={lang} key={lang} messages={translationMessages[lang]}>
      {React.Children.only(props.children)}
    </IntlProvider>
  );
}

LanguageProvider.propTypes = {
  messages: PropTypes.object,
  children: PropTypes.element.isRequired,
};
