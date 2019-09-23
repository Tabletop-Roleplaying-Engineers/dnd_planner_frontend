import React from 'react'
import { Flex } from 'noui/Position'
import { Msg } from 'ui/Text'
import styled from 'styled-components'

const StyledImage = styled.img`
  height: 60px;
  width: 60px;
  object-fit: contain;
`

const Character = ({ name, experience, faction: { name: fname, logo }, renown, ...props }) => {
  // temporary deleted due to arguing of React and JS
  delete props.class

  return (
    <Flex {...props} inline>
      {logo && <StyledImage src={logo} />}

      <Flex ml={10} py="5px" column justifyContent="space-between">
        <Msg>{name} [{experience}]</Msg>
        <Msg>from {fname} ({renown})</Msg>
      </Flex>
    </Flex>
  )
}

export default Character
