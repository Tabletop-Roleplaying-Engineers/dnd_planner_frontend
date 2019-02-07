import React from 'react'
import { Route, Switch } from 'react-router-dom';
import Players from './Players'

const Scene = ({ match }) => {
  return (
    <Switch>
      <Route exact path={match.path} component={Players}/>
      <Route exact path={`${match.path}/dm`} component={() => <div>DM</div>}/>
    </Switch>
  )
}

export default Scene
