import React from 'react';
import { Thumbnail, Text } from 'native-base';
import { StyleSheet, View } from 'react-native';
import getInitials from '../../utils/strings/getInitials';

export default function Avatar({
  avatar,
  name = '',
  color = 'green',
  size = 80,
  borderRadius = 50,
}) {
  const initials = React.useMemo(() => getInitials(name), [name]);
  return (
    <>
      {avatar ? (
        <Thumbnail
          style={styles.image(size, borderRadius)}
          source={{
            uri: avatar,
          }}
        />
      ) : (
        <View style={styles.ava(size, color, borderRadius)}>
          <Text style={styles.initials}>{initials}</Text>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  image: (size, borderRadius) => ({
    height: size,
    width: size,
    borderRadius,
  }),
  ava: (size, color, borderRadius) => ({
    height: size,
    width: size,
    borderRadius,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: color,
  }),
  initials: {
    color: '#fff',
    fontSize: 20,
  },
});
