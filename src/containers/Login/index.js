import React from 'react'
import { Route } from 'react-router-dom';
import Login from './Login'

const Scene = ({ match }) => {
  return (
    <Route exact path={match.path} component={Login}/>
  )
}

export default Scene
