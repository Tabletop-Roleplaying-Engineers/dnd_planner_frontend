import styled from 'styled-components'

export const Msg = styled.p.attrs(props => ({
  display: props.inline ? 'inline-block' : 'block'
}))`
  font-size: 14px;
`
