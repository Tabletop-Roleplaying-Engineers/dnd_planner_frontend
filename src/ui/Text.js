import React from 'react'
import styled from 'styled-components'
import { color, fontFamily, fontSize, opacity, textAlign, display, fontWeight, lineHeight, fontStyle } from 'styled-system'
import { Flex, Box } from 'noui/Position'

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
`

export const Header = styled(Text('h1'))``

export const Label = styled(Text('h2'))``

export const Quote = ({ children, author }) =>
  <Flex column>
    <Paragraph fontStyle="italic">
      {children}
    </Paragraph>
    
    <Flex justifyContent="flex-end">
      <Msg
        fontStyle="italic"
        fontWeight="bold"
        fontSize="18px"
      >
        {author}
      </Msg>
    </Flex>
  </Flex>

