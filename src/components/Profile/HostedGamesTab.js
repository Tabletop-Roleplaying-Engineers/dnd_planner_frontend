import React from 'react';
import { Mutation, Query } from 'react-apollo'
import {
  FETCH_HOSTED_GAMES_QUERY
} from 'api'
import { Alert, Spin } from 'antd'
import { Flex } from '../../noui/Position'
import GameView from 'components/GameView'

export const HostedGamesTab = () => {

    return (        
      <Query 
        query={FETCH_HOSTED_GAMES_QUERY}
        variables={{ userId: "123"}}  
      >
      {({loading, error, data: { gamesWithDM = []}}) => {
        if (error) {
          return <Alert message="Error" type="error" />
        }

        return (
          <Spin spinning={loading}>
            <Flex column>
              {
                gamesWithDM
                  .map(game => <GameView {...game} />)
              }
              </Flex>
          </Spin>
        )
      }}
    </Query>
    )
}