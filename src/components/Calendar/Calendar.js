import React, { useState, useCallback, useEffect } from 'react'
import * as R from 'ramda'
import { Carousel, Tag } from 'antd'
import addMonths from 'date-fns/addMonths'
import addWeeks from 'date-fns/addWeeks'
import format from 'date-fns/format'
import isToday from 'date-fns/isToday'
import startOfMonth from 'date-fns/startOfMonth'
import endOfMonth from 'date-fns/endOfMonth'
import startOfWeek from 'date-fns/startOfWeek'
import endOfWeek from 'date-fns/endOfWeek'
import { ResponsiveCalendar, ViewType } from 'react-responsive-calendar'
import styled, { css } from 'styled-components'
import { NavigationButtons } from './NavigationButtons'
import { DateRange } from '../DateRange/DateRange'
import { GamePreview } from '../GamePreview'
import { parseGame } from '../../utils/common'
import { Flex } from 'noui/Position'

const WeekDay = styled.div`
  text-align: right;
`

const CalendarCell = styled.div`
  position: relative;
  border-top: 2px solid #c4c4c4;
  margin: 0 4px;
  display: flex;
  height: 150px;
  overflow: hidden;

  :hover {
    background-color: #ffdbda;
  }
  ${props =>
    props.today &&
    css`
      border-color: #e61721;
    `}

  & .ant-carousel .slick-slide {
    height: 150px;
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
      border-radius: 5px;
    }

    li.slick-active button {
      background: #e40712;
      width: 5px;
    }
  }
`

const DateBlock = styled.div`
  position: absolute;
  right: -10px;
  top: 0;
  z-index: 1;
`

const CellLeft = styled.div`
  width: calc(100% - 10px);
  word-break: break-word;
`

const CarouselBlock = styled.div`
  height: 146px;
`

const groupByDate = R.groupBy(R.prop('dateKey'))

const parseGames = R.pipe(
  R.map(parseGame),
  groupByDate,
)

export const Calendar = ({ games, onCellClick, onRangeChanged = () => {} }) => {
  const groupedGames = parseGames(games)
  const [date, setDate] = useState(new Date())
  const [view, setView] = useState()
  const [range, setRange] = useState({ from: null, to: null })
  const navHandler = useCallback(
    (date, value) => {
      const incrementFn = view === ViewType.MOBILE ? addWeeks : addMonths
      setDate(incrementFn(date, value))
    },
    [view],
  )
  const renderWeekDay = useCallback(({ date }) => {
    return <WeekDay>{format(date, 'E')}</WeekDay>
  }, [])
  const cellClickHandler = useCallback(
    ({ date, games }) => {
      setDate(date)
      onCellClick({ date, games })
    },
    [onCellClick],
  )
  const renderCell = useCallback(
    ({ date: currentDate }) => {
      const thisDayGames = groupedGames[format(currentDate, 'yyyy-MM-dd')] || []

      return (
        <CalendarCell
          today={isToday(currentDate)}
          onClick={() =>
            R.isEmpty(thisDayGames)
              ? cellClickHandler({ date: currentDate, games: thisDayGames })
              : undefined
          }
        >
          <DateBlock>
            <Tag color="volcano">{format(currentDate, 'dd')}</Tag>
          </DateBlock>

          <CellLeft>
            {thisDayGames.length === 1 ? (
              thisDayGames.map(game => (
                <GamePreview
                  onClick={() =>
                    cellClickHandler({ date: currentDate, games: thisDayGames })
                  }
                  key={game.id}
                  {...game}
                />
              ))
            ) : (
              <Carousel
                autoplay
                dotPosition="right"
                easing="ease-out"
                adaptiveHeight
              >
                {thisDayGames.map(game => (
                  <CarouselBlock key={game.id}>
                    <GamePreview
                      onClick={() =>
                        cellClickHandler({
                          date: currentDate,
                          games: thisDayGames,
                        })
                      }
                      key={game.id}
                      {...game}
                    />
                  </CarouselBlock>
                ))}
              </Carousel>
            )}
          </CellLeft>
        </CalendarCell>
      )
    },
    [groupedGames, date],
  )
  useEffect(() => {
    if (!view) {
      return
    }
    if (view === ViewType.MOBILE) {
      const from = startOfWeek(date)
      const to = endOfWeek(date)
      setRange({ from, to })
    } else {
      const from = startOfMonth(date)
      const to = endOfMonth(date)
      setRange({ from, to })
    }
  }, [view, date])
  useEffect(() => {
    if (range.from && range.to) {
      onRangeChanged(range.from, range.to)
    }
  }, [range, onRangeChanged])

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
