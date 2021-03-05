/**
 * Returns an array with arrays of the given size.
 *
 * @param {Array} myArray - array to split
 * @param {number} chunkSize - Size of every group
 */
export default function chunkArray(myArray, chunkSize) {
  const arrayLength = myArray.length;
  const tempArray = [];

  for (let index = 0; index < arrayLength; index += chunkSize) {
    const myChunk = myArray.slice(index, index + chunkSize);
    // Do something if you want with the group
    tempArray.push(myChunk);
  }

  return tempArray;
}
