import React, { useState, useCallback } from 'react'
import * as R from 'ramda'
import { Carousel } from 'antd'
import addMonths from 'date-fns/addMonths'
import addWeeks from 'date-fns/addWeeks'
import format from 'date-fns/format'
import isToday from 'date-fns/isToday'
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

  & .ant-carousel .slick-slide {
    height: 160px;
    overflow: hidden;
  }

  & .ant-carousel-vertical .slick-dots-right {
    right: -5px;

    li button::before {
      display: none;
    }

    li button {
      background: black;
      width: 5px;
    }

    li.slick-active button {
      background: #E40712;
      width: 5px;
    }
  }
`

const CellLeft = styled.div`
  width: calc(100% - 10px);
  word-break: break-word;
`

const CarouselBlock = styled.div`
  height: 150px;
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

    return (
      <CalendarCell
        today={isToday(currentDate)}
      >
        <CellLeft>
          {
            thisDayGames.length === 1 
            ? thisDayGames.map((game) =>
              <GamePreview
                onClick={() => cellClickHandler({ date: currentDate, games: thisDayGames })}
                key={game.id}
                {...game}
              /> )
            : <Carousel 
                autoplay 
                // effect="fade" 
                dotPosition="right"
                easing="ease-out"
              >
                {
                  thisDayGames.map((game) =>
                    <CarouselBlock key={game.id}>
                      <GamePreview
                        onClick={() => cellClickHandler({ date: currentDate, games: thisDayGames })}
                        key={game.id}
                        {...game}
                      />
                    </CarouselBlock>
                  )
                }
            </Carousel>
          }
        </CellLeft>
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
