import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Players from './Players'

const Scene = () => {
  return (
    <Routes>
      <Route exact path={''} element={<Players />} />
      <Route exact path={`dm`} element={<div>DM</div>} />
    </Routes>
  )
}

export default Scene
