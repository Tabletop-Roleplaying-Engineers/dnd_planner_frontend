import React, { useEffect, useContext, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import qs from 'query-string'
import { useApolloClient } from '@apollo/client'
import { Alert } from 'antd'
import { SIGN_IN_MUTATION } from 'api'
import { decode } from '../../utils/jwt'
import { UserContext } from '../../context/userContext'
import { Box } from 'noui/Position'
import { FormattedMessage } from 'react-intl'

const Login = () => {
  const { setUser } = useContext(UserContext)
  const client = useApolloClient()
  const [error, setError] = useState(null)
  const [validationError, setValidationError] = useState(null)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const fn = async () => {
      setValidationError(null)
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

      if (!username) {
        setValidationError('login.validation.emptyUsername')

        return
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

        navigate('/', {
          replace: true,
        })
      } catch (err) {
        setError(err)
      }
    }
    fn()
  }, [client, navigate, location, setUser])

  if (validationError) {
    return (
      <Box pt="10px">
        <Alert
          message={<FormattedMessage id={validationError} />}
          type="error"
        />
      </Box>
    )
  }

  if (error) {
    const errorArray = error.networkError
      ? Array.from(error.networkError.result.errors.values())
      : error.graphQLErrors

    return (
      <Box pt="10px">
        <Alert
          message={errorArray.map((err) => err.message).join(', ')}
          type="error"
        />
      </Box>
    )
  }

  return <FormattedMessage id="common.pleaseWait" />
}

export default Login
