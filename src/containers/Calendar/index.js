import React from 'react'
import { Route, Switch } from 'react-router-dom';
import Calendar from './Calendar'

const Scene = ({ match }) => {
  return (
    <Switch>
      <Route exact path={match.path} component={Calendar}/>
    </Switch>
  )
}

export default Scene