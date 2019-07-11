import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Factions from './Factions'
import Harpers from './Harpers'
import OrderOfGauntlet from './OrderOfGauntlet'
import EmeraldEnclave from './EmeraldEnclave'
import LordsAlliance from './LordsAlliance'
import Zhentarim from './Zhentarim'
import Others from './Others'

const Scene = ({ match }) => {
  return (
    <Switch>
      <Route exact path={match.path} component={Factions}/>
      <Route path={`${match.path}/the_harpers`} component={Harpers}/>
      <Route path={`${match.path}/the_order_of_the_gauntlet`} component={OrderOfGauntlet}/>
      <Route path={`${match.path}/the_emerald_enclave`} component={EmeraldEnclave}/>
      <Route path={`${match.path}/the_lords_alliance`} component={LordsAlliance}/>
      <Route path={`${match.path}/the_zhentarim`} component={Zhentarim}/>
      <Route path={`${match.path}/others`} component={Others}/>
    </Switch>
  )
}

export default Scene

