import React, { useContext } from 'react'
import { Slider, Row, Col, Card, Avatar, Button, Spin } from 'antd'
import styled from 'styled-components'
import { Mutation } from 'react-apollo'
import { Box, Flex } from 'noui/Position'
import { Header } from 'ui/Text'
import CollapsiblePanel from 'components/CollapsiblePanel'
import { ACTIONS } from '../../constants'
import { UserContext } from '../../context/userContext'
import { END_GAME } from 'api'
const { Meta } = Card

const Image = styled('img')`
  width: 160px;
`
const LvlSlider = styled(Box)`
  width: 100%;
`
const GameContainer = styled(Box)`
  cursor: pointer;
`
const DateContainer = styled(Box)`
  font-size: 18px;
  margin-top: 10px;
`

const ItemHeader = ({ game }) => {
  return (
    <span>
      <Row>
        <Col span={8}>
          <Image src={game.image} alt="Game" />
        </Col>
        <Col span={8}>
          <Box mb={10} ml={10}>
            <Header
              fontSize={16}
              fontWeight="bold"
              textAlign="center"
              lineHeight={1}
            >
              {game.title}
            </Header>
          </Box>
          <Box mb={10} ml={10}>
            Available slots: {Math.max(game.players - game.characters.length, 0)}
          </Box>
        </Col>
        <Col span={8}>
          Available levels
          <LvlSlider>
            <Slider
              range
              disabled
              min={0}
              max={1}
              defaultValue={[0, 1]}
              marks={{
                0: game.lvlFrom,
                1: game.lvlTo
              }}
              tipFormatter={null}
            />
          </LvlSlider>
        </Col>
      </Row>
    </span>
  )
}

const shouldRenderEndBtn = (user, game) => {
  return !!user && ((user.actions.indexOf(ACTIONS.MANAGE_GAMES) >= 0) || (user.id === game.user.id))
}

const ItemBody = ({ game, onJoinClick, user }) => (
  <Row>
    {game.characters.map(character => (
      <span key={character.id}>
          <Col span={12}>
            <Card size="small" bordered={false}>
              <Meta
                avatar={<Avatar size={54} src={character.user.avatar} />}
                title={character.name}
                description={`${character.user.firstName || ''} ${character.user.lastName || ''}`}
              />
            </Card>
          </Col>
      </span>
    ))}
    <Col span={24}>
      <Box m={10}>
        {user && (
          <Button
            type="primary"
            onClick={() => onJoinClick(game)}
            disabled={user.id === game.user.id}
            title={user.id === game.user.id ? 'You can\'t join your game' : ''}
            block
          >
            Join
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
    </Col>
  </Row>
)

const canCreateGame = user => user.actions.indexOf(ACTIONS.MANAGE_GAMES) >= 0

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
            <CollapsiblePanel key={game.id} renderHeader={() => <ItemHeader game={game} />}>
              <ItemBody game={game} onJoinClick={onJoinClick} user={user} />
            </CollapsiblePanel>
          </GameContainer>
        </span>
      ))}
    </Flex>
  )
}
