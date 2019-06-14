import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Lore from './Lore'
import CultOfTheDragon from './CultOfTheDragon'
import FamousPersons from './FamousPersons'
import Phlan from './Phlan'
import Storyline from './Storyline'

const Scene = ({ match }) => {
  return (
    <Switch>
      <Route exact path={match.path} component={Lore}/>
      <Route exact path={`${match.path}/cult_of_the_dragon`} component={CultOfTheDragon}/>
      <Route exact path={`${match.path}/famous_persons`} component={FamousPersons}/>
      <Route exact path={`${match.path}/storyline`} component={Storyline}/>
      <Route exact path={`${match.path}/phlan`} component={Phlan}/>
    </Switch>  )
}

export default Scene
