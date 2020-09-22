import React, { useContext, useState, useCallback } from 'react'
import { Query, withApollo, Mutation } from 'react-apollo'
import { Alert, Spin, Card, Icon, Popconfirm, Empty } from 'antd'
import * as R from 'ramda'
import styled from 'styled-components'
import { FETCH_HOSTED_GAMES_QUERY, DELETE_GAME } from 'api'
import { UserContext } from '../../context/userContext'
import { Box, Flex } from '../../noui/Position'
import { GameInfo } from 'components/Game/GameInfo'
import { isDesktop } from 'noui/MediaQuery'
import { parseGame } from 'utils/common'
import { EditGameDrawer } from 'containers/Game/EditGameDrawer'

const Wrapper = styled(Card)`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`
export const HostedGamesTab = withApollo(({ client }) => {
  const [gameForEdit, setGameForEdit] = useState(null)
  const { user } = useContext(UserContext)
  const _isDesktop = isDesktop()
  const onCancelEditing = useCallback(() => {
    setGameForEdit(null)
  }, [])

  return (
    <Query
      query={FETCH_HOSTED_GAMES_QUERY}
      variables={{ userId: user.id }}
      // pollInterval={1000}
    >
      {query => {
        const { loading, error, data, refetch } = query
        const gamesWithDM = (data && data.gamesWithDM) || []
        const parsedGames = gamesWithDM.map(parseGame)

        if (error) {
          return <Alert message="Error" type="error" />
        }

        if (!loading && R.isEmpty(parsedGames))
          return <Empty description="You are not hosted any games!" />

        return (
          <>
            <Spin spinning={loading}>
              <Flex
                flexDirection={_isDesktop ? 'row' : 'column'}
                justifyContent="space-between"
                flexWrap="wrap"
              >
                {parsedGames.map(game => (
                  <Flex
                    mb={10}
                    width={_isDesktop ? '49%' : '100%'}
                    key={game.id}
                  >
                    <Wrapper
                      width="100%"
                      actions={[
                        <Icon
                          type="edit"
                          key="edit"
                          onClick={() => {
                            setGameForEdit(game)
                          }}
                        />,

                        <Mutation
                          mutation={DELETE_GAME}
                          variables={{ id: game.id }}
                          update={() => {
                            refetch()
                          }}
                        >
                          {(deleteGame, { loading }) => (
                            <Popconfirm
                              title="Do you want permanently delete game?"
                              icon={
                                <Icon
                                  type="exclamation-circle"
                                  style={{ color: 'red' }}
                                />
                              }
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
                        <GameInfo game={game} showTags />
                      </Box>
                    </Wrapper>
                  </Flex>
                ))}
              </Flex>
            </Spin>

            {/* Edit game */}
            <EditGameDrawer
              game={gameForEdit}
              onUpdated={() => {
                setGameForEdit(null)
                refetch()
              }}
              onCancel={onCancelEditing}
            />
          </>
        )
      }}
    </Query>
  )
})
