export const getNameByProvider = (provider) => {
  switch (provider) {
    case 'google':
      return 'Google';
    case 'fb':
      return 'Fb';
    case 'vk':
      return 'Vk';
    default:
      return '';
  }
};
