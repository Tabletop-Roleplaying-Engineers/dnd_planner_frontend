import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { Row, Col, Slider } from 'antd'
import { Box } from 'noui/Position'
import { Header } from 'ui/Text'

const Image = styled('img')`
  width: 160px;
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

export const GameInfo = ({ game }) => {
  return (
    <Row>
      <Col span={8}>
        <Image src={game.image} alt="Game" />
      </Col>
      <Col span={8}>
        <Box mb={10} ml={10}>
          <Link to={`/calendar/${game.id}`}>
            <EllipsisHeader
              fontSize={16}
              fontWeight="bold"
              textAlign="center"
              lineHeight={1}
            >
              {game.title}
            </EllipsisHeader>
          </Link>
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
  )
}
