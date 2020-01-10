import { Tag } from 'antd'
import React from 'react'
import styled from 'styled-components'
import { Box, Flex } from 'noui/Position'
import { Header } from 'ui/Text'
import { TAGS2TEXT } from '../../constants'

const Wrapper = styled(Flex)`
  cursor: pointer;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  overflow: auto;
`
const Title = styled(Box)`
  padding: 5px 10px;
`
const HeaderWithShadow = styled(Header)`
  text-shadow: 0px 0px 5px black;
`
const TagWrapper = styled.span`
  text-shadow: 0px 0px 5px #fff;
  margin-bottom: 5px;
`

export const GamePreview = ({ startingDate, title, tags = [], ...props }) =>
  <Wrapper style={{ backgroundImage: `url(${props.image})` }} {...props}>
    <Title mb={10}>
      <HeaderWithShadow
        fontSize={16}
        fontWeight="bold"
        textAlign="center"
        lineHeight={1}
        color={props.image ? '#fff' : null}
      >
        {title}
      </HeaderWithShadow>
    </Title>

    <Flex justifyContent="space-between">
      <Flex row flexWrap="wrap" m={1}>
        {
          tags.map((tag, i) => (
            <TagWrapper key={tag.id + i}>
              <Tag>{TAGS2TEXT[tag.name]}</Tag>
            </TagWrapper>
          ))
        }
      </Flex>
    </Flex>
  </Wrapper>
