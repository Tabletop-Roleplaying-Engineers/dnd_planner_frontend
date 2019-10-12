import React from 'react'
import { Button, Spin, Alert } from 'antd'
import * as R from 'ramda'
import { Flex } from 'noui/Position'
import Card from 'ui/Card'
import Character from 'components/Character'
import { Mutation, Query } from 'react-apollo'
import {
  FETCH_CHARACTERS_QUERY,
  LEAVE_GAME
} from 'api'
import GameView from 'components/GameView'

export const GamesTab = () => {
  return (
    <Query query={FETCH_CHARACTERS_QUERY}>
      {({loading, error, data: { characters = [] } }) => {
        if (error) {
          return <Alert message="You have to login to enter this page" type="error" />
        }

        return (
          <Spin spinning={loading}>
            {
              characters
              .filter(c => c.game)
              .map(character =>
                <Card key={character.id} py={10} px={20} my={10}>
                  <Flex column>
                    <GameView {...character.game} />

                    <Flex mt={20} justifyContent="space-between">
                      <Character {...character} />

                      <Mutation
                        mutation={LEAVE_GAME}
                        variables={{characterId: character.id}}
                        update={(cache, {data: {leaveGame}}) => {
                          const {characters} = cache.readQuery({query: FETCH_CHARACTERS_QUERY})

                          cache.writeQuery({
                            query: FETCH_CHARACTERS_QUERY,
                            data: {characters: R.reject(R.propEq('id', leaveGame.id), characters)}
                          })
                        }}
                      >
                        {(leaveGame, {loading}) => (
                          <Spin spinning={loading}>
                            <Button
                              type="primary"
                              size="large"
                              onClick={leaveGame}
                            >
                              Leave Game
                            </Button>
                          </Spin>
                        )}
                      </Mutation>

                    </Flex>
                  </Flex>
                </Card>)
            }
          </Spin>
        )
      }}
    </Query>
  )
}
