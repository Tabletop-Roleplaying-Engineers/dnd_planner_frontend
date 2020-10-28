import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Dashboard from './Dashboard'

const Scene = ({ match }) => {
  return (
    <Switch>
      <Route exact path={match.path} component={Dashboard} />
    </Switch>
  )
}

export default Scene
