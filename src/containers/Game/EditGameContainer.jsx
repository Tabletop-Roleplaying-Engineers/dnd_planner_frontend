import React, { useContext, useCallback } from 'react'
import { notification, Spin } from 'antd'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { CREATE_GAME_QUERY, UPDATE_GAME_QUERY } from 'api'
import { UserContext } from '../../context/userContext'
import GameForm from 'forms/GameForm'
import { FETCH_USERS_QUERY } from 'api'
import { ACTIONS, ROLES } from '../../constants'
import { hasAction } from 'utils/common'
import { useIntl } from 'react-intl'

const canUpdateGameMaster = user => hasAction(user, ACTIONS.UPDATE_GAME_MASTER)

export const EditGameContainer = ({ game, onUpdated }) => {
  const intl = useIntl()
  const { user } = useContext(UserContext)
  const [updateGame, updateResult] = useMutation(UPDATE_GAME_QUERY)
  const [createGame, createResult] = useMutation(CREATE_GAME_QUERY)
  const { loading: loadingUsers, data: usersResult } = useQuery(
    FETCH_USERS_QUERY,
    {
      variables: {
        role: ROLES.GameMaster,
      },
    },
  )
  const isLoading = createResult.loading || updateResult.loading || loadingUsers
  const onSubmit = useCallback(
    async data => {
      try {
        if (game.id) {
          await updateGame({ variables: data })
          notification.success({
            message: intl.formatMessage({ id: 'gameForm.gameEdited' }),
          })
        } else {
          await createGame({ variables: data })
          notification.success({
            message: intl.formatMessage({ id: 'gameForm.gameCreated' }),
          })
        }
        onUpdated(data)
      } catch (error) {
        const msg = error.graphQLErrors.map(err => err.message).join('; ')
        notification.error({
          message: intl.formatMessage(
            { id: 'gameForm.requestError' },
            { message: msg },
          ),
        })
        throw error
      }
    },
    [game],
  )

  return (
    <Spin spinning={isLoading}>
      <GameForm
        showSharing
        initialValues={game}
        onSubmit={onSubmit}
        users={usersResult && usersResult.users}
        user={user}
        withMasterField={canUpdateGameMaster(user)}
      />
    </Spin>
  )
}
