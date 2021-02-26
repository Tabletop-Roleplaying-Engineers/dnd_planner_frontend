import React from 'react'
import { Route, Switch, Redirect, RouteComponentProps } from 'react-router-dom'
import { CharacterPage } from './Character'

const Scene: React.FC<RouteComponentProps> = ({ match }) => {
  return (
    <Switch>
      <Route exact path={`${match.path}/:id`} component={CharacterPage} />
      <Route exact path={match.path}>
        <Redirect to="/" />
      </Route>
    </Switch>
  )
}

export default Scene
