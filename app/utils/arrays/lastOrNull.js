/**
 * Check an array and return last element if exists or null. This can be handy
 * to prepare arguments for graphql queries/mutations
 *
 * @param {Array} arr
 * @return {any | null}
 */
export default function lastOrNull(arr) {
  return Array.isArray(arr) && arr.length ? arr[arr.length - 1] : null;
}
