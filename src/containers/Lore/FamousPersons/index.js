import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Famous from './Famous'
import Enemies from './Enemies'
import Allies from './Allies'
import Adventures from './Adventures'


const Scene = ({ match }) => {
  debugger
  return (
    <Switch>
      <Route exact path={match.path} component={Famous}/>
      
      <Route exact path={`${match.path}/ally`} component={Allies}/>
      <Route exact path={`${match.path}/adventurer`} component={Adventures}/>
    </Switch>
  )
}

export default Scene
