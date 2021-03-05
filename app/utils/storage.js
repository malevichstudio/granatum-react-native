import AsyncStorage from '@react-native-community/async-storage';

export const setItem = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    console.log(e.stack);
  }
};

export const getItem = async (key) => {
  try {
    return await AsyncStorage.getItem(key);
  } catch (e) {
    console.log(e.stack);
  }
};

const removeItem = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    console.log(e.stack);
  }
};

export const setAuthToken = async (token, type = 'accessToken') => {
  try {
    await AsyncStorage.setItem(`granatum.authTokens.${type}`, token);
  } catch (e) {
    console.log(e.stack);
  }
};

export const setExpireAt = async (exp, type) => {
  try {
    await AsyncStorage.setItem(`granatum.authTokens.${type}ExpireAt`, exp);
  } catch (e) {
    console.log(e.stack);
  }
};

export const getAuthToken = async (type = 'accessToken') => {
  try {
    return await AsyncStorage.getItem(`granatum.authTokens.${type}`);
  } catch (e) {
    console.log(e.stack);
  }
};

export const cleanTokens = async () => {
  try {
    await AsyncStorage.removeItem('granatum.authTokens.accessToken');
    await AsyncStorage.removeItem('granatum.authTokens.accessTokenExpireAt');
    await AsyncStorage.removeItem('granatum.authTokens.refreshToken');
    await AsyncStorage.removeItem('granatum.authTokens.refreshTokenExpireAt');
    await AsyncStorage.removeItem('granatum.googleAuthTokens');
    await AsyncStorage.removeItem('granatum.copiedElements');
    await AsyncStorage.removeItem('granatum.getCopiedSessions');
    await AsyncStorage.removeItem('granatum.googleAccessToken');
    await AsyncStorage.removeItem('granatum.googleAccessTokenExpireAt');
    await AsyncStorage.removeItem('granatum.copiedElements');
  } catch (e) {
    console.log(e.stack);
  }
};
