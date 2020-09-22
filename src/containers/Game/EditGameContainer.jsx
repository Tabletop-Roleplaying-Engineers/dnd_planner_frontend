import React, { useContext, useCallback } from 'react'
import { Spin } from 'antd'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { UPDATE_GAME_QUERY } from 'api'
import { UserContext } from '../../context/userContext'
import GameForm from 'forms/GameForm'
import { FETCH_USERS_QUERY } from 'api'
import { ACTIONS, ROLES } from '../../constants'
import { hasAction } from 'utils/common'

const canUpdateGameMaster = user => hasAction(user, ACTIONS.UPDATE_GAME_MASTER)

export const EditGameContainer = ({ game, onUpdated }) => {
  const { user } = useContext(UserContext)
  const [updateGame, result] = useMutation(UPDATE_GAME_QUERY)
  const { loading: loadingUsers, data: usersResult } = useQuery(
    FETCH_USERS_QUERY,
    {
      variables: {
        role: ROLES.GameMaster,
      },
    },
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
        users={usersResult && usersResult.users}
        withMasterField={canUpdateGameMaster(user)}
      />
    </Spin>
  )
}
