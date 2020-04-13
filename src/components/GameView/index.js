import React from 'react'
import styled from 'styled-components'
import format from 'date-fns/format'
import { Flex } from 'noui/Position'
import { Msg } from 'ui/Text'

const StyledImage = styled.img`
  height: 160px;
  object-fit: contain;
`

const GameView = ({ title, image, startingDate, ...props }) => {
  const date = new Date(parseInt(startingDate, 10))
  return (
    <Flex {...props} inline>
      {image && <StyledImage src={image} />}

      <Flex ml={10} py="5px" column justifyContent="space-between">
        <Msg>{title}</Msg>
        <Msg>at {format(date, 'MMMM do yyyy, h:mm:ss a')}</Msg>
      </Flex>
    </Flex>
  )
}

export default GameView

