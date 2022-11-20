import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Famous from './Famous'
import Enemies from './Enemies'
import Allies from './Allies'
import Adventures from './Adventures'

const Scene = ({ match }) => {
  return (
    <Routes>
      <Route exact path={match.path} component={Famous} />
      <Route path={`${match.path}/enemy`} component={Enemies} />
      <Route path={`${match.path}/ally`} component={Allies} />
      <Route path={`${match.path}/adventurer`} component={Adventures} />
    </Routes>
  )
}

export default Scene
