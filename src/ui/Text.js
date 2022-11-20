import React from 'react'
import styled from 'styled-components'
import {
  color,
  fontFamily,
  fontSize,
  opacity,
  textAlign,
  display,
  fontWeight,
  lineHeight,
  fontStyle,
} from 'styled-system'
import { Flex } from 'noui/Position'
import { Box } from '../noui/Position'

const Text = (type) => styled[type].attrs((props) => ({
  display: props.noinline ? 'block' : 'inline-block',
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

export const Msg = styled(Text('span')).attrs((props) => ({
  fontSize: props.fontSize || '14px',
}))``

export const Paragraph = styled(Text('p')).attrs((props) => ({
  fontSize: props.fontSize || '14px',
}))`
  text-align: justify;
`

export const Header = styled(Text('h1'))`
  text-align: ${(props) => props.textAlign || 'center'};
`

export const Label = styled(Text('h2'))`
  text-align: ${(props) => props.textAlign || 'center'};
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

export const Quote = ({ children, author }) => (
  <Flex column>
    {children && <Q fontStyle="italic">{children}</Q>}

    <Flex justifyContent="flex-end" mt="2rem">
      <Msg fontStyle="italic" fontWeight="bold" fontSize="18px">
        {author}
      </Msg>
    </Flex>
  </Flex>
)

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

export const SecretText = ({ children }) => (
  <Box position="relative">
    <Blur>
      <Paragraph>
        Вітер куйовдить твоє волосся, коли ти виходиш за рамки дозволеного.
        Зараз тобі відкриються усі секрети, сховані від постороннього ока.
        Натомість ти бачиш огра в шапочці із фольги та одягненого як барбі. Він
        сидить на пеньку та їсть торт руками. Побачивши тебе, огр закочує очі і
        з набити ротом питає: - А шо ти очікував тут побачити?
      </Paragraph>
    </Blur>

    <StyledBlurText>{children}</StyledBlurText>
  </Box>
)
