import React from 'react'
import styled from 'styled-components'
import { Flex } from 'noui/Position'
import {
  Button,
} from 'antd'

const ZeroWidth = styled(Flex)`
  width: 0;
`
const RightBtn = styled(ZeroWidth)`
  justify-content: flex-end;
`

export const NavigationButtons = ({ onPreviousClick, onNextClick, onTodayClick }) => {
  return (
    <Flex justifyContent="space-between">
      <ZeroWidth>
        <Button onClick={onPreviousClick}>
          Previous
        </Button>
      </ZeroWidth>
      <Button onClick={onTodayClick}>
        Today
      </Button>
      <RightBtn>
        <Button onClick={onNextClick}>
          Next
        </Button>
      </RightBtn>
    </Flex>
  )
}
