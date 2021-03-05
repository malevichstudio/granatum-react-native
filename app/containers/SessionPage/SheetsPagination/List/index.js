import React from 'react';
import {
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { FormattedMessage } from 'react-intl';
import { Text } from 'native-base';
import { View } from 'react-native';
import { Backdrop } from 'react-native-backdrop';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import variables from 'app/theme/variables/defaultTheme';
import { SHEET_TYPE_PERSONAL, SHEET_TYPE_TEAM } from '../../../../constants';
import GroupAltIcon from '../../../../components/icons/GroupAltIcon';
import IndividualIcon from '../../../../components/icons/IndividualIcon';
import { VIDEO_CHAT_HEIGHT, CLOSED_VIDEO_CHAT_HEIGHT } from '../../constants';
import { selectIsVideoChatOpen } from '../../selectors';
import messages from '../../messages';

const List = ({
  handleOpen,
  handleClose,
  visible,
  sheets,
  activeSheetIndex,
}) => {
  const navigation = useNavigation();
  const isVideoChatOpen = useSelector(selectIsVideoChatOpen);
  const contentHeight = sheets?.length * 37 + 90;
  const properlyHeight =
    Dimensions.get('window').height -
    ((isVideoChatOpen ? VIDEO_CHAT_HEIGHT : CLOSED_VIDEO_CHAT_HEIGHT) + 30);
  const height =
    contentHeight < properlyHeight ? contentHeight : properlyHeight;

  const handleOnPress = (sessionId, sheetId) => () => {
    handleClose();
    navigation.navigate('Session', {
      sessionId,
      sheetId,
    });
  };

  const ListHeader = () => {
    return (
      <View style={styles.headerWrap}>
        <View style={styles.header}>
          <View style={styles.headerLine} />
        </View>
        <View style={styles.headerTitle}>
          <Text variantSubtitle1>
            <FormattedMessage {...messages.listsOfSessions} />
          </Text>
        </View>
      </View>
    );
  };

  const renderItem = ({ item, index }) => (
    <TouchableOpacity
      onPress={handleOnPress(item.sessionId, item.id)}
      style={[styles.item, activeSheetIndex === index && styles.itemActive]}>
      <View
        style={[
          styles.itemContent,
          activeSheetIndex === index && styles.itemContentActive,
        ]}>
        <Text variantSubtitle2 style={styles.itemTextIndex}>
          {index + 1}
        </Text>
        <Text
          variantBody2
          ellipsizeMode="tail"
          numberOfLines={1}
          style={{
            color:
              activeSheetIndex === index
                ? variables.textDark
                : variables.textGray,
            width: '79%',
          }}>
          {item.title}
        </Text>
        <View style={styles.itemIco}>
          {item.type === SHEET_TYPE_TEAM && <GroupAltIcon />}
          {item.type === SHEET_TYPE_PERSONAL && <IndividualIcon />}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <Backdrop
      visible={visible}
      closedHeight={0}
      handleOpen={handleOpen}
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
          data={sheets}
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
  headerLine: {
    width: 32,
    height: 4,
    backgroundColor: '#F2F2F3',
  },
  headerWrap: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: '#fff',
  },
  item: {
    paddingVertical: 8,
  },
  itemActive: {
    backgroundColor: '#DEE7F5',
    borderLeftWidth: 4,
    borderLeftColor: '#3294E6',
  },
  itemContent: {
    flexDirection: 'row',
    marginLeft: 24,
  },
  itemContentActive: {
    marginLeft: 20,
  },
  headerTitle: {
    marginBottom: 25,
    paddingHorizontal: 24,
  },
  itemTextIndex: {
    paddingRight: 24,
    color: '#19191A',
    textAlign: 'left',
    width: 42,
  },
  itemIco: {
    marginLeft: 'auto',
    marginRight: 24,
  },
});

export default List;
