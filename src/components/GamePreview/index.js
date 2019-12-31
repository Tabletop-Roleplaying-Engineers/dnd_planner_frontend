import { Tag } from 'antd'
import React from 'react'
import { Box, Flex } from 'noui/Position'
import { Header } from 'ui/Text'
import styled from 'styled-components'

const Wrapper = styled(Flex)`
  cursor: pointer;
  position: relative;
  border-radius: 4px;
  background-color: white;
  justify-content: space-between;
  flex-direction: column;
`
const Image = styled('img')`
  width: 100%;
`
const Title = styled(Box)`
  padding: 5px 10px;
  position: absolute;
  top: 0;
`

export const GamePreview = ({ startingDate, title, tags = [], ...props }) =>
  <Wrapper {...props}>
    <Image src={props.image} alt="Game" />
    <Title mb={10}>
      <Header
        fontSize={16}
        fontWeight="bold"
        textAlign="center"
        lineHeight={1}
        color={props.image ? '#fff' : null}
      >
        {title}
      </Header>
    </Title>

    <Flex justifyContent="space-between">
      <Flex column>
        {
          tags.map((tag, i) => <Tag key={tag.id + i}>{tag.id}</Tag>)
        }
      </Flex>
    </Flex>
  </Wrapper>
