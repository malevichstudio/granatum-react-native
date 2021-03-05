import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import { Thumbnail, Text } from 'native-base';

import AdminStar from 'app/components/icons/AdminStar';
import colors from 'app/theme/variables/colors/defaultColors';
import { getInitials } from 'app/utils/strings';

const Avatar = ({
  uri = null,
  name,
  color = null,
  isAdmin = false,
  isOnline = false,
}) => {
  const initials = useMemo(() => getInitials(name), [name]);

  return (
    <View style={styles.wrapper}>
      {isAdmin && <AdminStar style={styles.admin} />}
      {uri ? (
        <Thumbnail style={styles.thumbnail} source={{ uri }} />
      ) : (
        <View style={styles.initials(color)}>
          <Text semiBold style={{ color: '#fff' }}>
            {initials}
          </Text>
        </View>
      )}
      {isOnline && <View style={styles.onlineIndicator} />}
    </View>
  );
};

Avatar.propTypes = {
  uri: PropTypes.string,
  name: PropTypes.string.isRequired,
  isOnline: PropTypes.bool,
  isAdmin: PropTypes.bool,
};

export default Avatar;

const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
    marginRight: 16,
  },
  thumbnail: {
    top: -6,
    width: 40,
    height: 40,
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 4,
    right: 0,
    zIndex: 1,
    width: 12,
    height: 12,
    borderRadius: 12 / 2,
    backgroundColor: colors.success,
    borderColor: colors.mainL6,
    borderWidth: 2,
  },
  admin: {
    position: 'absolute',
    top: -12,
    left: -3,
    zIndex: 1,
  },
  initials: (color) => ({
    top: -6,
    width: 40,
    height: 40,
    borderRadius: 40 / 2,
    backgroundColor: color || '#5C6484',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  }),
});
