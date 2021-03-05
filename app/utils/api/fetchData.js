export default function fetchData(
  url = '',
  data = {},
  method,
  contentType = 'application/json',
  isJson = true,
) {
  return fetch(url, {
    headers: {
      'Content-Type': contentType,
    },
    body: isJson ? JSON.stringify(data) : data,
    method,
  });
}
