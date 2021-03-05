import React, { useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { Thumbnail, Text } from 'native-base';

import AdminStar from 'app/components/icons/AdminStar';
import colors from 'app/theme/variables/colors/defaultColors';
import { getInitials } from 'app/utils/strings';

const Avatar = ({ uri, name, color, isAdmin }) => {
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
      {/* <View style={styles.status(isOnline)} /> */}
    </View>
  );
};

export default Avatar;

const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
    marginRight: 8,
  },
  thumbnail: {
    top: -6,
    width: 40,
    height: 40,
  },
  status: (isOnline) => ({
    position: 'absolute',
    bottom: 4,
    right: 0,
    zIndex: 1,
    width: 12,
    height: 12,
    borderRadius: 12 / 2,
    backgroundColor: !isOnline ? colors.success : colors.mainL4,
    borderColor: colors.mainL6,
    borderWidth: 2,
  }),
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
