import format from 'date-fns/format'
import uk from 'date-fns/locale/uk'

export const useDateFormat = () => {
  // TODO: use `locale` from the store/localStorage
  return (date, formatString) =>
    format(date, formatString, {
      locale: uk,
      weekStartsOn: 1,
    })
}
