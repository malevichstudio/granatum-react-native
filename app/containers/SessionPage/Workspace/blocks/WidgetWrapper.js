import React from 'react';
import { View } from 'react-native';

const WidgetWrapper = ({ children, ...rest }) => {
  return <View {...rest}>{children}</View>;
};

export default WidgetWrapper;
