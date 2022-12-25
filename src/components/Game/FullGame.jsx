import React from 'react'
import { useIntl } from 'react-intl'
import { EditOutlined } from '@ant-design/icons'
import { GameInfo, ParticipantsList, GameParticipation } from 'components/Game'
import { CornerMenu } from 'components/CornerMenu'
import { Box } from 'noui/Position'
import { ACTIONS } from '../../constants'

const canEditGame = (user, game) => {
  if (!user) {
    return false
  }

  const isOwnGame = game.user.id === user.id

  if (isOwnGame && user.actions.indexOf(ACTIONS.MANAGE_OWN_GAMES) >= 0) {
    return true
  }

  return user.actions.indexOf(ACTIONS.MANAGE_GAMES) >= 0
}

export const FullGame = ({
  game,
  user,
  onRemoveChar,
  onParticipate,
  onLeave,
  onEditClick,
}) => {
  const intl = useIntl()
  const menuItems = [
    {
      label: intl.formatMessage({
        id: 'common.edit',
      }),
      icon: <EditOutlined />,
      onClick: onEditClick,
      'data-testid': 'game-menu-edit',
    },
  ]

  return (
    <CornerMenu items={menuItems} hide={!canEditGame(user, game)}>
      <Box pt="20px">
        <GameInfo game={game} />
        <ParticipantsList
          characters={game.characters}
          game={game}
          user={user}
          onRemoveCharClick={(char) => onRemoveChar(char)}
        />
        {game.characters.length < game.players && (
          <GameParticipation
            game={game}
            onParticipate={onParticipate}
            onLeave={onLeave}
          />
        )}
      </Box>
    </CornerMenu>
  )
}
