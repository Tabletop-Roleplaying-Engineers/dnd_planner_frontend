import React from 'react'
import { Route } from 'react-router-dom'
import Profile from './Profile'

const Scene = ({ match }) => {
  return <Route exact path={match.path} component={Profile} />
}

export default Scene
