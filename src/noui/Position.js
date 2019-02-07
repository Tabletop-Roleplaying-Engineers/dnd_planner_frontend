import styled from 'styled-components'
import {
  fontSize,
  space,
  width,
  position,
  flex,
  alignItems,
  justifyContent,
  flexDirection
} from 'styled-system'

export const Box = styled.div.attrs(props => ({
  display: props.inline ? 'inline-block' : 'block'
}))`
  ${space}
  ${width}
  ${fontSize}
  ${position}
`

export const Flex = styled(Box).attrs(props => ({
  justifyContent: props.justifyContent || (props.center && 'center'),
  alignItems:     props.alignItems || (props.center && 'center'),
  flexDirection:  props.column ? 'column' : 'row',
  display:        props.inline ? 'inline-flex' : 'flex'
}))`
  display: flex;
  ${flex}
  ${alignItems}
  ${justifyContent}
  ${flexDirection}
 `
