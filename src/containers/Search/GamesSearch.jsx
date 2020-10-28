import React from 'react'
import { GamesSearch } from 'components/Search/GamesSearch'
import { useQuery } from '@apollo/react-hooks'
import { SEARCH_GAMES, USERS_WHO_CREATED_GAMES } from 'api/games'
import { useCallback } from 'react'

export const GamesSearchContainer = () => {
  const {
    loading: loadingGames,
    data: games,
    refetch: refetchGames,
  } = useQuery(SEARCH_GAMES)
  const { loading: loadingUsers, data: users } = useQuery(
    USERS_WHO_CREATED_GAMES,
  )
  const onSearch = useCallback(
    ({ title, tag, userId }) => {
      refetchGames({
        userId,
        title,
        tag,
      })
    },
    [refetchGames],
  )

  return (
    <GamesSearch
      games={games && games.gamesSearch}
      onSearch={onSearch}
      loading={loadingGames || loadingUsers}
      users={users && users.usersWhoCreatedGames}
    />
  )
}
