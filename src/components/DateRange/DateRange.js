import React from 'react'
import format from 'date-fns/format'
import startOfWeek from 'date-fns/startOfWeek'
import endOfWeek from 'date-fns/endOfWeek'
import { ViewType } from 'react-responsive-calendar'
import { Flex } from 'noui/Position'

const getMonthRange = date => format(date, 'MMMM y')
const getWeekRange = (date) => {
  const start = startOfWeek(date)
  const end = endOfWeek(date)
  return `${format(start, 'do MMMM y')} - ${format(end, 'do MMMM y')}`
}
export const DateRange = ({ date, view }) => {
  const range = view === ViewType.MOBILE ? getWeekRange(date) : getMonthRange(date)
  return (
    <Flex>
      {range}
    </Flex>
  )
}
