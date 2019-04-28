import React from 'react'
import styled from 'styled-components'
import moment from 'moment'
import { Box, Flex } from 'noui/Position'
import { Msg } from 'ui/Text'

const StyledImage = styled.img`
  height: 160px;
  object-fit: contain;
`

const GameView = ({ title, image, startingDate, ...props }) => (
  <Flex {...props} inline>
    {image && <StyledImage src={image}/>}
    
    <Flex ml={10} py="5px" column justifyContent="space-between">
      <Msg>{title}</Msg>
      <Msg>at {moment.unix(startingDate/1000).format('MMMM Do YYYY, h:mm:ss a')}</Msg>
    </Flex>
  </Flex>
)

export default GameView

