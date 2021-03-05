import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useIntl } from 'react-intl';
import { Item, Input, Text, Label, Button } from 'native-base';
import VisibilityIcon from '../../icons/VisibilityIcon';
import VisibilityOffIcon from '../../icons/VisibilityOffIcon';
import variables from 'app/theme/variables/defaultTheme';
import Requirements from './Requirements';
import {
  checkLatinLetters,
  checkOneNumber,
  checkSpecialSymbol,
  checkPasswordLength,
} from 'app/utils/validation';
import colors from '../../../theme/variables/colors/defaultColors';

const EMPTY_ICON_NAME = 'empty';
const SUCCESS_ICON_NAME = 'success';
const ERROR_ICON_NAME = 'error';

const TextFieldPassword = ({
  showPassword,
  onAdornmentPress,
  withRequirements,
  requirementsPositionIsBottom,
  onChangeText,
  ...props
}) => {
  const intl = useIntl();
  const [focused, setFocused] = useState(false);
  const [isTouched, setIsTouched] = useState(false);
  const [showRequirements, setShowRequirements] = useState(false);

  const [latinLettersIconName, setLatinLettersIconName] = useState(
    EMPTY_ICON_NAME,
  );
  const [oneNumberIconName, setOneNumberIconName] = useState(EMPTY_ICON_NAME);
  const [specialSymbolIconName, setSpecialSymbolIconName] = useState(
    EMPTY_ICON_NAME,
  );
  const [passwordLengthIconName, setPasswordLengthIconName] = useState(
    EMPTY_ICON_NAME,
  );

  function validate(value) {
    setLatinLettersIconName(
      checkLatinLetters(value) ? SUCCESS_ICON_NAME : EMPTY_ICON_NAME,
    );
    setOneNumberIconName(
      checkOneNumber(value) ? SUCCESS_ICON_NAME : EMPTY_ICON_NAME,
    );
    setSpecialSymbolIconName(
      checkSpecialSymbol(value) ? SUCCESS_ICON_NAME : EMPTY_ICON_NAME,
    );
    setPasswordLengthIconName(
      checkPasswordLength(value) ? SUCCESS_ICON_NAME : EMPTY_ICON_NAME,
    );
  }

  function handleFocus() {
    setFocused(true);
    withRequirements && setShowRequirements(true);
  }

  function handleBlur() {
    setLatinLettersIconName(
      checkLatinLetters(props.value) ? SUCCESS_ICON_NAME : ERROR_ICON_NAME,
    );
    setOneNumberIconName(
      checkOneNumber(props.value) ? SUCCESS_ICON_NAME : ERROR_ICON_NAME,
    );
    setSpecialSymbolIconName(
      checkSpecialSymbol(props.value) ? SUCCESS_ICON_NAME : ERROR_ICON_NAME,
    );
    setPasswordLengthIconName(
      checkPasswordLength(props.value) ? SUCCESS_ICON_NAME : ERROR_ICON_NAME,
    );

    setFocused(false);
    withRequirements && setShowRequirements(false);
  }

  const isEmptyField = !focused && !props.value;
  const hasError = props.error && isTouched && !focused;

  return (
    <View style={styles.wrapper(focused)}>
      <View>
        <Item
          authField
          focused={focused}
          error={hasError}
          last={props.last}
          floatingLabel={props.floatingLabel}>
          {props.label && (
            <Label
              focused={focused}
              error={Boolean(hasError)}
              style={[
                isEmptyField ? styles.labelEmpty : styles.label,
                hasError && styles.labelWithError,
                !focused &&
                  hasError &&
                  props.value &&
                  styles.labelErrorWithValue,
              ]}>
              {props.label}
            </Label>
          )}
          <Input
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChangeText={(value) => {
              onChangeText(value);
              validate(value);
              if (!isTouched) {
                setIsTouched(true);
              }
            }}
            textContentType="oneTimeCode"
            {...props}
          />
        </Item>
        <View style={styles.visibility}>
          <Button onPress={onAdornmentPress} style={styles.visibilityButton}>
            {showPassword ? (
              <VisibilityIcon color={variables.textDark} />
            ) : (
              <VisibilityOffIcon color={variables.textL1} />
            )}
          </Button>
        </View>
      </View>
      {hasError && (
        <View>
          <Text error variantCaption>
            {intl.formatMessage({ id: props.error })}
          </Text>
        </View>
      )}
      {withRequirements && showRequirements && (
        <Requirements
          latinLettersIconName={latinLettersIconName}
          oneNumberIconName={oneNumberIconName}
          specialSymbolIconName={specialSymbolIconName}
          passwordLengthIconName={passwordLengthIconName}
          requirementsPositionIsBottom={requirementsPositionIsBottom}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: (focused) => ({
    zIndex: focused ? 11 : 10,
  }),
  labelEmpty: {
    top: -8,
    paddingTop: 5,
    fontSize: 17,
    color: colors.textGray,
  },
  label: {
    fontSize: 12,
  },
  labelWithError: {
    top: -12,
  },
  labelErrorWithValue: {
    top: 5,
  },
  visibility: {
    position: 'absolute',
    top: 16,
    right: 16,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  visibilityButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    borderRadius: 50,
    margin: 'auto',
    backgroundColor: 'transparent',
    // убираем тень на android
    elevation: 0,
    // убираем тень на ios
    shadowColor: null,
    shadowOffset: null,
    shadowRadius: null,
    shadowOpacity: null,
  },
});

export default TextFieldPassword;
