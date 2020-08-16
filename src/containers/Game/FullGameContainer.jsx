import * as R from 'ramda'
import React, { useCallback, useContext } from 'react'
import { notification } from 'antd'
import { useMutation } from '@apollo/react-hooks'
import { FullGame } from 'components/Game'
import { UserContext } from 'context/userContext'
import { REMOVE_CHARACTER_FROM_GAME_MUTATION, PARTICIPATE_GAME } from 'api'

export const FullGameContainer = ({ game, onUpdate }) => {
  const { user } = useContext(UserContext)
  const removeCharFromSelectedGame = useCallback(
    async character => {
      const charIndex = game.characters.findIndex(
        char => char.id === character.id,
      )
      if (onUpdate) {
        onUpdate({
          ...game,
          characters: R.remove(charIndex, 1, game.characters),
        })
      }
    },
    [onUpdate, game],
  )
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
        removeCharFromSelectedGame(character)
      } catch (error) {
        notification.error({
          message: error.message,
        })
      }
    },
    [removeFromGame, game, removeCharFromSelectedGame],
  )
  const [participateGame] = useMutation(PARTICIPATE_GAME)
  const onParticipate = useCallback(
    async character => {
      try {
        await participateGame({
          variables: {
            gameId: game.id,
            characterId: character.id,
          },
        })
        if (onUpdate) {
          onUpdate({
            ...game,
            characters: [...game.characters, character],
          })
        }
      } catch (error) {
        notification.error({
          message: error.message,
        })
      }
    },
    [participateGame, game, onUpdate],
  )

  return (
    <FullGame
      game={game}
      user={user}
      onRemoveChar={onRemoveChar}
      onParticipate={onParticipate}
      onLeave={removeCharFromSelectedGame}
    />
  )
}
