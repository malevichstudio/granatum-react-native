import React from 'react';
import {
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Text } from 'native-base';
import { View } from 'react-native';
import { Backdrop } from 'react-native-backdrop';
import { useSelector } from 'react-redux';

import { swipeLine } from 'app/styles/buttons';
import colors from 'app/theme/variables/colors/defaultColors';
import { VIDEO_CHAT_HEIGHT, CLOSED_VIDEO_CHAT_HEIGHT } from '../constants';
import { selectIsVideoChatOpen } from '../selectors';
import Avatar from './Avatar';

const PeersList = ({ handleClose, visible, peers }) => {
  const isVideoChatOpen = useSelector(selectIsVideoChatOpen);
  const contentHeight = peers?.length * 56 + 40;
  const properlyHeight =
    Dimensions.get('window').height -
    ((isVideoChatOpen ? VIDEO_CHAT_HEIGHT : CLOSED_VIDEO_CHAT_HEIGHT) + 30);
  const height =
    contentHeight < properlyHeight ? contentHeight : properlyHeight;

  const ListHeader = () => {
    return (
      <View style={styles.headerWrap}>
        <View style={styles.header}>
          <View style={swipeLine(colors.textGray)} />
        </View>
      </View>
    );
  };

  // Оставил TouchableOpacity врапером потому что с View лаги или вообще не скролит
  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.item} activeOpacity={1}>
      <Avatar
        uri={item?.settings?.avatar}
        name={item?.displayName}
        color={item?.settings?.color}
        isAdmin={item?.settings?.isAdmin}
      />
      <Text semiBold ellipsizeMode="tail" numberOfLines={1}>
        {item?.displayName}
      </Text>
    </TouchableOpacity>
  );

  return (
    <Backdrop
      visible={visible}
      closedHeight={0}
      handleClose={handleClose}
      onClose={() => {}}
      swipeConfig={{
        velocityThreshold: 0.3,
        directionalOffsetThreshold: 80,
      }}
      animationConfig={{
        speed: 14,
        bounciness: 4,
      }}
      overlayColor="rgba(0,0,0,0.10)"
      containerStyle={styles.container}>
      <View style={styles.content(height)}>
        <FlatList
          stickyHeaderIndices={[0]}
          ListHeaderComponent={<ListHeader />}
          data={peers}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>
    </Backdrop>
  );
};

const styles = StyleSheet.create({
  container: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: '#fff',
  },
  content: (height) => ({
    height,
  }),
  header: {
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  headerWrap: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    backgroundColor: '#fff',
  },
  item: {
    flexDirection: 'row',
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
});

export default PeersList;
