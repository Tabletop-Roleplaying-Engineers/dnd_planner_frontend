import React from 'react'
import { Route, Routes } from 'react-router-dom'

import Rules from './Rules'

const Scene = () => {
  return (
    <Routes>
      <Route path={''} element={<Rules />} />
    </Routes>
  )
}

export default Scene
