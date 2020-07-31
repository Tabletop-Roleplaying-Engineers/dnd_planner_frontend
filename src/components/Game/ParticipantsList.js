import React, { useState, useCallback } from 'react'
import { Row, Col, Card, Dropdown, Icon, Modal } from 'antd'
import Character from 'components/Character'
import { Box } from 'noui/Position'
import { createMenu } from 'ui/shared'
import { ACTIONS } from '../../constants'
import { FormattedMessage, useIntl } from 'react-intl'

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
  const intl = useIntl()
  const { characters, game, user, onRemoveCharClick } = props
  const showMenu = shouldShowMenu(user, game)
  const [characterToRemove, setCharacterToRemove] = useState(null)
  const onRemovingConfirm = useCallback(
    async char => {
      await onRemoveCharClick(char)
      setCharacterToRemove(null)
    },
    [onRemoveCharClick],
  )

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
                      label: intl.formatMessage({
                        id: 'character.removeFromGameBtn',
                      }),
                      icon: 'delete',
                      onClick: () => setCharacterToRemove(character),
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

      {/* Remove character from game dialog */}
      <Modal
        title={intl.formatMessage({
          id: 'character.removeFromGameDialogHeader',
        })}
        visible={!!characterToRemove}
        onOk={() => onRemovingConfirm(characterToRemove)}
        onCancel={() => setCharacterToRemove(null)}
      >
        <p>
          <FormattedMessage
            id="character.removeFromGameDialogContent"
            values={{
              name: <b>{characterToRemove && characterToRemove.name}</b>,
            }}
          />
        </p>
      </Modal>
    </Row>
  )
}
