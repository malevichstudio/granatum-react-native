import formatFns from 'date-fns/format';
import parseISO from 'date-fns/parseISO';

const defaultFormat = 'dd.MM.yyyy HH:mm';

export default function FormatDate({ date, format = defaultFormat }) {
  return formatFns(parseISO(date), format);
}
