import React from 'react'
import { withRouter } from 'react-router-dom'
import qs from 'query-string'
import { withApollo } from 'react-apollo'
import * as R from 'ramda'
import { SIGN_IN_MUTATION, SIGN_UP_MUTATION } from 'api'

class Login extends React.Component {
  async componentDidMount() {
    const { location, history, client } = this.props

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

    let { data: { signIn: user } } = await client.mutate({
      mutation: SIGN_IN_MUTATION,
      variables: userData,
    })

    if (!user) {
      const { data: { signUp } } = await client.mutate({
        mutation: SIGN_UP_MUTATION,
        variables: userData
      })

      user = signUp
    }

    localStorage.setItem('AUTH_DATA', user.id)

    history.replace('/')
  }

  render() {
    return (
      <div>Login</div>
    )
  }
}

export default R.compose(
  withRouter,
  withApollo
)(Login)