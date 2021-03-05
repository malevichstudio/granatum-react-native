import capitalizaFirstLetter from './capitalizaFirstLetter';
/**
 * Трансформирует константы в camelCase, что бы удобно работать с переводами ролей
 * Пример: MY_CONSTANT > myConstant
 * @param role {string}
 * @returns {string}
 */
export default role => {
  const roleLower = role.toLowerCase().split('_');
  return !roleLower[1]
    ? roleLower[0]
    : roleLower[0] + capitalizaFirstLetter(roleLower[1]);
};
