import React from 'react'
import styled from 'styled-components'
import { Flex, Box } from 'noui/Position'
import { Header } from 'ui/Text'

const Back = styled(Flex)`
  width: 100%;
  height: 100%;
  
  min-height: 250px;
  
  background-size: cover;
  background-image: url("${props => props.src}");
  background-repeat: no-repeat;
  background-position: center;
`

const Text = styled(Header)`
  text-shadow: -1px 0 #333, 0 1px #333, 1px 0 #333, 0 -1px #333;
  font-weight: bold;
  color: white;
  
  font-size: 110px;
  
  z-index: 1;
  
  -webkit-user-select: none;  /* Chrome all / Safari all */
  -moz-user-select: none;     /* Firefox all */
  -ms-user-select: none;      /* IE 10+ */
  user-select: none;          /* Likely future */
`

const TextWithImage = ({ image, text, ...props}) => {
  
  return (
    <Back
      src={image}
      alignItems="center"
    >
      <Box pl={10} {...props}>
        <Text textAlign="left">
          {text}
        </Text>
      </Box>
    </Back>
  )
}

export default TextWithImage
