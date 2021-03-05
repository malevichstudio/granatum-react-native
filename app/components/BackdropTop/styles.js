import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    zIndex: 100,
    elevation: 10,
    justifyContent: 'flex-start',
    flex: 1,
  },
  overlayTouchable: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  overlayStyle: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
  },
});

export default styles;
