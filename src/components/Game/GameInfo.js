import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { Row, Col, Slider, Spin } from 'antd'
import { Box, Flex } from 'noui/Position'
import { Header } from 'ui/Text'
import { useQuery } from '@apollo/react-hooks'
import { TAGS_QUERY } from 'api'
import { TAGS2TEXT } from '../../constants'

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
  const { loading, data = {} } = useQuery(TAGS_QUERY);
  if (loading) {
    return <Spin />
  }
  const { tags = [] } = data
  const tagsById = tags.reduce((acc, tag) => {
    acc[tag.id] = tag
    return acc
  }, {})
  console.log('=-= tags', tags)
  console.log('=-= game', game)

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
        <Row>
          <Col span={24}>
            <Flex>
              {game.tags.map(tagId => (
                <Tag key={tagId}>{TAGS2TEXT[tagsById[tagId].name]}</Tag>
              ))}
            </Flex>
          </Col>
          <Col span={24}>
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
      </Col>
    </Row>
  )
}
