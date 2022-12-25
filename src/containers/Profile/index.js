import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Profile from './Profile'

const Scene = () => {
  return (
    <Routes>
      <Route exact path={''} element={<Profile />} />
    </Routes>
  )
}

export default Scene
