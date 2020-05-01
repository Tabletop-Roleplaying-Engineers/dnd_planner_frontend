import React from 'react'
import { Button, Spin, Alert, Empty } from 'antd'
import * as R from 'ramda'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { Flex } from 'noui/Position'
import Card from 'ui/Card'
import Character from 'components/Character'
import { LEAVE_GAME } from 'api'
import { FETCH_CHARACTERS_IN_GAME_QUERY } from 'api/characters'
import GameView from 'components/GameView'

export const GamesTab = () => {
  const { loading, error, data = {} } = useQuery(FETCH_CHARACTERS_IN_GAME_QUERY)
  const [leaveGame, { loading: leaveLoading }] = useMutation(LEAVE_GAME, {
    update: (cache, { data: { leaveGame } }) => {
      const { charactersInGame } = cache.readQuery({
        query: FETCH_CHARACTERS_IN_GAME_QUERY,
      })

      cache.writeQuery({
        query: FETCH_CHARACTERS_IN_GAME_QUERY,
        data: {
          charactersInGame: R.reject(
            R.propEq('id', leaveGame.id),
            charactersInGame,
          ),
        },
      })
    },
  })
  const onLeaveClick = characterId => {
    leaveGame({ variables: { characterId } })
  }

  if (error) {
    return <Alert message="You have to login to enter this page" type="error" />
  }

  const { charactersInGame } = data

  if (loading) {
    return <Spin />
  }
  if (!loading && R.isEmpty(charactersInGame)) {
    return <Empty description="You are not participated in any game!" />
  }

  return (
    <>
      {charactersInGame.map(character => (
        <Card key={character.id} py={10} px={20} my={10}>
          <Flex column>
            <GameView {...character.game} />

            <Flex mt={20} justifyContent="space-between">
              <Character {...character} />
              <Button
                type="primary"
                size="large"
                loading={leaveLoading}
                onClick={() => onLeaveClick(character.id)}
              >
                Leave Game
              </Button>
            </Flex>
          </Flex>
        </Card>
      ))}
    </>
  )
}
