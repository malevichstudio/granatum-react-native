import React, { useState, useCallback } from 'react';
import { StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { FormattedMessage } from 'react-intl';
import { Text, Button, Header, Left, Body, Right } from 'native-base';
import {
  useFocusEffect,
  useNavigation,
  useRoute,
  getFocusedRouteNameFromRoute,
} from '@react-navigation/native';
import { View } from 'react-native';
import { Backdrop } from 'react-native-backdrop';
import { useDispatch, useSelector } from 'react-redux';

import colors from 'app/theme/variables/colors/defaultColors';
import Menu from 'app/containers/AccountPage/components/Header/Menu';
import { setMoveRemoveStickerId, removeContent } from '../actions';
import { selectBlocks, selectMoveRemoveStickerId } from '../selectors';
import messages from '../messages';
import Containers from './Containers';
import MoveIcon from '../../../components/icons/MoveIcon';
import DeleteIcon from '../../../components/icons/DeleteIcon';
import CloseIcon from '../../../components/icons/CloseIcon';

const MoveRemoveSticker = () => {
  const dispatch = useDispatch();
  const blocks = useSelector(selectBlocks);
  const [showMoveModal, setShowMoveModal] = useState(false);
  const moveRemoveStickerId = useSelector(selectMoveRemoveStickerId);

  const handleClose = () => {
    dispatch(setMoveRemoveStickerId(null));
  };

  const handleRemoveSticker = useCallback(() => {
    dispatch(removeContent(moveRemoveStickerId));
    handleClose();
  }, [moveRemoveStickerId]);

  const handleShowMoveSticker = useCallback(() => {
    setShowMoveModal(!showMoveModal);
  }, [showMoveModal]);

  return (
    <>
      <Backdrop
        visible={!!moveRemoveStickerId}
        closedHeight={0}
        handleOpen={() => {}}
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
        <View style={styles.content}>
          <Button
            onPress={handleShowMoveSticker}
            variantLink
            fullAlignLeft
            large
            style={styles.button}>
            <MoveIcon color={colors.textDark} icon />
            <Text dark afterIcon alignLeft>
              <FormattedMessage {...messages.move} />
            </Text>
          </Button>
          <Button onPress={handleRemoveSticker} variantLink fullAlignLeft large>
            <DeleteIcon color={colors.error} />
            <Text error afterIcon>
              <FormattedMessage {...messages.remove} />
            </Text>
          </Button>
        </View>
      </Backdrop>
      {showMoveModal && (
        <Modal visible={showMoveModal}>
          <View>
            <Header>
              <Left>
                <Button
                  onPress={handleShowMoveSticker}
                  large
                  full
                  variantLink
                  style={styles.closeButton}>
                  <CloseIcon fill={colors.textDark} width={24} height={24} />
                </Button>
              </Left>
              <Body style={{ flex: 3 }}>
                <View style={styles.title}>
                  <Text variantSubtitle1 semiBold>
                    <FormattedMessage {...messages.chooseContainer} />
                  </Text>
                </View>
              </Body>
              <Right style={{ flex: 1 }}>
                <Menu />
              </Right>
            </Header>

            <View style={styles.blocksWrapper}>
              {blocks.map((block) => {
                if (block.type === 'TASK_BLOCK') {
                  return (
                    <View key={block.id} style={styles.block}>
                      <Text
                        variantBody2
                        style={styles.blockName}
                        ellipsizeMode="tail"
                        numberOfLines={2}>
                        {block.name}
                      </Text>
                      <Containers
                        block={block}
                        stickerId={moveRemoveStickerId}
                        onShowMoveSticker={handleShowMoveSticker}
                        onCloseMoveRemove={handleClose}
                      />
                    </View>
                  );
                }
              })}
            </View>
          </View>
        </Modal>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  blocksWrapper: { paddingHorizontal: 16 },
  blockName: {
    paddingBottom: 8,
  },
  block: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    borderRadius: 8,
    marginTop: 10,
  },
  container: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    backgroundColor: '#fff',
  },
  content: {
    padding: 24,
    paddingBottom: 8,
    height: 136,
  },
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
  headerTitle: {
    marginBottom: 25,
    paddingHorizontal: 24,
  },
  button: { marginBottom: 8 },
  closeButton: { width: 48 },
  title: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 24,
  },
});

export default MoveRemoveSticker;
