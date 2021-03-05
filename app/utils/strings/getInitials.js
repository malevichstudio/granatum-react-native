/**
 * Extract initials from the given name. It extracts letters only from the two
 * first names
 * @example: 'John Smith' will be 'JS'
 * @param {string} str
 * @return {string}
 */
export default str =>
  str
    .split(' ')
    .reduce(
      (initials, name) => `${initials}${name.substring(0, 1).toUpperCase()}`,
      '',
    )
    .slice(0, 2);
