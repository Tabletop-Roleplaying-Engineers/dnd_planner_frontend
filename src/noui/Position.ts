import styled from 'styled-components'
import {
  fontSize,
  space,
  width,
  maxWidth,
  minWidth,
  position,
  top,
  bottom,
  left,
  right,
  flex,
  alignItems,
  justifyContent,
  flexDirection,
  height,
  maxHeight,
  minHeight,
  display,
  flexWrap,
  zIndex,
  background,
  DisplayProps,
  SpaceProps,
  SizeProps,
  FontSizeProps,
  PositionProps,
  LayoutProps,
  BackgroundProps,
  FlexProps,
  AlignItemsProps,
  JustifyContentProps,
  FlexDirectionProps,
  FlexWrapProps,
  layout,
  OverflowProps,
} from 'styled-system'

interface BoxAttrsProps {
  inline?: boolean
}
type BoxProps = DisplayProps &
  SpaceProps &
  SizeProps &
  FontSizeProps &
  PositionProps &
  LayoutProps &
  BackgroundProps &
  OverflowProps &
  BoxAttrsProps
export const Box = styled.div.attrs<BoxProps>((props) => ({
  display: props.inline ? 'inline-block' : 'block',
}))<BoxProps>`
  ${display}
  ${space}
  ${width}
  ${height}
  ${fontSize}
  ${position}
  ${maxWidth}
  ${minWidth}
  ${maxHeight}
  ${top}
  ${bottom}
  ${left}
  ${right}
  ${minHeight}
  ${zIndex}
  ${background}
  ${layout}
`

interface FlexAttrsProps {
  center?: boolean
  column?: boolean
  inline?: boolean
}
type FlexBlockProps = FlexProps &
  AlignItemsProps &
  JustifyContentProps &
  FlexDirectionProps &
  FlexWrapProps &
  FlexAttrsProps

export const Flex = styled(Box).attrs<FlexBlockProps>((props) => ({
  justifyContent: props.justifyContent || (props.center && 'center'),
  alignItems: props.alignItems || (props.center && 'center'),
  flexDirection: props.flexDirection || (props.column ? 'column' : 'row'),
  display: props.inline ? 'inline-flex' : 'flex',
}))<FlexBlockProps>`
  ${flex}
  ${alignItems}
  ${justifyContent}
  ${flexDirection}
  ${flexWrap}
`
