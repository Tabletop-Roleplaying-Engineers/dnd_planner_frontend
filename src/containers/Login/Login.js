import React, { useEffect, useContext, useState } from 'react'
import { withRouter } from 'react-router-dom'
import qs from 'query-string'
import { withApollo } from 'react-apollo'
import { Alert } from 'antd'
import * as R from 'ramda'
import { SIGN_IN_MUTATION } from 'api'
import { decode } from '../../utils/jwt'
import { UserContext } from '../../context/userContext'
import { Box } from 'noui/Position'

const Login = ({ location, history, client }) => {
  const { setUser } = useContext(UserContext)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fn = async () => {
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

      try {
        let {
          data: { signIn: token },
        } = await client.mutate({
          mutation: SIGN_IN_MUTATION,
          variables: userData,
        })

        localStorage.setItem('AUTH_DATA', token)
        setUser(decode(token))

        history.replace('/')
      } catch (err) {
        setError(err)
      }
    }
    fn()
  }, [])

  if (error) {
    const errorArray = error.networkError
      ? Array.from(error.networkError.result.errors.values())
      : error.graphQLErrors
    return (
      <Box pt="10px">
        <Alert
          message={errorArray.map(err => err.message).join(', ')}
          type="error"
        />
      </Box>
    )
  }

  return <div>Please wait...</div>
}

export default R.compose(
  withRouter,
  withApollo,
)(Login)
