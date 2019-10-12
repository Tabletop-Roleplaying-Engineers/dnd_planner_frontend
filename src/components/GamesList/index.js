import React, { useContext } from 'react'
import { Row, Col, Button } from 'antd'
import styled from 'styled-components'
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
    <ParticipantsList characters={game.characters} />
    <Col span={24}>
      <GameActions game={game} onJoinClick={onJoinClick} user={user} />
    </Col>
  </Row>
)

const canCreateGame = user => user && user.actions.indexOf(ACTIONS.MANAGE_GAMES) >= 0

export const GamesList = ({ games, date, onJoinClick, onNewGameClick }) => {
  const { user } = useContext(UserContext)

  return (
    <Flex column>
      {canCreateGame(user) && (
        <Button type="primary" onClick={onNewGameClick} block>Create game</Button>
      )}
      <DateContainer>
        {date.format('DD MMMM')}
      </DateContainer>
      {games.map(game => (
        <span key={game.id}>
          <GameContainer mt={10} mb={10}>
            <CollapsiblePanel key={game.id} renderHeader={() => <GameInfo game={game} />}>
              <ItemBody game={game} onJoinClick={onJoinClick} user={user} />
            </CollapsiblePanel>
          </GameContainer>
        </span>
      ))}
    </Flex>
  )
}
