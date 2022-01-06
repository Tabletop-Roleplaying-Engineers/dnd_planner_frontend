import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { CalendarContainer } from './Calendar'

const Scene = ({ match }) => {
  return (
    <Switch>
      <Route exact path={match.path} component={CalendarContainer} />
      <Route path={`${match.path}/:gameId`} component={CalendarContainer} />
    </Switch>
  )
}

export default Scene
