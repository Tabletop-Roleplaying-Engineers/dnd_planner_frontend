import React, { useContext } from 'react'
import { Row, Col, Button, Icon } from 'antd'
import styled from 'styled-components'
import format from 'date-fns/format'
import isBefore from 'date-fns/isBefore'
import startOfDay from 'date-fns/startOfDay'
import { Box, Flex } from 'noui/Position'
import CollapsiblePanel from 'components/CollapsiblePanel'
import { ACTIONS } from '../../constants'
import { UserContext } from '../../context/userContext'
import { GameInfo } from 'components/Game/GameInfo'
import { ParticipantsList } from 'components/Game/ParticipantsList'
import { GameActions } from 'components/Game/GameActions'

const GameContainer = styled(Box)`
  cursor: pointer;
`
const DateContainer = styled(Box)`
  font-size: 18px;
  margin-top: 10px;
`

const ItemBody = ({ game, onJoinClick, user }) => (
  <Row>
    <Box px={12} py={18}>{game.description}</Box>
    <ParticipantsList characters={game.characters} />
    <Col span={24}>
      <GameActions game={game} onJoinClick={onJoinClick} user={user} />
    </Col>
  </Row>
)

const canCreateThisDay = date => !isBefore(date, startOfDay(new Date()))
const canUserCreateGame = user => user && user.actions.indexOf(ACTIONS.MANAGE_GAMES) >= 0
const canCreateGame = (user, date) => canUserCreateGame(user) && canCreateThisDay(date)

export const GamesList = ({ games, date, onJoinClick, onNewGameClick }) => {
  const { user } = useContext(UserContext)

  return (
    <Flex column>
      {canCreateGame(user, date) && (
        <Button type="primary" onClick={onNewGameClick} block>Create game</Button>
      )}
      <DateContainer>
        {format(date, 'dd MMMM')}
      </DateContainer>
      {games.map(game => (
        <span key={game.id}>
          <GameContainer mt={10} mb={10}>
            <CollapsiblePanel
              key={game.id}
              renderHeader={() => <GameInfo game={game} />}
              renderFooter={({ opened }) => <Flex justifyContent="center"><Icon type={opened ? 'up' : 'down'} /></Flex>}
            >
              <ItemBody game={game} onJoinClick={onJoinClick} user={user} />
            </CollapsiblePanel>

          </GameContainer>
        </span>
      ))}
    </Flex>
  )
}
