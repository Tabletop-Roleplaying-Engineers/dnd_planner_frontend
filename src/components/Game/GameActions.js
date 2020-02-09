import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'antd'
import { Box } from 'noui/Position'

export const GameActions = ({ game }) => (
  <>
    <Box m={10}>
      <Link to={`/calendar/${game.id}`}>
        <Button
          type="primary"
          block
        >
          View
        </Button>
      </Link>
    </Box>
  </>
)
