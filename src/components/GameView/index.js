import React from 'react'
import styled from 'styled-components'
import { Flex } from 'noui/Position'
import { Msg } from 'ui/Text'
import { useDateFormat } from 'utils/hooks/useDateFormat'

const StyledImage = styled.img`
  height: 160px;
  object-fit: contain;
`

const GameView = ({ title, image, startingDate, ...props }) => {
  const date = new Date(startingDate)
  const format = useDateFormat()

  return (
    <Flex {...props} inline>
      {image && <StyledImage src={image} />}

      <Flex ml={10} py="5px" column justifyContent="space-between">
        <Msg>{title}</Msg>
        <Msg>{format(date, 'do MMMM yyyy, h:mm')}</Msg>
      </Flex>
    </Flex>
  )
}

export default GameView
