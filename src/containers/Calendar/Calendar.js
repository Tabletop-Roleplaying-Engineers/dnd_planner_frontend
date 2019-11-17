import { Calendar as Planner, Drawer, notification, Spin } from 'antd'
import * as R from 'ramda'
import React from 'react'
import NewGameForm from 'forms/NewGameForm'
import ParticipateForm from 'forms/ParticipateForm'
import moment from 'moment'
import { Mutation, Query, withApollo } from 'react-apollo'
import { GamePreview } from 'components/GamePreview'
import { GamesList } from 'components/GamesList'
import { GameInfo, ParticipantsList, GameActions } from 'components/Game'
import { modalWidth } from 'config'
import {
  FETCH_GAMES_QUERY,
  CREATE_GAME_QUERY,
  NEW_GAME_SUBSCRIPTION,
  AVAILABLE_CHARACTERS,
  PARTICIPATE_GAME,
  FETCH_GAME_QUERY
} from 'api'
import { UserContext } from '../../context/userContext'
import { ACTIONS } from '../../constants'

const parseGames = R.pipe(
  R.map(game => ({
    ...game,
    startingDate: moment(parseInt(game.startingDate, 10)).format('YYYY-MM-DD')
  })),
  R.groupBy(
    R.prop('startingDate'),
  )
)

const DRAWERS = {
  NEW_GAME: 'NEW_GAME',
  GAMES_LIST: 'GAMES_LIST',
  GAME: 'GAME',
  PARTICIPATE_GAME: 'PARTICIPATE_GAME',
}

class Calendar extends React.PureComponent {
  static contextType = UserContext

  state = {
    selectedGame: null,
    availableCharacters: [],
    unsubscribeFromGames: null,
    visibleDrawer: null,
    gamesList: [],
    lastSelectedDate: null,
    currentGame: null,
    fetchingCurrentGame: false,
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

          const { newGame } = subscriptionData.data
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

  onCellClick = (date) => {
    const { user } = this.context

    if (!user) {
      return
    }

    if (user.actions.indexOf(ACTIONS.MANAGE_GAMES) >= 0) {
      this.setState({
        visibleDrawer: DRAWERS.NEW_GAME,
        lastSelectedDate: date,
      })
    }
  }

  onGameClick = (games, date) => async e => {
    e.stopPropagation()

    this.setState({
      visibleDrawer: DRAWERS.GAMES_LIST,
      gamesList: games,
      date,
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

  onGameSelect = async game => {
    const { client } = this.props

    const { data: { validCharactersForGame } } = await client.query({
      query: AVAILABLE_CHARACTERS,
      variables: { gameId: game.id },
      fetchPolicy: 'network-only',
    })

    this.setState({
      visibleDrawer: DRAWERS.PARTICIPATE_GAME,
      selectedGame: game,
      availableCharacters: validCharactersForGame
    })
  }

  componentDidMount(prevProps) {
    const { match: { params: { gameId } } } = this.props

    if (gameId) {
      this.fetchCurrentGame(gameId)
    }
  }

  componentDidUpdate(prevProps) {
    const { match: { params: { gameId } } } = this.props

    if (prevProps.match.params.gameId !== gameId && gameId) {
      this.fetchCurrentGame(gameId)
    }
  }

  async fetchCurrentGame(id) {
    const { client: { query } } = this.props

    this.setState({
      fetchingCurrentGame: true,
    })
    const res = await query({
      query: FETCH_GAME_QUERY,
      variables: { id }
    })
    this.setState({
      currentGame: res.data.game,
      fetchingCurrentGame: false,
      visibleDrawer: DRAWERS.GAME,
    })
  }

  onGameDrawerClose() {
    const { history } = this.props

    this.setState({ visibleDrawer: null })
    history.push('/calendar')
  }

  render () {
    const { selectedGame, availableCharacters, gamesList, date, currentGame } = this.state
    const { user } = this.context

    return (
      <>
        <Query query={FETCH_GAMES_QUERY}>
          {({loading, error, data, subscribeToMore}) => {
            if (loading) return <Spin/>
            if (error) return <div>Error: {error.message}</div>

            this.subscribeToNewGame(subscribeToMore)

            const fetchedGames = parseGames(data.games)

            return (
              <Planner
                onSelect={this.onCellClick.bind(this)}
                disabledDate={currentDate =>
                  currentDate.isBefore(moment().startOf('month')) ||
                  currentDate.isAfter(moment().endOf('month'))
                }
                dateCellRender={date => {
                  const games = fetchedGames[date.format('YYYY-MM-DD')] || []

                  return (
                    <>
                      {
                        R.take(1, games).map((game, idx) =>
                          <GamePreview
                            key={idx}
                            mb={10}
                            onClick={this.onGameClick(games, date)}
                            {...game}
                          />
                        )
                      }
                    </>
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
          visible={this.state.visibleDrawer === DRAWERS.NEW_GAME}
          onClose={() => this.setState({ visibleDrawer: null, lastSelectedDate: null })}
        >
          <Mutation mutation={CREATE_GAME_QUERY}>
            {(createGame, {loading}) => (
              <Spin spinning={loading}>
                <NewGameForm
                  initialValue={{
                    date: this.state.lastSelectedDate,
                  }}
                  onSubmit={async (game, form) => {
                    try {
                      await createGame({variables: game})
                      notification.success({
                        message: 'New game added!'
                      })
                      this.setState({ visibleDrawer: null })
                    } catch (error) {
                      notification.error({
                        message: `Error while saving data: ${error.message}`
                      })
                      throw error
                    }
                  }}
                />
              </Spin>
            )}
          </Mutation>
        </Drawer>

        {/* Participate form */}
        <Drawer
          destroyOnClose={true}
          width={modalWidth()}
          placement="right"
          closable={false}
          visible={this.state.visibleDrawer === DRAWERS.PARTICIPATE_GAME}
          onClose={() => this.setState({ visibleDrawer: null })}
        >
          <ParticipateForm
            {...selectedGame}
            availableCharacters={availableCharacters}
            onParticipate={this.onParticipate}
          />
        </Drawer>

        {/* Games list */}
        <Drawer
          destroyOnClose={true}
          width={modalWidth()}
          placement="right"
          closable={false}
          visible={this.state.visibleDrawer === DRAWERS.GAMES_LIST}
          onClose={() => this.setState({ visibleDrawer: null })}
        >
          <GamesList
            games={gamesList}
            date={date}
            onJoinClick={game => this.onGameSelect(game)}
            onNewGameClick={() => this.setState({ visibleDrawer: DRAWERS.NEW_GAME })}
          />
        </Drawer>

        {/* Game */}
        <Drawer
          destroyOnClose={true}
          width={modalWidth()}
          placement="right"
          closable={false}
          visible={this.state.visibleDrawer === DRAWERS.GAME}
          onClose={() => this.onGameDrawerClose()}
        >
          {currentGame && (
            <>
              <GameInfo game={currentGame} />
              <ParticipantsList characters={currentGame.characters} />
              <GameActions game={currentGame} onJoinClick={game => this.onGameSelect(game)} user={user} />
            </>
          )}
        </Drawer>
      </>
    )
  }
}

export default withApollo(Calendar)
