import React from 'react'
import * as R from 'ramda'
import { Drawer, notification, Spin } from 'antd'
import styled from 'styled-components'
import { Query, withApollo } from 'react-apollo'
import { GamesList } from 'components/GamesList'
import { Calendar as Planner } from 'components/Calendar'
import { GameInfo, ParticipantsList, GameParticipation } from 'components/Game'
import { modalWidth } from 'config'
import {
  FETCH_GAMES_QUERY,
  NEW_GAME_SUBSCRIPTION,
  PARTICIPATE_GAME,
  FETCH_GAME_QUERY,
  REMOVE_CHARACTER_FROM_GAME_MUTATION,
  FETCH_GAMES_USER_PLAY_QUERY,
} from 'api'
import { UserContext } from '../../context/userContext'
import { EditGameDrawer } from 'containers/Game/EditGameDrawer'

const PlannerWrapper = styled.div`
  margin-top: 10px;
`

const LoaderWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.1);
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`

const DRAWERS = {
  NEW_GAME: 'NEW_GAME',
  GAMES_LIST: 'GAMES_LIST',
  GAME: 'GAME',
  PARTICIPATE_GAME: 'PARTICIPATE_GAME',
}

class Calendar extends React.PureComponent {
  static contextType = UserContext

  state = {
    unsubscribeFromGames: null,
    visibleDrawer: null,
    gamesList: [],
    lastSelectedDate: null,
    currentGame: null,
    fetchingCurrentGame: false,
    date: false,
    from: '0',
    to: '0',
  }

  subscribeToNewGame = async (subscribeToMore) => {
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
            games: [...prev.games, newGame],
          }
        },
      }),
    })
  }

  onGameClick = (games, date) => {
    this.setState({
      visibleDrawer: DRAWERS.GAMES_LIST,
      gamesList: games,
      date,
    })
  }

  onParticipate = async (character) => {
    const { client } = this.props
    const { currentGame } = this.state

    await client
      .mutate({
        mutation: PARTICIPATE_GAME,
        variables: {
          gameId: currentGame.id,
          characterId: character.id,
        },
        update: (cache, { data: { participateGame } }) => {
          const { from, to } = this.state
          const { games } = cache.readQuery({
            query: FETCH_GAMES_QUERY,
            variables: {
              from,
              to,
            },
          })

          const idx = R.findIndex(R.propEq('id', participateGame.id))(games)
          const updatedGame = { ...games[idx], ...participateGame }

          cache.writeQuery({
            query: FETCH_GAMES_QUERY,
            data: { games: [...R.remove(idx, 1, games), updatedGame] },
          })

          this.setState({ currentGame: { ...currentGame, ...participateGame } })
        },
        refetchQueries: [{ query: FETCH_GAMES_USER_PLAY_QUERY }],
      })
      .catch((error) => {
        notification.error({
          message: error.message,
        })
      })
  }

  componentDidMount() {
    const {
      match: {
        params: { gameId },
      },
    } = this.props

    if (gameId) {
      this.fetchCurrentGame(gameId)
    }
  }

  componentDidUpdate(prevProps) {
    const {
      match: {
        params: { gameId },
      },
    } = this.props

    if (prevProps.match.params.gameId !== gameId && gameId) {
      this.fetchCurrentGame(gameId)
    }
  }

  async fetchCurrentGame(id) {
    const {
      client: { query },
    } = this.props

    this.setState({
      fetchingCurrentGame: true,
    })
    const res = await query({
      query: FETCH_GAME_QUERY,
      variables: { id },
      fetchPolicy: 'network-only',
    })
    this.setState({
      currentGame: {
        ...res.data.game,
        startingDate: new Date(res.data.game.startingDate),
      },
      fetchingCurrentGame: false,
      visibleDrawer: DRAWERS.GAME,
    })
  }

  onGameDrawerClose() {
    const { history } = this.props

    this.setState({ visibleDrawer: null })
    history.push('/calendar')
  }

  onRangeChanged = (from, to) => {
    this.setState({
      from,
      to,
    })
  }

  onRemoveCharClick = async (game, character) => {
    const { client } = this.props

    await client
      .mutate({
        mutation: REMOVE_CHARACTER_FROM_GAME_MUTATION,
        variables: {
          gameId: game.id,
          characterId: character.id,
        },
        update: (cache) => {
          const { from, to } = this.state
          const { games } = cache.readQuery({
            query: FETCH_GAMES_QUERY,
            variables: {
              from,
              to,
            },
          })

          const idx = R.findIndex(R.propEq('id', game.id))(games)
          const charIndex = R.findIndex(R.propEq('id', character.id))(
            game.characters,
          )
          game.characters.splice(charIndex, 1)
          const updatedGame = {
            ...game,
            startingDate: game.startingDate.getTime().toString(),
          }
          const updatedGames = {
            games: [...R.remove(idx, 1, games), updatedGame],
          }

          cache.writeQuery({
            query: FETCH_GAMES_QUERY,
            data: updatedGames,
          })

          this.setState({ currentGame: { ...game } })
        },
      })
      .catch((error) => {
        notification.error({
          message: error.message,
        })
      })
  }

  render() {
    const { gamesList, date, currentGame, from, to } = this.state
    const { user } = this.context

    return (
      <>
        <Query
          query={FETCH_GAMES_QUERY}
          variables={{ from, to }}
          fetchPolicy="network-only"
        >
          {({ loading, error, data, subscribeToMore }) => {
            if (error) return <div>Error: {error.message}</div>

            this.subscribeToNewGame(subscribeToMore)

            return (
              <PlannerWrapper>
                <Planner
                  games={data.games || []}
                  onCellClick={({ date, games }) => {
                    this.onGameClick(games, date)
                  }}
                  onRangeChanged={this.onRangeChanged}
                />
                {loading && (
                  <LoaderWrapper data-testid="calendar-spinner">
                    <Spin />
                  </LoaderWrapper>
                )}
              </PlannerWrapper>
            )
          }}
        </Query>

        {/* Game form */}
        <EditGameDrawer
          game={
            this.state.visibleDrawer === DRAWERS.NEW_GAME && {
              startingDate: this.state.lastSelectedDate,
              tags: ['AL', 'Newbies allowed'],
              userId: user.id,
            }
          }
          onUpdated={() => this.setState({ visibleDrawer: null })}
          onCancel={() => this.setState({ visibleDrawer: null })}
        />

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
            onNewGameClick={() =>
              this.setState({
                visibleDrawer: DRAWERS.NEW_GAME,
                lastSelectedDate: date,
              })
            }
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
              <ParticipantsList
                characters={currentGame.characters}
                game={currentGame}
                user={user}
                onRemoveCharClick={(char) =>
                  this.onRemoveCharClick(currentGame, char)
                }
              />
              {currentGame.characters.length < currentGame.players && (
                <GameParticipation
                  game={currentGame}
                  onParticipate={this.onParticipate}
                  onLeave={() => this.fetchCurrentGame(currentGame.id)}
                />
              )}
            </>
          )}
        </Drawer>
      </>
    )
  }
}

export default withApollo(Calendar)
