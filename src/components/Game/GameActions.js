import React from 'react'
import { Button, Spin } from 'antd'
import { Mutation } from 'react-apollo'
import { Box } from 'noui/Position'
import { ACTIONS } from '../../constants'
import { END_GAME } from 'api'

const shouldRenderEndBtn = (user, game) => {
  return !!user && ((user.actions.indexOf(ACTIONS.MANAGE_GAMES) >= 0) || (user.id === game.user.id))
}

export const GameActions = ({ game, onJoinClick, user }) => (
  <>
    <Box m={10}>
      {user && (
        <Button
          type="primary"
          onClick={() => onJoinClick(game)}
          disabled={user.id === game.user.id}
          title={user.id === game.user.id ? 'You can\'t join your game' : ''}
          block
        >
          View
        </Button>
      )}
    </Box>
    {shouldRenderEndBtn(user, game) && (
      <Box m={10}>
        <Mutation
          mutation={END_GAME}
          variables={{ gameId: game.id }}
        >
          {(endGame, { loading }) => (
            <Spin spinning={loading}>
              <Button
                type="primary"
                onClick={endGame}
                block
              >
                End game
              </Button>
            </Spin>
          )}
        </Mutation>
      </Box>
    )}
  </>
)
