import React, { useContext } from 'react'
import { Row, Col, Button } from 'antd'
import styled from 'styled-components'
import format from 'date-fns/format'
import isBefore from 'date-fns/isBefore'
import startOfDay from 'date-fns/startOfDay'
import { Box, Flex } from 'noui/Position'
import { ACTIONS } from '../../constants'
import { UserContext } from '../../context/userContext'
import { GameInfo } from 'components/Game/GameInfo'
import { ParticipantsList } from 'components/Game/ParticipantsList'
import { GameActions } from 'components/Game/GameActions'
import { hasAction } from 'utils/common'

const GameContainer = styled(Box)`
  border: 1px solid #e8e8e8;
`
const DateContainer = styled(Box)`
  font-size: 18px;
  margin-top: 10px;
`

const ItemBody = ({ game }) => (
  <Row>
    <ParticipantsList characters={game.characters} />
    <Col span={24}>
      <GameActions game={game} />
    </Col>
  </Row>
)

const canCreateThisDay = (date) => !isBefore(date, startOfDay(new Date()))
const canUserCreateGame = (user) =>
  hasAction(user, ACTIONS.MANAGE_GAMES) ||
  hasAction(user, ACTIONS.MANAGE_OWN_GAMES)
const canCreateGame = (user, date) =>
  canUserCreateGame(user) && canCreateThisDay(date)

export const GamesList = ({ games, date, onNewGameClick }) => {
  const { user } = useContext(UserContext)

  return (
    <Flex column>
      {canCreateGame(user, date) && (
        <Button
          type="primary"
          onClick={onNewGameClick}
          block
          data-testid="create-game-btn"
        >
          Create game
        </Button>
      )}
      <DateContainer>{format(date, 'dd MMMM')}</DateContainer>
      {games.map((game) => (
        <span key={game.id}>
          <GameContainer mt={10} mb={10} p={10}>
            <GameInfo game={game} />
            <ItemBody game={game} />
          </GameContainer>
        </span>
      ))}
    </Flex>
  )
}
