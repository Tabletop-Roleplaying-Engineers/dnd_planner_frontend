import styled from 'styled-components'
import {
  fontSize,
  space,
  width,
  maxWidth,
  minWidth,
  position,
  flex,
  alignItems,
  justifyContent,
  flexDirection,
  height,
  maxHeight,
  minHeight,
  display
} from 'styled-system'

export const Box = styled.div.attrs(props => ({
  display: props.inline ? 'inline-block' : 'block'
}))`
  ${display}
  ${space}
  ${width}
  ${height}
  ${fontSize}
  ${position}
  ${maxWidth}
  ${minWidth}
  ${maxHeight}
  ${minHeight}
`

export const Flex = styled(Box).attrs(props => ({
  justifyContent: props.justifyContent || (props.center && 'center'),
  alignItems:     props.alignItems || (props.center && 'center'),
  flexDirection:  props.flexDirection || (props.column ? 'column' : 'row'),
  display:        props.inline ? 'inline-flex' : 'flex'
}))`
  ${flex}
  ${alignItems}
  ${justifyContent}
  ${flexDirection}
 `
