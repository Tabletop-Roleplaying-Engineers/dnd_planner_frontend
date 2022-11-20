import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { CalendarContainer } from './Calendar'

const Scene = () => {
  return (
    <Routes>
      <Route exact path={''} element={<CalendarContainer />} />
      <Route path={`:gameId`} element={<CalendarContainer />} />
    </Routes>
  )
}

export default Scene
