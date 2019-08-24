import React from 'react'
import { Flex, Box } from 'noui/Position'
import styled from 'styled-components'
import { Header } from 'ui/Text'

export const Text = styled(Header)`
  text-shadow: -1px 0 #333, 0 1px #333, 1px 0 #333, 0 -1px #333;
  font-weight: bold;
  color: white;
  
  z-index: 1;
  
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  
  -webkit-user-select: none;  /* Chrome all / Safari all */
  -moz-user-select: none;     /* Firefox all */
  -ms-user-select: none;      /* IE 10+ */
  user-select: none;          /* Likely future */
`

export const Image = styled(Box)`
  width: 100%;
  height: 100%;
  
  background-size: cover;
  background-image: url("${props => props.image}");
  background-repeat: no-repeat;
  background-position: center;
  
  transition: all .5s;
  -moz-transition: all .5s;
  -ms-transition: all .5s;
  -o-transition: all .5s;
  -webkit-transition: all .5s;
  backface-visibility: hidden;

  
  &::before {
    content: '';
    width: 100%;
    height: 100%;
    
    position: absolute;
    top: 0;
    left: 0;
    
    background: rgba(20, 20, 20, .7);
  }
`

export const Card = styled(Flex)`
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  position: relative;
  cursor: pointer;
  overflow: hidden;

  &:hover ${Image}{
    transform: scale(1.2);
  }
  
  &:hover ${Image}::before {
    display: none;
  }
`


export default function ZoomCard({ image, title, ...props }) {
  return (
    <Card {...props}>
      <Image image={image} />

      <Text>{title}</Text>
    </Card>
  )
}
