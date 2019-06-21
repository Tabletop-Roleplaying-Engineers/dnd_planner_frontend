import React from 'react'
import styled from 'styled-components'
import { color, fontFamily, fontSize, opacity, textAlign, display, fontWeight, lineHeight, fontStyle } from 'styled-system'
import Lorem from 'react-lorem-component'
import { Flex } from 'noui/Position'
import { Box } from '../noui/Position'

const Text = type => styled[type].attrs(props => ({
  display: props.noinline ? 'block' : 'inline-block'
}))`
  margin: 0;
  padding: 0;
  ${color};
  ${fontSize};
  ${opacity};
  ${textAlign};
  ${fontFamily};
  ${display};
  ${fontWeight};
  ${lineHeight};
  ${fontStyle}
`

export const Msg = styled(Text('span')).attrs(props => ({
  fontSize: props.fontSize || '14px'
}))`
`

export const Paragraph = styled(Text('p')).attrs(props => ({
  fontSize: props.fontSize || '14px'
}))`
  text-align: justify;
`

export const Header = styled(Text('h1'))`
  text-align: ${props => props.textAlign || 'center'};
`

export const Label = styled(Text('h2'))`
  text-align: ${props => props.textAlign || 'center'};
`

const Q = styled(Paragraph)`
  position: relative;
  
  padding-left: 4rem;
  padding-top: 1rem;
  padding-right: 4rem;
  
  &:before,
  &:after {
    position: absolute;
    color: #f1efe6;
    font-size: 8rem;
    width: 4rem;
    height: 4rem;
  }
  
  &:before {
    content: '“';
    left: 0;
    bottom: 100%;
  }
  
  &:after {
    content: '”';
    bottom: 0;
  }
`

export const Quote = ({ children, author }) =>
  <Flex column>
    {
      children &&
      <Q fontStyle="italic">
        {children}
      </Q>
    }

    <Flex justifyContent="flex-end" mt="2rem">
      <Msg
        fontStyle="italic"
        fontWeight="bold"
        fontSize="18px"
      >
        {author}
      </Msg>
    </Flex>
  </Flex>

const Blur = styled(Box)`
  filter: blur(5px);
  position: relative;
`

const StyledBlurText = styled(Header)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  
  font-weight: bold;
  font-size: 24px;
`

export const SecretText = ({ children }) =>
  <Box position="relative">
    <Blur>
      <Lorem count={(Math.random() * 4) + 1} />
    </Blur>
    
    <StyledBlurText>
      {children}
    </StyledBlurText>
  </Box>


