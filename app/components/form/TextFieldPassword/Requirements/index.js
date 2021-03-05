import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Text } from 'native-base';
import { FormattedMessage } from 'react-intl';

import SmartIcon from './SmartIcon';
import messages from './messages';

const Requirements = ({
  latinLettersIconName,
  oneNumberIconName,
  specialSymbolIconName,
  passwordLengthIconName,
  requirementsPositionIsBottom,
}) => {
  return (
    <View
      style={[
        styles.wrapper,
        requirementsPositionIsBottom && styles.wrapperBottom,
      ]}>
      <Text variantSubtitle2>
        <FormattedMessage {...messages.passwordRequirement} />
      </Text>
      <View style={styles.item}>
        <SmartIcon iconName={latinLettersIconName} />
        <Text style={styles.text}>
          <FormattedMessage {...messages.latinLetters} />
        </Text>
      </View>
      <View style={styles.item}>
        <SmartIcon iconName={oneNumberIconName} />
        <Text style={styles.text}>
          <FormattedMessage {...messages.oneNumber} />
        </Text>
      </View>
      <View style={styles.item}>
        <SmartIcon iconName={specialSymbolIconName} />
        <Text style={styles.text}>
          <FormattedMessage {...messages.specialSymbol} />
          {" !#$%&‘*+-/=?^`_{}|~(),.:;<>@[]'"}
        </Text>
      </View>
      <View style={styles.item}>
        <SmartIcon iconName={passwordLengthIconName} />
        <Text style={styles.text}>
          <FormattedMessage {...messages.passwordLength} />
        </Text>
      </View>
      {!requirementsPositionIsBottom && <View style={styles.triangle} />}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    bottom: '100%',
    zIndex: 10,
    backgroundColor: '#fff',
    padding: 16,
    left: 4,
    width: Dimensions.get('window').width - 58,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  wrapperBottom: {
    bottom: 'auto',
    top: 80,
  },
  triangle: {
    position: 'absolute',
    bottom: -12,
    left: 15,
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderTopWidth: 12,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 0,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  text: {
    marginLeft: 8,
    fontSize: 12,
  },
});

export default Requirements;
