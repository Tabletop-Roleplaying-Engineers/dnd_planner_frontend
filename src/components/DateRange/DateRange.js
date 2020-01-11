import React from 'react'
import format from 'date-fns/format'
import startOfWeek from 'date-fns/startOfWeek'
import endOfWeek from 'date-fns/endOfWeek'
import styled from 'styled-components'
import { ViewType } from 'react-responsive-calendar'
import { Box, Flex } from 'noui/Position'

const Wrapper = styled(Flex)`
  cursor: pointer;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  overflow: auto;
`
const Title = styled(Box)`
  padding: 5px 10px;
`

const getMonthRange = date => format(date, 'MMMM y')
const getWeekRange = (date) => {
  // 13th March - 20
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
