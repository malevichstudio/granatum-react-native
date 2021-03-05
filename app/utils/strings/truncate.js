export default (str = '', len, append = '...') => {
  // не знаю почему, но когда в str прилетает null, то дефолтное значение str = ''
  // не срабатывает, и возникает ошибка, по этому добавил проверку
  if (str?.length > len) {
    const trimmedString = str.substr(0, len);

    return `${trimmedString.substr(
      0,
      Math.min(trimmedString.length, trimmedString.lastIndexOf(' ')),
    )}${append}`;
  }

  return str;
};
