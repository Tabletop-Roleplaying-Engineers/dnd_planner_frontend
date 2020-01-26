import React, { useContext } from 'react';
import * as R from 'ramda'
import { Query, withApollo, Mutation } from 'react-apollo'
import {
  FETCH_HOSTED_GAMES_QUERY,
  END_GAME,
} from 'api'
import { UserContext } from '../../context/userContext'
import { Alert, Spin, Card, Icon, Popconfirm } from 'antd'
import { Box, Flex } from '../../noui/Position'
import { GameInfo } from 'components/Game/GameInfo'
import styled from 'styled-components'

const Wrapper = styled(Card)`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`
export const HostedGamesTab = withApollo(({ client }) => {
  const { user } = useContext(UserContext);
  console.log(user)

  return (
    <Query
      query={FETCH_HOSTED_GAMES_QUERY}
      variables={{ userId: user.id}}
      // pollInterval={1000}
    >
    {(query) => {
      const {loading, error, data, refetch } = query
      debugger
      const gamesWithDM = data ? data.gamesWithDM || [] : []

      if (error) {
        return <Alert message="Error" type="error" />
      }

      return (
        <Spin spinning={loading}>
          <Flex justifyContent="space-between" flexWrap="wrap">
            {
              gamesWithDM.map(game => 
                <Flex mb={10} width="49%" key={game.id}>
                  <Wrapper
                    width="100%"
                    actions={[
                      <Icon type="edit" key="edit" />,
                      <Mutation
                        mutation={END_GAME}
                        variables={{ gameId: game.id }}
                        update={() => { refetch() }}
                        >
                        {(deleteGame, {loading}) => (
                          <Popconfirm
                          title="Do you want permanently delete game?"
                          icon={<Icon type="exclamation-circle" style={{ color: 'red' }} />}
                          onConfirm={deleteGame}
                          okText="Yes"
                          cancelText="No"
                        >
                          <Icon type="delete" key="delete" />
                        </Popconfirm>
                        )}
                      </Mutation>,
                    ]}  
                  >
                    <Box>
                      <GameInfo 
                        game={game}
                        showTags
                      />
                    </Box>
                  </Wrapper>
                </Flex>
              )
            }
            </Flex>
        </Spin>
      )
    }}
  </Query>
  )
})
