import * as R from 'ramda'
import React, { useCallback, useContext } from 'react'
import { notification } from 'antd'
import { useMutation } from '@apollo/react-hooks'
import { FullGame } from 'components/Game'
import { UserContext } from 'context/userContext'
import { REMOVE_CHARACTER_FROM_GAME_MUTATION } from 'api'

export const FullGameContainer = ({ game, onUpdate }) => {
  const { user } = useContext(UserContext)
  const [removeFromGame] = useMutation(REMOVE_CHARACTER_FROM_GAME_MUTATION)
  const onRemoveChar = useCallback(
    async character => {
      try {
        await removeFromGame({
          variables: {
            gameId: game.id,
            characterId: character.id,
          },
        })
      } catch (error) {
        notification.error({
          message: error.message,
        })
      }
      const charIndex = game.characters.findIndex(
        char => char.id === character.id,
      )
      onUpdate &&
        onUpdate({
          ...game,
          characters: R.remove(charIndex, 1, game.characters),
        })
    },
    [removeFromGame, onUpdate, game],
  )

  return <FullGame game={game} user={user} onRemoveChar={onRemoveChar} />
}
