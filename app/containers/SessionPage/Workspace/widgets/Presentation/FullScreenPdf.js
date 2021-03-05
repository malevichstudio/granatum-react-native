import React from 'react';
import {
  Modal,
  StyleSheet,
  TouchableOpacity,
  View,
  Dimensions,
  Platform,
} from 'react-native';
import Pdf from 'react-native-pdf';
// import ReactNativeZoomableView from '@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView';

import CloseIcon from 'app/components/icons/CloseIcon';
import colors from 'app/theme/variables/colors/defaultColors';

const FullScreenPdf = ({ options, open, onClose }) => {
  if (!open) {
    return null;
  }

  return (
    <View style={styles.centeredView}>
      <Modal animationType="none" transparent={true} visible={true}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity onPress={() => onClose()} style={styles.close}>
              <CloseIcon color={colors.textDark} />
            </TouchableOpacity>
            <View style={styles.container}>
              <View pointerEvents={'none'}>
                <Pdf
                  {...options}
                  spacing={0}
                  enablePaging={Platform.OS === 'ios'}
                  singlePage={true}
                  style={styles.pdf}
                />
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    position: 'relative',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  pdf: {
    backgroundColor: 'white',
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  close: {
    position: 'absolute',
    top: 50,
    right: 15,
    zIndex: 99999999999,
    padding: 8,
    borderRadius: 32,
  },
  modalView: {
    position: 'relative',
    backgroundColor: 'white',
    borderRadius: 3,
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-start',
  },
});

export default FullScreenPdf;
