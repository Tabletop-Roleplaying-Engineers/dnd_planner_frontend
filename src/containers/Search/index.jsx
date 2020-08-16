import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { Search } from './Search'

const Scene = ({ match }) => {
  return (
    <Switch>
      <Route exact path={match.path} component={Search} />
    </Switch>
  )
}

export default Scene
