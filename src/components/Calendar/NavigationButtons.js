import React from 'react'
import { Flex } from 'noui/Position'
import {
  Button,
} from 'antd'

export const NavigationButtons = ({ onPreviousClick, onNextClick }) => {
  return (
    <Flex justifyContent="space-between">
      <Button onClick={onPreviousClick}>
        Previous
      </Button>
      <Button onClick={onNextClick}>
        Next
      </Button>
    </Flex>
  )
}
