import React from 'react'
import styled from 'styled-components'

const Text = styled.div`
  white-space: pre-wrap;
`

export const FormattedText = ({ text }) => {
  return <Text>{text}</Text>
}
