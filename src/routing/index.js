import React, { useContext, useEffect } from 'react'
import { Route, Switch } from 'react-router-dom'
import { withApollo } from 'react-apollo'

import _history from './history'
import { Box } from '../noui/Position'
import { AUTH_STORAGE_KEY } from '../constants'
import { UserContext } from '../context/userContext'
import { CURRENT_USER } from 'api'
import { getText } from 'utils/storage'

import NotFound from 'containers/NotFound'

import Home from 'containers/Home'
import Login from 'containers/Login'
import Players from 'containers/Players'
import Calendar from 'containers/Calendar'
import Profile from 'containers/Profile'
import Dashboard from 'containers/Dashboard'
import Rules from 'containers/Rules'
import Lore from 'containers/League'
import Search from 'containers/Search'

export const history = _history

const isJwtUserCorrect = data => data && data.currentUser

const logout = setUser => {
  localStorage.removeItem(AUTH_STORAGE_KEY)
  setUser(null)
  history.replace('/')
}

export function Routing(props) {
  const { user, setUser } = useContext(UserContext)

  useEffect(() => {
    // After moving to another server we have vanished database,
    // but some users has JWT generated on the previous server
    // but corresponding user doesn't exist on the database
    // so we need this check when application is started
    const fn = async function() {
      if (!user || !getText('AUTH_DATA')) {
        return
      }
      const {
        client: { query },
      } = props
      try {
        const res = await query({
          query: CURRENT_USER,
        })
        const { data } = res
        if (!isJwtUserCorrect(data)) {
          logout(setUser)
        }
      } catch (error) {
        logout(setUser)
      }
    }
    fn()
  }, [])

  return (
    <Switch>
      <Box mx={[10]}>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/calendar" component={Calendar} />
        <Route path="/players" component={Players} />
        <Route path="/profile" component={Profile} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/rules" component={Rules} />
        <Route path="/lore" component={Lore} />
        <Route path="/search" component={Search} />
      </Box>

      {/* 404*/}
      <Route component={NotFound} />
    </Switch>
  )
}

export default withApollo(Routing)
