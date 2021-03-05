export default (...args) => {
  let path = '';
  args.forEach(str => {
    if (str) {
      path += `/${str}`;
    }
  });

  return path;
};
