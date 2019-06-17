import { Calendar as Planner, Drawer, notification, Spin } from 'antd'
import * as R from 'ramda'
import React from 'react'
import NewGameForm from 'forms/NewGameForm'
import ParticipateForm from 'forms/ParticipateForm'
import moment from 'moment'
import { GameInfo } from 'components/GameInfo'
import { modalWidth } from 'config'
import { Mutation, Query, withApollo } from 'react-apollo'
import {
  FETCH_GAMES_QUERY,
  CREATE_GAME_QUERY,
  NEW_GAME_SUBSCRIPTION,
  AVAILABLE_CHARACTERS,
  PARTICIPATE_GAME
} from 'api'

const parseGames = R.pipe(
  R.map(game => ({
    ...game,
    startingDate: moment(parseInt(game.startingDate, 10)).format('YYYY-MM-DD')
  })),
  R.groupBy(
    R.prop('startingDate'),
  )
)

class Calendar extends React.PureComponent {
  state = {
    newGameFormVisibility: false,
    participateGameVisibility: false,
    selectedGame: null,
    availableCharacters: [],
    unsubscribeFromGames: null,
  }

  subscribeToNewGame = async subscribeToMore => {
    if (this.state.unsubscribeFromGames) {
      // We don't need to subscribe several times
      return
    }

    this.setState({
      unsubscribeFromGames: subscribeToMore({
        document: NEW_GAME_SUBSCRIPTION,
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) return prev

          const newGame = subscriptionData.data.newGame
          const exists = prev.games.find(({ id }) => id === newGame.id)

          if (exists) return prev

          return {
            ...prev,
            games: [
              ...prev.games,
              newGame,
            ],
          }
        }
      })
    })
  }

  onGameInfo = game => async e => {
    e.stopPropagation()

    const {client} = this.props

    const {data: {validCharactersForGame}} = await client.query({
      query: AVAILABLE_CHARACTERS,
      variables: {gameId: game.id},
    })

    this.setState({
      participateGameVisibility: true,
      selectedGame: game,
      availableCharacters: validCharactersForGame
    })
  }

  onParticipate = async character => {
    const {client} = this.props
    const {selectedGame} = this.state

    await client.mutate({
      mutation: PARTICIPATE_GAME,
      variables: {
        gameId: selectedGame.id,
        characterId: character.id
      },
      update: (cache, {data: {participateGame}}) => {
        const { games } = cache.readQuery({query: FETCH_GAMES_QUERY})

        const idx = R.findIndex(R.propEq('id', participateGame.id))(games)
        const updatedGame = { ...games[idx], ...participateGame }

        cache.writeQuery({
          query: FETCH_GAMES_QUERY,
          data: {games: [...R.remove(idx, 1, games), updatedGame]},
        })

        this.setState({ selectedGame: updatedGame })
      }
    })
  }

  render () {
    const {selectedGame, availableCharacters} = this.state
    debugger
    return (
      <React.Fragment>
        <Query query={FETCH_GAMES_QUERY}>
          {({loading, error, data, subscribeToMore}) => {
            debugger
            if (loading) return <Spin/>
            if (error) return <div>Error: {error.message}</div>
            debugger
            this.subscribeToNewGame(subscribeToMore)

            const fetchedGames = parseGames(data.games)

            return (
              <Planner
                onSelect={(...data) => this.setState({newGameFormVisibility: true})}
                disabledDate={currentDate =>
                  currentDate.isBefore(moment().startOf('month')) ||
                  currentDate.isAfter(moment().endOf('month'))
                }
                dateCellRender={date => {
                  const games = fetchedGames[date.format('YYYY-MM-DD')] || []
                  debugger
                  return (
                    <React.Fragment>
                      {
                        games.map((game, idx) =>
                          <GameInfo
                            key={idx}
                            mb={10}
                            onClick={this.onGameInfo(game)}
                            {...game}
                          />
                        )
                      }
                    </React.Fragment>
                  )
                }}
              />
            )
          }}
        </Query>

        <Drawer
          width={modalWidth()}
          placement="right"
          closable={false}
          destroyOnClose={true}
          visible={this.state.newGameFormVisibility}
          onClose={() => this.setState({newGameFormVisibility: false})}
        >
          <Mutation mutation={CREATE_GAME_QUERY}>
            {(createGame, {loading}) => (
              <Spin spinning={loading}>
                <NewGameForm
                  onSubmit={async (game, form) => {
                    try {
                      await createGame({variables: game})
                      notification.success({
                        message: 'New game added!'
                      })
                      this.setState({newGameFormVisibility: false})
                    } catch (error) {
                      notification.error({
                        message: `Error while saving data: ${error.message}`
                      })
                    }
                  }}
                />
              </Spin>
            )}
          </Mutation>
        </Drawer>

        <Drawer
          destroyOnClose={true}
          width={modalWidth()}
          placement="right"
          closable={false}
          visible={this.state.participateGameVisibility}
          onClose={() => this.setState({participateGameVisibility: false})}
        >
          <ParticipateForm
            {...selectedGame}
            availableCharacters={availableCharacters}
            onParticipate={this.onParticipate}
          />
        </Drawer>
      </React.Fragment>
    )
  }
}

export default withApollo(Calendar)
