import React, { memo } from 'react'
import { Flex } from 'noui/Position'
import { Msg } from 'ui/Text'
import styled from 'styled-components'

const Image = styled.img`
  max-height: 50vh;
  object-fit: contain;
`

const Portrait = ({ src, alt, label, ...props }) => {
  return (
    <Flex {...props} column center>
      <Image src={src} alt={alt}/>
      <Msg>“{label}”</Msg>
    </Flex>
  )
}

export default memo(Portrait)
