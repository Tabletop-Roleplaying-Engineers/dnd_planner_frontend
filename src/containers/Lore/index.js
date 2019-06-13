import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Lore from './Lore'
import Thay from './Thay'
import CultOfTheDragon from './CultOfTheDragon'
import Phlan from './Phlan'

const Scene = ({ match }) => {
  return (
    <Switch>
      <Route exact path={match.path} component={Lore}/>
      <Route exact path={`${match.path}/thay`} component={Thay}/>
      <Route exact path={`${match.path}/cult_of_the_dragon`} component={CultOfTheDragon}/>
      <Route exact path={`${match.path}/phlan`} component={Phlan}/>
    </Switch>  )
}

export default Scene
