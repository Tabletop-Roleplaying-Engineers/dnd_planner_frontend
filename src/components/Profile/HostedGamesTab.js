import React, { useContext, useState, useCallback } from 'react'
import { Query, withApollo, Mutation } from 'react-apollo'
import { FETCH_HOSTED_GAMES_QUERY, DELETE_GAME, UPDATE_GAME_QUERY } from 'api'
import { UserContext } from '../../context/userContext'
import { Alert, Spin, Card, Icon, Popconfirm, Drawer, Empty, Modal } from 'antd'
import { Box, Flex } from '../../noui/Position'
import { GameInfo } from 'components/Game/GameInfo'
import GameForm from 'forms/GameForm'
import { modalWidth } from 'config'
import { isDesktop } from 'noui/MediaQuery'
import * as R from 'ramda'
import styled from 'styled-components'
import { parseGame } from 'utils/common'

const Wrapper = styled(Card)`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`
export const HostedGamesTab = withApollo(({ client }) => {
  const [showEditGame, setShowEditGame] = useState(false)
  const [cancelEditingConfirmation, setCancelEditingConfirmation] = useState(
    false,
  )
  const [gameForEdit, setGameForEdit] = useState(null)
  const { user } = useContext(UserContext)
  const _isDesktop = isDesktop()
  const onCancelEditing = useCallback(() => {
    setShowEditGame(false)
    setCancelEditingConfirmation(false)
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
                            setShowEditGame(true)
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

            <Drawer
              width={modalWidth()}
              placement="right"
              closable={false}
              destroyOnClose={true}
              visible={showEditGame}
              onClose={() => setCancelEditingConfirmation(true)}
            >
              <Mutation mutation={UPDATE_GAME_QUERY}>
                {(updateGame, { loading }) => (
                  <Spin spinning={loading}>
                    <GameForm
                      showSharing
                      initialValues={gameForEdit}
                      onSubmit={async (game, form) => {
                        await updateGame({ variables: game })
                        setShowEditGame(false)
                        refetch()
                      }}
                    />
                  </Spin>
                )}
              </Mutation>
            </Drawer>

            {/* Cancel editing confirmation dialog */}
            <Modal
              title="Cancel editing"
              visible={cancelEditingConfirmation}
              onOk={() => onCancelEditing(false)}
              onCancel={() => setCancelEditingConfirmation(false)}
            >
              <p>Are you sure that you want to cancel editing?</p>
            </Modal>
          </>
        )
      }}
    </Query>
  )
})
