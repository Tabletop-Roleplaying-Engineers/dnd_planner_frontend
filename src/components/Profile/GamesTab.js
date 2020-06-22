import React, { useContext } from 'react'
import { Button, Spin, Alert, Empty, Row, Col } from 'antd'
import * as R from 'ramda'
import { Mutation } from 'react-apollo'
import { useQuery } from '@apollo/react-hooks'
import { Flex, Box } from 'noui/Position'
import Card from 'ui/Card'
import Character from 'components/Character'
import { FETCH_GAMES_USER_PLAY_QUERY, LEAVE_GAME } from 'api'
import GameView from 'components/GameView'
import { UserContext } from 'context/userContext'

const getUsersCharacter = (userId, game) => {
  return game.characters.find(character => character.user.id === userId)
}

export const GamesTab = () => {
  const { loading, error, data = {}, refetch } = useQuery(
    FETCH_GAMES_USER_PLAY_QUERY,
  )
  const { user } = useContext(UserContext)
  const { gamesUserPlay = [] } = data

  // TODO: Error and result in the same time
  if (error) {
    return <Alert message={error.message} type="error" />
  }

  if (!loading && R.isEmpty(gamesUserPlay))
    return <Empty description="You are not participated in any game!" />

  return (
    <Spin spinning={loading}>
      {gamesUserPlay.map(game => (
        <Card key={game.id} py={10} px={20} my={10}>
          <Flex column>
            <GameView {...game} />

            <Box mt={10}>
              <Mutation
                mutation={LEAVE_GAME}
                variables={{
                  characterId: getUsersCharacter(user.id, game).id,
                  gameId: game.id,
                }}
                update={(cache, { data: { leaveGame } }) => {
                  refetch()
                }}
              >
                {(leaveGame, { loading }) => (
                  <Spin spinning={loading}>
                    <Button type="primary" size="large" onClick={leaveGame}>
                      Leave Game
                    </Button>
                  </Spin>
                )}
              </Mutation>
            </Box>

            <Row>
              {game.characters.map(character => (
                <Col key={character.id} md={12} lg={8}>
                  <Box p={10}>
                    <Character {...character} />
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
