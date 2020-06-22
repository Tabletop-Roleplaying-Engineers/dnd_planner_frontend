import { Drawer, notification, Spin } from 'antd'
import * as R from 'ramda'
import React from 'react'
import NewGameForm from 'forms/NewGameForm'
import styled from 'styled-components'
import { Mutation, Query, withApollo } from 'react-apollo'
import { GamesList } from 'components/GamesList'
import { Calendar as Planner } from 'components/Calendar'
import { GameInfo, ParticipantsList, GameParticipation } from 'components/Game'
import { modalWidth } from 'config'
import {
  FETCH_GAMES_QUERY,
  CREATE_GAME_QUERY,
  NEW_GAME_SUBSCRIPTION,
  PARTICIPATE_GAME,
  FETCH_GAME_QUERY,
} from 'api'
import { UserContext } from '../../context/userContext'

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

  onParticipate = async character => {
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
      })
      .catch(error => {
        notification.error({
          message: error.message,
        })
      })
  }

  componentDidMount(prevProps) {
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
    })
    this.setState({
      currentGame: {
        ...res.data.game,
        startingDate: new Date(parseInt(res.data.game.startingDate, 10)),
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

  render() {
    const { gamesList, date, currentGame, from, to } = this.state

    return (
      <>
        <Query query={FETCH_GAMES_QUERY} variables={{ from, to }}>
          {({ loading, error, data, subscribeToMore }) => {
            if (error) return <div>Error: {error.message}</div>

            this.subscribeToNewGame(subscribeToMore)

            return (
              <PlannerWrapper>
                <Planner
                  games={data.games || []}
                  onCellClick={({ date, games }) =>
                    this.onGameClick(games, date)
                  }
                  onRangeChanged={this.onRangeChanged}
                />
                {loading && (
                  <LoaderWrapper>
                    <Spin />
                  </LoaderWrapper>
                )}
              </PlannerWrapper>
            )
          }}
        </Query>

        <Drawer
          width={modalWidth()}
          placement="right"
          closable={false}
          destroyOnClose={true}
          visible={this.state.visibleDrawer === DRAWERS.NEW_GAME}
          onClose={() =>
            this.setState({ visibleDrawer: null, lastSelectedDate: null })
          }
        >
          <Mutation mutation={CREATE_GAME_QUERY}>
            {(createGame, { loading }) => (
              <Spin spinning={loading}>
                <NewGameForm
                  showSharing
                  initialValues={{
                    startingDate: this.state.lastSelectedDate,
                    tags: ['AL', 'Newbies allowed'],
                  }}
                  onSubmit={async (game, form) => {
                    try {
                      await createGame({ variables: game })
                      notification.success({
                        message: 'New game added!',
                      })
                      this.setState({ visibleDrawer: null })
                    } catch (error) {
                      const msg = error.graphQLErrors
                        .map(err => err.message)
                        .join('; ')
                      notification.error({
                        message: `Error while saving data: ${msg}`,
                      })
                      throw error
                    }
                  }}
                />
              </Spin>
            )}
          </Mutation>
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
              <ParticipantsList characters={currentGame.characters} />
              {currentGame.characters.length < currentGame.players && (
                <GameParticipation
                  {...currentGame}
                  onParticipate={this.onParticipate}
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
