import React, { useState, useCallback, useMemo } from 'react'
import { Row, Col, Modal } from 'antd'
import isBefore from 'date-fns/isBefore'
import Character from 'components/Character'
import { Box } from 'noui/Position'
import { ACTIONS } from '../../constants'
import { FormattedMessage, useIntl } from 'react-intl'
import { CornerMenu } from 'components/CornerMenu'

const isOwnGame = (user, game) => game && user && game.user.id === user.id

const shouldShowMenu = (user, game) => {
  if (!user) {
    return false
  }
  if (isBefore(game.startingDate, new Date())) {
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

export const CharacterBox = (props) => {
  const intl = useIntl()
  const { character, onDeleteClick, withMenu } = props
  const menuItems = useMemo(() => {
    return [
      {
        label: intl.formatMessage({
          id: 'character.removeFromGameBtn',
        }),
        icon: 'delete',
        onClick: () => onDeleteClick(character),
        'data-testid': 'character-menu-remove-from-game',
      },
    ]
  }, [intl, onDeleteClick, character])

  return (
    <Box size="small" bordered={false} p="5px">
      <CornerMenu items={menuItems} hide={!withMenu}>
        <Character withBorder {...character} />
      </CornerMenu>
    </Box>
  )
}

export const ParticipantsList = (props) => {
  const intl = useIntl()
  const { characters, game, user, onRemoveCharClick } = props
  const showMenu = shouldShowMenu(user, game)
  const [characterToRemove, setCharacterToRemove] = useState(null)
  const onRemovingConfirm = useCallback(
    async (char) => {
      await onRemoveCharClick(char)
      setCharacterToRemove(null)
    },
    [onRemoveCharClick],
  )

  return (
    <Row>
      {characters.map((character) => (
        <Col key={character.id} md={12}>
          <CharacterBox
            character={character}
            onDeleteClick={setCharacterToRemove}
            withMenu={showMenu}
          />
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
