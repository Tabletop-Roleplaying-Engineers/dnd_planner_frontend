import React, { useEffect, useContext } from 'react'
import { withRouter } from 'react-router-dom'
import qs from 'query-string'
import { withApollo } from 'react-apollo'
import * as R from 'ramda'
import { SIGN_IN_MUTATION } from 'api'
import { decode } from '../../utils/jwt'
import { UserContext } from '../../context/userContext'

const Login = ({ location, history, client }) => {
  const { setUser } = useContext(UserContext)

  useEffect(() => {
    (async () => {
      const {
        first_name,
        last_name,
        photo_url,
        id,
        username,
        auth_date,
        hash,
      } = qs.parse(location.search)

      const userData = {
        id,
        username,
        hash,
        avatar: photo_url,
        firstName: first_name,
        lastName: last_name,
        authDate: auth_date,
      }

      let { data: { signIn: token } } = await client.mutate({
        mutation: SIGN_IN_MUTATION,
        variables: userData,
      })

      localStorage.setItem('AUTH_DATA', token)
      setUser(decode(token))

      history.replace('/')
    })()
  }, [])

  return (
    <div>Login</div>
  )
}

export default R.compose(
  withRouter,
  withApollo
)(Login)
