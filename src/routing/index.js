import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Home from 'containers/Home'
import Login from 'containers/Login'
import Players from 'containers/Players'
import Calendar from 'containers/Calendar'
import Profile from 'containers/Profile'
import Dashboard from 'containers/Dashboard'
import Help from 'containers/Help'
import Lore from 'containers/Lore'
import NotFound from 'containers/NotFound'
import _history from './history'
import { Box } from '../noui/Position'

export const history = _history

export default function Routing() {
  return (
    <Switch>
      <Box mx={[10]}>
        <Route exact path='/' component={Home}/>
        <Route path='/login' component={Login}/>
        <Route path='/calendar' component={Calendar}/>
        <Route path='/players' component={Players}/>
        <Route path='/profile' component={Profile}/>
        <Route path='/dashboard' component={Dashboard}/>
        <Route path='/help' component={Help}/>
        <Route path='/lore' component={Lore}/>
      </Box>

      {/* 404*/}
      <Route component={NotFound}/>
    </Switch>
  )
}
