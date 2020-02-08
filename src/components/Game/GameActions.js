import React from 'react'
import { Button } from 'antd'
import { Box } from 'noui/Position'

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
  </>
)
