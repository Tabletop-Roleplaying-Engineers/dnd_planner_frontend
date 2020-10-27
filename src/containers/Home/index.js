import React from 'react'
import { Route } from 'react-router-dom'
import Home from './Home'

const Scene = ({ match }) => {
  return <Route exact path={match.path} component={Home} />
}

export default Scene
