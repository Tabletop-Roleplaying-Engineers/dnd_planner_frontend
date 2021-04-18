import React, { useCallback } from 'react'
import { useIntl } from 'react-intl'
import startOfWeek from 'date-fns/startOfWeek'
import endOfWeek from 'date-fns/endOfWeek'
import { ViewType } from 'react-responsive-calendar'
import { Flex } from 'noui/Position'
import { useDateFormat } from 'utils/hooks/useDateFormat'

const useMonthRange = () => {
  const format = useDateFormat()

  return useCallback((date, locale) => format(date, 'LLLL y', { locale }), [
    format,
  ])
}
const useWeekRange = () => {
  const format = useDateFormat()

  return useCallback(
    (date, locale) => {
      const start = startOfWeek(date, { weekStartsOn: 1 })
      const end = endOfWeek(date, { weekStartsOn: 1 })

      return `${format(start, 'do MMMM y', { locale })} - ${format(
        end,
        'do MMMM y',
        { locale },
      )}`
    },
    [format],
  )
}
export const DateRange = ({ date, view }) => {
  const getMonthRange = useMonthRange()
  const getWeekRange = useWeekRange()
  const intl = useIntl()
  const locale = { code: intl.defaultLocale }
  const range =
    view === ViewType.MOBILE
      ? getWeekRange(date, locale)
      : getMonthRange(date, locale)

  return <Flex>{range}</Flex>
}
