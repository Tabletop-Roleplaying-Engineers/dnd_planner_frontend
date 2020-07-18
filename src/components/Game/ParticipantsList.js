import React from 'react'
import { Row, Col, Card, Dropdown, Icon } from 'antd'
import Character from 'components/Character'
import { Box } from 'noui/Position'
import { createMenu } from 'ui/shared'
import { ACTIONS } from '../../constants'

const isOwnGame = (user, game) => game && user && game.user.id === user.id

const shouldShowMenu = (user, game) => {
  if (!user) {
    return false
  }

  const { actions } = user
  if (actions.includes(ACTIONS.MANAGE_PARTICIPANTS)) {
    return true
  }
  if (
    actions.includes(ACTIONS.MANAGE_PARTICIPANTS_ON_OWN_GAMES) &&
    isOwnGame(user, game)
  ) {
    return true
  }

  return false
}

export const ParticipantsList = props => {
  const { characters, game, user, onRemoveCharClick } = props
  const showMenu = shouldShowMenu(user, game)

  return (
    <Row>
      {characters.map(character => (
        <Col key={character.id} md={12}>
          <Card size="small" bordered={false}>
            <Character {...character} />
            {showMenu && (
              <Box position="absolute" top={0} right={10}>
                <Dropdown
                  overlay={createMenu([
                    {
                      label: 'Remove from game',
                      icon: 'delete',
                      onClick: () => onRemoveCharClick(character),
                      'data-testid': 'character-menu-remove-from-game',
                    },
                  ])}
                  trigger={['click']}
                >
                  <Icon type="ellipsis" data-testid="character-menu" />
                </Dropdown>
              </Box>
            )}
            {/* if game.user.id === user.id */}
            {/* show menu */}
          </Card>
        </Col>
      ))}
    </Row>
  )
}
