import ENV from '../../../env'
export function getProtooUrl(
  {
   host,
   roomId,
   peerId,
   forceH264,
   forceVP9,
   isWebinar,
  }
)
{
  const baseUrl = isWebinar
    ? `${host}:${ENV.WEBINAR_MEDIA_PORT}`
    : `${host}:${ENV.MEDIA_PORT}`;

  const url = `${baseUrl}/?roomId=${roomId}&peerId=${peerId}`;
  // let url = `wss://media2.granatum.solutions/?roomId=mivbqfy91&peerId=${peerId}`;

  if (forceH264) {
    return `${url}&forceH264=true`;
  }
  if (forceVP9) {
    return `${url}&forceVP9=true`;
  }

  return url;
}
