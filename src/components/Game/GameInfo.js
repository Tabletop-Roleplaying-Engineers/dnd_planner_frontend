import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { Row, Col, Slider, Rate, Icon } from 'antd'
import UserInfo from 'components/UserInfo'
import { Box, Flex } from 'noui/Position'
import { Header } from 'ui/Text'

const Image = styled('img')`
  width: 160px;
  max-width: 100%;
`
const EllipsisHeader = styled(Header)`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  width: 100%;
`
const LvlSlider = styled(Box)`
  width: 100%;
`

const Tag = styled.div`
  border-radius: 5px;
  background: #C4C4C4;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 5px;
  padding: 0px 5px;
`

export const GameInfo = ({ game }) => {
  return (
    <Row>
      <Col span={8}>
        <Image src={game.image} alt="Game" />
      </Col>
      <Col span={8}>
        {/* TODO: 21 - it`s a height of EllipsisHeader block */}
        <Box mb={50 - 21} ml={10}>
          <Link to={`/calendar/${game.id}`}>
            <EllipsisHeader
              fontSize={16}
              fontWeight="bold"
              textAlign="left"
              lineHeight={1}
            >
              {game.title}
            </EllipsisHeader>
          </Link>
        </Box>
        <Box mb={10} ml={10}>
          Available slots: {Math.max(game.players - game.characters.length, 0)} / {game.players}

          <Rate 
            character={<Icon type="user" />} 
            defaultValue={game.characters.length}
            count={game.players}
            disabled
          />
        </Box>
      </Col>
      <Col span={8}>
        <Row>
          <Col span={24}>
            <Flex mb={10} justifyContent="end">
              <UserInfo {...game.user} position="left"/>
            </Flex>
          </Col>

          <Col span={24}>
            Available levels
            <LvlSlider>
              <Slider
                range
                disabled
                min={1}
                max={20}
                value={[game.lvlFrom, game.lvlTo]}
                marks={{
                  [game.lvlFrom]: game.lvlFrom,
                  [game.lvlTo]: game.lvlTo
                }}
                tipFormatter={null}
              />
            </LvlSlider>
          </Col>


          <Col span={24}>
            <Flex>
              {game.tags.map(tag => (
                <Tag key={tag.id}>{tag.name}</Tag>
              ))}
            </Flex>
          </Col>

        </Row>
      </Col>
    </Row>
  )
}
