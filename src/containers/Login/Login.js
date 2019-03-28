import React from 'react'
import { withRouter } from 'react-router-dom'
import qs from 'query-string'
import { withApollo } from 'react-apollo'
import * as R from 'ramda'
import { SIGN_IN_MUTATION, SIGN_UP_MUTATION } from 'api'

class Login extends React.Component {
  async componentDidMount() {
    const { location, history, client } = this.props

    // const BOT_TOKEN = '823583949:AAFs88dhB3LZdENQqVyKUFIfVYnu7TTuQno'
    const { first_name, last_name, photo_url, id, username } = qs.parse(location.search)
    // const data_check_string = `auth_date=${auth_date}\nfirst_name=${first_name}\nid=${id}\nusername=${username}`
    // const secret_key = sha.sha256(BOT_TOKEN)
    // const hmac = sha.sha256.hmac.create(secret_key)
    // hmac.update(data_check_string)
    // const hex = hmac.hex()
    // console.log(hex === hash)

    const userData = {
      id,
      username,
      avatar: photo_url,
      firstName: first_name,
      lastName: last_name
    }

    let { data: { signIn: user } } = await client.mutate({
      mutation: SIGN_IN_MUTATION,
      variables: { id }
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