import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './Login'

const Scene = () => {
  return (
    <Routes>
      <Route exact path={''} element={<Login />} />
    </Routes>
  )
}

export default Scene
