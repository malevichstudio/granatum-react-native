/**
 * Determines is an object is a filled array or not and execute arr.find with
 * callback
 *
 * Instead of:
 * const state = Array.isArray(arr) && arr.length && arr.find(a => a.isActive);
 *
 * will be:
 * const state = arrayFind(arr)(a => a.isActive);
 *
 * @param {Array} arr - possible array
 * @function {function} callback - map condition
 * @return {function(function): Array | null}
 */
export default arr => callback =>
  Array.isArray(arr) && arr.length ? arr.find(callback) : null;
