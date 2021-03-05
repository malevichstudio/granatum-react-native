/**
 * @summary compare two arrays with strings
 * @param array1 {Array}
 * @param array2 {Array}
 */
export default (array1, array2) => {
  if (!Array.isArray(array1) || !Array.isArray(array2)) {
    return false;
  }
  if (array1.length !== array2.length) {
    // speed up execution
    return false;
  }
  return array1.every((element, index) => element === array2[index]);
};
