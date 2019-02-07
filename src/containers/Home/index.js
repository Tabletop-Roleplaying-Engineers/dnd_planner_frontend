import React from 'react'
import { Route, Switch } from 'react-router-dom';
import Home from './Home'

const Scene = ({ match }) => {
  return (
    <Route exact path={match.path} component={Home}/>
  )
}

export default Scene
