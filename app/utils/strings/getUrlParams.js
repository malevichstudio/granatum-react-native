export default (url) => {
  const hashes = url.slice(url.indexOf('?') + 1).split('&');
  const params = {};
  hashes.map((hash) => {
    const [key, val] = hash.split('=');
    params[key] = decodeURIComponent(val);
  });
  return params;
};
