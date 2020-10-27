import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Rules from './Rules'

const Scene = ({ match }) => {
  return (
    <Switch>
      <Route exact path={match.path} component={Rules} />
    </Switch>
  )
}

export default Scene
