import React, { useContext, useState, useCallback } from 'react'
import { Query, Mutation } from 'react-apollo'
import { FormattedMessage } from 'react-intl'
import { Alert, Spin, Card, Icon, Popconfirm, Empty, Checkbox } from 'antd'
import * as R from 'ramda'
import styled from 'styled-components'
import { FETCH_HOSTED_GAMES_QUERY, DELETE_GAME } from 'api'
import { UserContext } from '../../context/userContext'
import { Box, Flex } from '../../noui/Position'
import { GameInfo } from 'components/Game/GameInfo'
import { useScreenMedia } from 'noui/MediaQuery'
import { parseGame } from 'utils/common'
import { EditGameDrawer } from 'containers/Game/EditGameDrawer'

const Wrapper = styled(Card)`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`
export const HostedGamesTab = () => {
  const [gameForEdit, setGameForEdit] = useState(null)
  const { user } = useContext(UserContext)
  const media = useScreenMedia()
  const [includeOld, setIncludeOld] = useState(false)
  const toggleOld = useCallback(() => {
    setIncludeOld(!includeOld)
  }, [includeOld])
  const _isDesktop = media.isDesktop
  const onCancelEditing = useCallback(() => {
    setGameForEdit(null)
  }, [])
  const includeOldCheckbox = (
    <Box mb={15}>
      <Checkbox onChange={toggleOld} checked={includeOld}>
        <FormattedMessage id="common.includeOld" />
      </Checkbox>
    </Box>
  )

  return (
    <Query
      query={FETCH_HOSTED_GAMES_QUERY}
      variables={{ userId: user.id, includeOld }}
    >
      {(query) => {
        const { loading, error, data, refetch } = query
        const gamesWithDM = (data && data.gamesWithDM) || []
        const parsedGames = gamesWithDM.map(parseGame)

        if (error) {
          return <Alert message="Error" type="error" />
        }

        if (!loading && R.isEmpty(parsedGames))
          return (
            <>
              {includeOldCheckbox}
              <Empty description={<FormattedMessage id="hosted.noData" />} />
            </>
          )

        return (
          <>
            <Spin spinning={loading}>
              {includeOldCheckbox}
              <Flex
                flexDirection={_isDesktop ? 'row' : 'column'}
                justifyContent="space-between"
                flexWrap="wrap"
              >
                {parsedGames.map((game) => (
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
                              title={<FormattedMessage id="hosted.delete" />}
                              icon={
                                <Icon
                                  type="exclamation-circle"
                                  style={{ color: 'red' }}
                                />
                              }
                              onConfirm={deleteGame}
                              okText={<FormattedMessage id="common.yes" />}
                              disabled={loading}
                              cancelText={<FormattedMessage id="common.no" />}
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
}
