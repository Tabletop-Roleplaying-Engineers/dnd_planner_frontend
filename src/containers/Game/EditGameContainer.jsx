import React, { useContext, useCallback } from 'react'
import { Spin } from 'antd'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { UPDATE_GAME_QUERY } from 'api'
import { UserContext } from '../../context/userContext'
import GameForm from 'forms/GameForm'
import { USERS_WHO_CREATED_GAMES } from 'api/games'
import { ACTIONS } from '../../constants'

const canUpdateGameMaster = user =>
  user && user.actions.indexOf(ACTIONS.UPDATE_GAME_MASTER) >= 0

export const EditGameContainer = ({ game, onUpdated }) => {
  const { user } = useContext(UserContext)
  const [updateGame, result] = useMutation(UPDATE_GAME_QUERY)
  const { loading: loadingUsers, data: users } = useQuery(
    USERS_WHO_CREATED_GAMES,
  )
  const onSubmit = useCallback(async game => {
    await updateGame({ variables: game })
    onUpdated(game)
  }, [])

  return (
    <Spin spinning={result.loading || loadingUsers}>
      <GameForm
        showSharing
        initialValues={game}
        onSubmit={onSubmit}
        users={users && users.usersWhoCreatedGames}
        withMasterField={canUpdateGameMaster(user)}
      />
    </Spin>
  )
}
