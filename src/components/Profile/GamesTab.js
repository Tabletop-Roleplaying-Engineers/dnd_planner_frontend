import React, { useContext } from 'react'
import { FormattedMessage } from 'react-intl'
import { Button, Spin, Alert, Empty, Row, Col } from 'antd'
import * as R from 'ramda'
import { useMutation, useQuery } from '@apollo/client'
import { Flex, Box } from 'noui/Position'
import Card from 'ui/Card'
import Character from 'components/Character'
import { FETCH_GAMES_USER_PLAY_QUERY, LEAVE_GAME } from 'api'
import GameView from 'components/GameView'
import { UserContext } from 'context/userContext'

const getUsersCharacter = (userId, game) => {
  return game.characters.find((character) => character.user.id === userId)
}

export const GamesTab = () => {
  const { loading, error, data = {}, refetch } = useQuery(
    FETCH_GAMES_USER_PLAY_QUERY,
    {
      fetchPolicy: 'cache-and-network',
    },
  )
  const { user } = useContext(UserContext)
  const { gamesUserPlay = [] } = data
  const [leaveGameMutation, { loading: leaveLoading }] = useMutation(
    LEAVE_GAME,
    {
      update: () => {
        refetch()
      },
    },
  )
  const leaveGame = (game) => {
    leaveGameMutation({
      variables: {
        characterId: getUsersCharacter(user.id, game).id,
        gameId: game.id,
      },
    })
  }

  // TODO: Error and result in the same time
  if (error) {
    return <Alert message={error.message} type="error" />
  }

  if (!loading && R.isEmpty(gamesUserPlay))
    return <Empty description={<FormattedMessage id="myGame.noData" />} />

  return (
    <Spin spinning={loading}>
      {gamesUserPlay.map((game) => (
        <Card key={game.id} py={10} px={20} my={10}>
          <Flex column>
            <GameView {...game} />

            <Box mt={10}>
              <Spin spinning={leaveLoading}>
                <Button
                  type="primary"
                  size="large"
                  onClick={() => leaveGame(game)}
                >
                  <FormattedMessage id="game.leaveBtn.label" />
                </Button>
              </Spin>
            </Box>

            <Row>
              {game.characters.map((character) => (
                <Col key={character.id} md={12} lg={8}>
                  <Box p={10}>
                    <Character withBorder {...character} />
                  </Box>
                </Col>
              ))}
            </Row>
          </Flex>
        </Card>
      ))}
    </Spin>
  )
}
