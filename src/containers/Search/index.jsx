import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Search } from './Search'

const Scene = () => {
  return (
    <Routes>
      <Route path={''} element={<Search />} />
    </Routes>
  )
}

export default Scene
