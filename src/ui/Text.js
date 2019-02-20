import styled from 'styled-components'
import { color, fontFamily, fontSize, opacity, textAlign, display, fontWeight, lineHeight } from 'styled-system'

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
`

export const Msg = styled(Text('span')).attrs(props => ({
  fontSize: props.fontSize || '14px'
}))`
`

export const Header = styled(Text('h1'))``

export const Label = styled(Text('h2'))``

