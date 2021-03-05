import color from 'color';
import colors from 'app/theme/variables/colors/defaultColors';

export const peerWrapper = (bgColor) => ({
  justifyContent: 'center',
  alignItems: 'center',
  flex: 1,
  height: 168,
  marginBottom: 0,
  backgroundColor: color(bgColor).alpha(0.055).string(),
});

export const peerWrapperClosed = {
  height: 44,
  marginBottom: 0,
  marginRight: 5,
};

export const peerContent = (bgColor) => ({
  justifyContent: 'center',
  alignItems: 'center',
  width: 168,
  height: 168,
  backgroundColor: color(bgColor).darken(0.016).string(),
  borderRadius: 4,
});

export const peerContentClosed = {
  justifyContent: 'center',
  alignItems: 'center',
  width: 44,
  height: 44,
  borderRadius: 4,
};

export const peerNameWrapper = {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  height: 32,
  paddingHorizontal: 8,
  paddingBottom: 4,
  backgroundColor: color(colors.textD1).darken(0.016).fade(0.7).string(),
  position: 'absolute',
  bottom: 0,
};
