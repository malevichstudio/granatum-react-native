import ruLocaleFormatDistance from 'date-fns/locale/ru/_lib/formatDistance';
// import enLocaleFormatDistance from 'date-fns/locale/en-US/_lib/formatDistance';
// import heLocaleFormatDistance from 'date-fns/locale/he/_lib/formatDistance';
import formatDistanceStrict from 'date-fns/formatDistanceStrict';
import parseISO from 'date-fns/parseISO';

export default function FormatDistance({ startDate, endDate }) {
  return formatDistanceStrict(parseISO(startDate), parseISO(endDate), {
    locale: {
      formatDistance: ruLocaleFormatDistance,
    },
  });
}
