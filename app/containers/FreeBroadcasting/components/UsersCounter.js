import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Text, View } from 'native-base';
import { useSelector, useDispatch } from 'react-redux';

import colors from 'app/theme/variables/colors/defaultColors';
import UserIcon from 'app/components/icons/UserIcon';

import { peersToggle } from 'app/containers/SessionPage/actions';
import { selectPeers, selectPinned, selectSpeaker } from '../selectors';

const UsersCounter = ({}) => {
  const dispatch = useDispatch();
  const speakerPeer = useSelector(selectSpeaker);
  const sessionPeers = useSelector(selectPeers);
  const pinnedPeers = useSelector(selectPinned);
  const speaker = speakerPeer?.id ? { [speakerPeer.id]: speakerPeer } : {};
  const peersArray = Object.values({
    ...sessionPeers,
    ...pinnedPeers,
    ...speaker,
  });

  const clickHandler = () => {
    if (peersArray?.length > 0) {
      dispatch(peersToggle());
    }
  };

  return (
    <TouchableOpacity onPress={clickHandler}>
      <View style={styles.counter}>
        <UserIcon color={colors.textL1} />
        <Text semiBold alignLeft lightGray style={styles.counterText}>
          {peersArray.length + 1}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  counter: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 40,
  },
  counterText: {
    paddingLeft: 2,
  },
});

export default UsersCounter;
