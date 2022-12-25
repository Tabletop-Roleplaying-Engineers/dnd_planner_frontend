import React, { useCallback, useContext, useEffect, useState } from 'react'
import * as R from 'ramda'
import { Alert, Drawer, notification, Spin } from 'antd'
import styled from 'styled-components'
import { useApolloClient, useQuery, useSubscription } from '@apollo/client'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router'
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
import { Game } from 'types/game'
import { Character } from 'types/character'

type Range = { from: Date; to: Date }
export function CalendarContainer() {
  let { gameId } = useParams<{ gameId: string }>()
  const { user } = useContext(UserContext)
  const navigate = useNavigate()
  const [range, setRange] = useState<Range>()
  const [visibleDrawer, setVisibleDrawer] = useState<Drawers | null>(null)
  const [gamesList, setGamesList] = useState<Game[]>([])
  const [date, setDate] = useState<Date | null>(null)
  const [lastSelectedDate, setLastSelectedDate] = useState<Date | null>(null)
  const [currentGame, setCurrentGame] = useState<Game | null>(null)
  const [fetchingCurrentGame, setFetchingCurrentGame] = useState(false)
  const client = useApolloClient()
  const { loading, data, error } = useQuery<{ games: Game[] }, Range>(
    FETCH_GAMES_QUERY,
    {
      fetchPolicy: 'network-only',
      skip: !range,
      variables: range,
    },
  )

  const onCellClick = useCallback(
    ({ date, games }: { games: Game[]; date: Date }) => {
      setVisibleDrawer(DRAWERS.GAMES_LIST)
      setGamesList(games)
      setDate(date)
    },
    [],
  )
  const closeDrawer = useCallback(() => {
    setVisibleDrawer(null)
    setCurrentGame(null)
  }, [])
  const onGameDrawerClose = useCallback(() => {
    closeDrawer()
    navigate('/calendar')
  }, [closeDrawer, navigate])
  const onRemoveCharClick = useCallback(
    // TODO: fix any, there is some problem with types (game.startingDate)
    async (game: any, character: Character) => {
      await client
        .mutate({
          mutation: REMOVE_CHARACTER_FROM_GAME_MUTATION,
          variables: {
            gameId: game.id,
            characterId: character.id,
          },
          update: (cache) => {
            if (!range) {
              return
            }
            const { from, to } = range
            const query = cache.readQuery<{ games: Game[] }>({
              query: FETCH_GAMES_QUERY,
              variables: {
                from,
                to,
              },
            })
            if (!query) {
              return
            }
            const { games } = query

            const idx = R.findIndex(R.propEq('id', game.id))(games)
            const charIndex = R.findIndex(R.propEq('id', character.id))(
              game.characters,
            )
            const updatedGame = {
              ...game,
              startingDate: game.startingDate.toISOString(),
              characters: [game.characters],
            }
            updatedGame.characters.splice(charIndex, 1)
            const updatedGames = {
              games: [...R.remove(idx, 1, games), updatedGame],
            }

            cache.writeQuery({
              query: FETCH_GAMES_QUERY,
              data: updatedGames,
            })

            setCurrentGame({ ...updatedGame })
          },
        })
        .catch((error) => {
          notification.error({
            message: error.message,
          })
        })
    },
    [client, range],
  )
  const onParticipate = useCallback(
    async (character: Character) => {
      if (!currentGame) {
        return
      }

      await client
        .mutate({
          mutation: PARTICIPATE_GAME,
          variables: {
            gameId: currentGame.id,
            characterId: character.id,
          },
          update: (cache, { data: { participateGame } }) => {
            if (!range) {
              return
            }
            const { from, to } = range
            const query = cache.readQuery<{ games: Game[] }>({
              query: FETCH_GAMES_QUERY,
              variables: {
                from,
                to,
              },
            })
            if (!query) {
              return
            }
            const { games } = query

            const idx = R.findIndex(R.propEq('id', participateGame.id))(games)
            const updatedGame = { ...games[idx], ...participateGame }

            cache.writeQuery({
              query: FETCH_GAMES_QUERY,
              data: { games: [...R.remove(idx, 1, games), updatedGame] },
            })

            setCurrentGame({ ...currentGame, ...participateGame })
          },
          refetchQueries: [{ query: FETCH_GAMES_USER_PLAY_QUERY }],
        })
        .catch((error) => {
          notification.error({
            message: error.message,
          })
        })
    },
    [client, currentGame, range],
  )
  const fetchCurrentGame = useCallback(
    async (id: string) => {
      setFetchingCurrentGame(true)
      const res = await client.query({
        query: FETCH_GAME_QUERY,
        variables: { id },
        fetchPolicy: 'network-only',
      })
      setCurrentGame({
        ...res.data.game,
        startingDate: new Date(res.data.game.startingDate),
      })
      setFetchingCurrentGame(false)
      setVisibleDrawer(DRAWERS.GAME)
    },
    [client],
  )
  const onSubscription = useCallback(
    // TODO: fix any
    ({ subscriptionData: { data } }: any) => {
      if (!data || !range) {
        return
      }
      const { newGame } = data

      const { from, to } = range
      const query = client.readQuery<{ games: Game[] }>({
        query: FETCH_GAMES_QUERY,
        variables: { from, to },
      })

      if (!query) {
        return
      }

      const { games } = query

      const exists = games.find(({ id }) => id === newGame.id)

      if (exists) return

      client.writeQuery({
        query: FETCH_GAMES_QUERY,
        data: {
          games: [...games, newGame],
        },
        variables: { from, to },
      })
    },
    [client, range],
  )

  useSubscription<{ newGame: Game }>(NEW_GAME_SUBSCRIPTION, {
    onSubscriptionData: onSubscription,
  })

  useEffect(() => {
    if (gameId && gameId !== currentGame?.id) {
      fetchCurrentGame(gameId)
    }
  }, [currentGame, fetchCurrentGame, gameId])

  const onRangeChanged = useCallback((from: Date | null, to: Date | null) => {
    if (from && to) {
      setRange({ from, to })
    }
  }, [])

  if (error) {
    return <Alert message={error.message} type="error" />
  }

  return (
    <>
      <PlannerWrapper>
        <Planner
          games={data?.games || []}
          onCellClick={onCellClick}
          onRangeChanged={onRangeChanged}
        />
        {(loading || fetchingCurrentGame) && (
          <LoaderWrapper data-testid="calendar-spinner">
            <Spin />
          </LoaderWrapper>
        )}
      </PlannerWrapper>

      {/* Game form */}
      <EditGameDrawer
        game={
          visibleDrawer === DRAWERS.NEW_GAME && {
            startingDate: lastSelectedDate,
            tags: ['AL', 'Newbies allowed'],
            userId: user?.id,
          }
        }
        onUpdated={closeDrawer}
        onCancel={closeDrawer}
      />

      {/* Games list */}
      <Drawer
        destroyOnClose={true}
        width={modalWidth()}
        placement="right"
        closable={false}
        open={visibleDrawer === DRAWERS.GAMES_LIST}
        onClose={closeDrawer}
      >
        <GamesList
          games={gamesList}
          date={date}
          onNewGameClick={() => {
            setLastSelectedDate(date)
            setVisibleDrawer(DRAWERS.NEW_GAME)
          }}
        />
      </Drawer>

      {/* Game */}
      <Drawer
        destroyOnClose={true}
        width={modalWidth()}
        placement="right"
        closable={false}
        open={visibleDrawer === DRAWERS.GAME}
        onClose={onGameDrawerClose}
      >
        {currentGame && (
          <>
            <GameInfo game={currentGame} />
            <ParticipantsList
              characters={currentGame.characters}
              game={currentGame}
              user={user}
              onRemoveCharClick={(char: Character) =>
                onRemoveCharClick(currentGame, char)
              }
            />
            {currentGame.characters.length < currentGame.players && (
              <GameParticipation
                game={currentGame}
                onParticipate={onParticipate}
                onLeave={() => fetchCurrentGame(currentGame.id)}
              />
            )}
          </>
        )}
      </Drawer>
    </>
  )
}

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
} as const

type Drawers = keyof typeof DRAWERS
