import React, { useContext, useEffect, useCallback } from 'react'
import { Route, Switch } from 'react-router-dom'
import { withApollo } from 'react-apollo'

import _history from './history'
import { Box } from '../noui/Position'
import { AUTH_STORAGE_KEY } from '../constants'
import { UserContext } from '../context/userContext'
import { REFRESH_TOKEN } from 'api'
import { getText, setText } from 'utils/storage'

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

const isError = data => !data || !data.refreshToken

const logout = setUser => {
  localStorage.removeItem(AUTH_STORAGE_KEY)
  setUser(null)
  history.replace('/')
}

export function Routing(props) {
  const {
    client: { mutate },
  } = props
  const { user, setUser } = useContext(UserContext)
  const refreshToken = useCallback(async () => {
    const token = getText(AUTH_STORAGE_KEY)
    if (!user || !token) {
      return
    }

    try {
      const res = await mutate({
        mutation: REFRESH_TOKEN,
        variables: { token },
      })
      const { data } = res
      if (isError(data)) {
        return logout(setUser)
      }

      // Set new token
      setText(AUTH_STORAGE_KEY, data.refreshToken)
    } catch (error) {
      logout(setUser)
    }
  }, [user, mutate])

  useEffect(() => {
    // After moving to another server we have vanished database,
    // but some users has JWT generated on the previous server
    // but corresponding user doesn't exist on the database
    // so we need this check when application is started
    // Another case is when we need to update roles/actions for the user, without refreshing user have to relogin himself
    refreshToken()
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
