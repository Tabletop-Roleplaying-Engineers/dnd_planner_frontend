import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Famous from './Famous'
import Enemies from './Enemies'
import Allies from './Allies'
import Adventures from './Adventures'

const Scene = () => {
  return (
    <Routes>
      <Route path={''} element={<Famous />} />
      <Route path={`enemy`} element={<Enemies />} />
      <Route path={`ally`} element={<Allies />} />
      <Route path={`adventurer`} element={<Adventures />} />
    </Routes>
  )
}

export default Scene
