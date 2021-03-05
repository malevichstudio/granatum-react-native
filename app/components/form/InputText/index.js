import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useIntl } from 'react-intl';
import { Item, Input, Text, Label } from 'native-base';
import colors from 'app/theme/variables/colors/defaultColors';

const InputText = ({ onAdornmentPress, onChangeText, ...props }) => {
  const intl = useIntl();
  const [focused, setFocused] = useState(false);
  const [isTouched, setIsTouched] = useState(false);

  function handleFocus() {
    setFocused(true);
  }
  function handleBlur() {
    setFocused(false);
  }

  const isEmptyField = !focused && !props.value;
  const hasError = props.error && isTouched && !focused;

  return (
    <View>
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
                props.disabled && styles.disabled,
              ]}>
              {props.label}
            </Label>
          )}
          <Input
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChangeText={(value) => {
              onChangeText(value);
              if (!isTouched) {
                setIsTouched(true);
              }
            }}
            style={props.disabled && styles.disabled}
            {...props}
          />
        </Item>
      </View>
      {hasError && (
        <View>
          <Text error variantCaption>
            {intl.formatMessage({ id: props.error })}
          </Text>
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
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
  disabled: { opacity: 0.3 },
});
export default InputText;
