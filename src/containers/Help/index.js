import React from 'react'
import { Route, Switch } from 'react-router-dom';
import Help from './Help'

const Scene = ({ match }) => {
  return (
    <Switch>
      <Route exact path={match.path} component={Help}/>
    </Switch>
  )
}

export default Scene