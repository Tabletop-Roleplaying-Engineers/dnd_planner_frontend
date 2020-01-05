import { Tag } from 'antd'
import React from 'react'
import { Box, Flex } from 'noui/Position'
import { Header } from 'ui/Text'
import styled from 'styled-components'

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
const WithWhiteShadow = styled.div`
  text-shadow: 0px 0px 5px #fff;
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
      <Flex column>
        {
          tags.map(tag => <WithWhiteShadow><Tag key={tag}>{tag}</Tag></WithWhiteShadow>)
        }
      </Flex>
    </Flex>
  </Wrapper>
