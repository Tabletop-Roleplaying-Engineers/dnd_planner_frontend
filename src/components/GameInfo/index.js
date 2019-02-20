import { Tag } from 'antd'
import React from 'react'
import { Box, Flex } from 'noui/Position'
import { Msg, Header } from 'ui/Text'
import styled from 'styled-components'

const Wrapper = styled(Flex)`
  padding: 5px 10px;
  border-radius: 4px;
  background-color: white;
  justify-content: space-between;
  flex-direction: column;
`

export const GameInfo = ({ startingTime, title, tags = [], ...props }) =>
  <Wrapper {...props}>
    <Box mb={10}>
      <Header
        fontSize={16}
        fontWeight="bold"
        textAlign="center"
        lineHeight={1}
      >
        {title}
      </Header>
    </Box>
    
    <Flex justifyContent="space-between">
      <Flex column>
        {
          tags.map(tag => <Tag key={tag}>{tag}</Tag>)
        }
      </Flex>
      
      <Msg>at {startingTime}</Msg>
    </Flex>
  </Wrapper>
