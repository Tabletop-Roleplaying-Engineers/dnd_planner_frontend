import React, { useContext, useState } from 'react';
import * as R from 'ramda'
import { Query, withApollo, Mutation } from 'react-apollo'
import {
  FETCH_HOSTED_GAMES_QUERY,
  END_GAME,
} from 'api'
import { UserContext } from '../../context/userContext'
import { Alert, Spin, Card, Icon, Popconfirm, Drawer, Empty } from 'antd'
import { Box, Flex } from '../../noui/Position'
import { GameInfo } from 'components/Game/GameInfo'
import NewGameForm from 'forms/NewGameForm'
import { modalWidth } from 'config'
import { isDesktop } from 'noui/MediaQuery'

import styled from 'styled-components'

const Wrapper = styled(Card)`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`
export const HostedGamesTab = withApollo(({ client }) => {
  const [showEditGame, setShowEditGame] = useState(false)
  const [gameForEdit, setGameForEdit] = useState(null)
  const { user } = useContext(UserContext);
  const _isDesktop = isDesktop()

  console.log(user)

  return (
    <React.Fragment>

    <Query
      query={FETCH_HOSTED_GAMES_QUERY}
      variables={{ userId: user.id}}
      // pollInterval={1000}
    >
    {(query) => {
      const {loading, error, data, refetch } = query
      const gamesWithDM = data ? data.gamesWithDM || [] : []

      if (error) {
        return <Alert message="Error" type="error" />
      }

      if(!loading && R.isEmpty(gamesWithDM))
        return <Empty description="You are not hosted any games!" />

      return (
        <Spin spinning={loading}>
          <Flex 
            flexDirection={_isDesktop ? 'row' : 'column'} 
            justifyContent="space-between" 
            flexWrap="wrap"
          >
            {
              gamesWithDM.map(game => 
                <Flex mb={10} width={_isDesktop ? '49%' : '100%'} key={game.id}>
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

    <Drawer
      width={modalWidth()}
      placement="right"
      closable={false}
      destroyOnClose={true}
      visible={showEditGame}
      onClose={() => setShowEditGame(false)}
    >
      <Mutation mutation={END_GAME}>
        {(createGame, {loading}) => (
          <Spin spinning={loading}>
            <NewGameForm
              initialValues={gameForEdit}
              onSubmit={async (game, form) => {
                console.log(game)
                // try {
                //   await createGame({variables: game})
                //   notification.success({
                //     message: 'New game added!'
                //   })
                //   this.setState({ visibleDrawer: null })
                // } catch (error) {
                //   notification.error({
                //     message: `Error while saving data: ${error.message}`
                //   })
                //   throw error
                // }
              }}
            />
          </Spin>
        )}
      </Mutation>
    </Drawer>
    </React.Fragment>
  )
})
