import React, { useContext, useEffect, useCallback } from 'react'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import { useApolloClient } from '@apollo/client'
import { decode } from '../utils/jwt'

import { Box } from '../noui/Position'
import { AUTH_STORAGE_KEY } from '../constants'
import { UserContext } from '../context/userContext'
import { REFRESH_TOKEN } from 'api'
import { getText, setText } from 'utils/storage'

import NotFound from 'containers/NotFound'

import Login from 'containers/Login'
import Players from 'containers/Players'
import Calendar from 'containers/Calendar'
import Profile from 'containers/Profile'
import Dashboard from 'containers/Dashboard'
import Rules from 'containers/Rules'
import Lore from 'containers/League'
import Search from 'containers/Search'
import Characters from 'containers/Characters'

const isError = (data) => !data || !data.refreshToken

const logout = (setUser) => {
  localStorage.removeItem(AUTH_STORAGE_KEY)
  setUser(null)
}

export function Routing() {
  const { mutate } = useApolloClient()
  const { user, setUser } = useContext(UserContext)
  const navigate = useNavigate()
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
        logout(setUser)
        navigate('/', {
          replace: true,
        })

        return
      }

      // Set new token
      setText(AUTH_STORAGE_KEY, data.refreshToken)
      setUser(decode(token))
    } catch (error) {
      logout(setUser)
      navigate('/', {
        replace: true,
      })
    }
  }, [user, mutate, setUser, navigate])

  useEffect(() => {
    // After moving to another server we have vanished database,
    // but some users has JWT generated on the previous server
    // but corresponding user doesn't exist on the database
    // so we need this check when application is started
    // Another case is when we need to update roles/actions for the user, without refreshing user have to relogin himself
    refreshToken()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Box mx={[10]}>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace={true} />} />
        <Route path="/login/*" element={<Login />} />
        <Route path="/calendar/*" element={<Calendar />} />
        <Route path="/players/*" element={<Players />} />
        <Route path="/profile/*" element={<Profile />} />
        <Route path="/dashboard/*" element={<Dashboard />} />
        <Route path="/rules/*" element={<Rules />} />
        <Route path="/lore/*" element={<Lore />} />
        <Route path="/search/*" element={<Search />} />
        <Route path="/character/*" element={<Characters />} />

        {/* 404*/}
        <Route element={<NotFound />} />
      </Routes>
    </Box>
  )
}

export default Routing
