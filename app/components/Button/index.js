import React from 'react';
import PropTypes from 'prop-types';
import { Text, Button as NBButton, Spinner } from 'native-base';

import colors from 'app/theme/variables/colors/defaultColors';
import { buttonText } from 'app/styles/buttons';

const Button = ({
  loading = false,
  styles = null,
  buttonTextStyles = null,
  children,
  ...rest
}) => {
  if (loading) {
    delete rest?.disabled;
  }

  const textColor = () => {
    if (rest.textPrimary) {
      return colors.primary;
    }
    if (rest.textSecondary) {
      return colors.textGray;
    }
    return null;
  };

  return (
    <NBButton style={styles} disabled={loading} {...rest}>
      <Text style={[buttonTextStyles, buttonText(textColor())]} semiBold>
        {children}
      </Text>
      {loading && <Spinner size="large" color={colors.primary} />}
    </NBButton>
  );
};

export default Button;

Button.propTypes = {
  loading: PropTypes.bool,
  styles: PropTypes.object,
  buttonTextStyles: PropTypes.object,
};
