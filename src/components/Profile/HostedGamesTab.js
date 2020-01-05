import React, { useContext } from 'react';
import { Query } from 'react-apollo'
import {
  FETCH_HOSTED_GAMES_QUERY
} from 'api'
import { UserContext } from '../../context/userContext'
import { Alert, Spin } from 'antd'
import { Box, Flex } from '../../noui/Position'
import { GameInfo } from 'components/Game/GameInfo'

export const HostedGamesTab = () => {
  const { user } = useContext(UserContext);
  console.log(user)

  return (
    <Query
      query={FETCH_HOSTED_GAMES_QUERY}
      variables={{ userId: user.id}}
    >
    {({loading, error, data }) => {
      const gamesWithDM = data ? data.gamesWithDM || [] : []

      if (error) {
        return <Alert message="Error" type="error" />
      }

      return (
        <Spin spinning={loading}>
          <Flex column>
            {
              gamesWithDM.map(game => 
                <Flex>
                  <Box width="50%">
                    <GameInfo game={game} />
                  </Box>

                  <Flex column ml={20}>
                    <button>DELETE</button>
                  </Flex>
                </Flex>
              )
            }
            </Flex>
        </Spin>
      )
    }}
  </Query>
  )
}
