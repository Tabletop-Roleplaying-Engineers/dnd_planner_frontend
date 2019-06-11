import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Lore from './Lore'
import Thay from './Thay'

const Scene = ({ match }) => {
  return (
    <Switch>
      <Route exact path={match.path} component={Lore}/>
      <Route exact path={`${match.path}/thay`} component={Thay}/>
    </Switch>  )
}

export default Scene
