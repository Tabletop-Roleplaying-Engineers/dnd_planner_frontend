import React, { useState, useCallback } from 'react'
import * as R from 'ramda'
import addMonths from 'date-fns/addMonths'
import addWeeks from 'date-fns/addWeeks'
import format from 'date-fns/format'
import isToday from 'date-fns/isToday'
import isBefore from 'date-fns/isBefore'
import startOfMonth from 'date-fns/startOfMonth'
import endOfMonth from 'date-fns/endOfMonth'
import isAfter from 'date-fns/isAfter'
import { ResponsiveCalendar, ViewType } from 'react-responsive-calendar'
import styled, { css } from 'styled-components'
import { NavigationButtons } from './NavigationButtons'
import { DateRange } from '../DateRange/DateRange'
import { GamePreview } from '../GamePreview'
import { Flex } from 'noui/Position'

const WeekDay = styled.div`
  text-align: right;
`

const CalendarCell = styled.div`
  border-top: 2px solid #c4c4c4;
  margin: 0 4px;
  display: flex;
  height: 150px;
  :hover {
    background-color: #FFDBDA;
  }
  ${props => props.today && css`
    border-color: #E61721;
  `}
`

const CellLeft = styled.div`
  width: calc(100% - 30px);
  word-break: break-word;
`

const CellRight = styled.div`
  width: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  ${props => props.dimmed && css`
    opacity: 0.3;
  `}
`

const DateBlock = styled.div`
  margin-top: 5px;
`
const TotalGamesBlock = styled.div`
  margin-top: 17px;
  font-size: 22px;
  font-weight: bold;
`
const PlacesAvailableBlock = styled.div`
  color: #FF4646;
  font-size: 22px;
`

const parseDate = game => {
  const date = new Date(parseInt(game.startingDate, 10))
  return {
    ...game,
    dateKey: format(date, 'yyyy-MM-dd'),
    startingDate: date,
  }
}

const groupByDate = R.groupBy(R.prop('dateKey'))

const parseGames = R.pipe(
  R.map(parseDate),
  groupByDate,
)

const getAvailablePlaces = game => game.players - game.characters.length
const getAvailablePlacesForGames = games => games.reduce((acc, game) => acc + getAvailablePlaces(game), 0)

export const Calendar = ({ games, onCellClick }) => {
  const groupedGames = parseGames(games)
  const [date, setDate] = useState(new Date())
  const [view, setView] = useState()
  const navHandler = useCallback((date, value) => {
    const incrementFn = view === ViewType.MOBILE ? addWeeks : addMonths
    setDate(incrementFn(date, value))
  }, [view])
  const renderWeekDay = useCallback(({ date }) => {
    return (
      <WeekDay>
        {format(date, 'E')}
      </WeekDay>
    )
  }, [])
  const cellClickHandler = useCallback(({ date, games }) => {
    setDate(date)
    onCellClick({ date, games })
  }, [onCellClick])
  const renderCell = useCallback(({ date: currentDate }) => {
    const thisDayGames = groupedGames[format(currentDate, 'yyyy-MM-dd')] || []
    const availablePlaces = getAvailablePlacesForGames(thisDayGames)

    return (
      <CalendarCell
        today={isToday(currentDate)}
        onClick={() => cellClickHandler({ date: currentDate, games: thisDayGames })}
      >
        <CellLeft>
          {
            R.take(1, thisDayGames).map((game) =>
              <GamePreview
                key={game.id}
                {...game}
              />
            )
          }
        </CellLeft>
        <CellRight
          dimmed={isBefore(currentDate, startOfMonth(date)) || isAfter(currentDate, endOfMonth(date))}
        >
          <DateBlock>
            {format(currentDate, 'dd')}
          </DateBlock>
          <TotalGamesBlock title="Total games">
            {thisDayGames.length}
          </TotalGamesBlock>
          <PlacesAvailableBlock title="Slots available">
            {availablePlaces}
          </PlacesAvailableBlock>
        </CellRight>
      </CalendarCell>
    )
  }, [groupedGames, date])

  return (
    <>
      <Flex justifyContent="center" mb={2}>
        <DateRange date={date} view={view} />
      </Flex>
      <NavigationButtons
        onPreviousClick={() => navHandler(date, -1)}
        onNextClick={() => navHandler(date, 1)}
        onTodayClick={() => setDate(new Date())}
      />
      <ResponsiveCalendar
        date={date}
        onViewChanged={setView}
        renderWeekDay={renderWeekDay}
        renderCell={renderCell}
        breakPoint={768}
        withWeekDays
      />
    </>
  )
}
