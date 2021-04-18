import React from 'react'
import styled from 'styled-components'
import { Button } from 'antd'
import { FormattedMessage } from 'react-intl'
import { Flex } from 'noui/Position'

const ZeroWidth = styled(Flex)`
  width: 0;
`
const RightBtn = styled(ZeroWidth)`
  justify-content: flex-end;
`

export const NavigationButtons = ({
  onPreviousClick,
  onNextClick,
  onTodayClick,
}) => {
  return (
    <Flex justifyContent="space-between">
      <ZeroWidth>
        <Button onClick={onPreviousClick}>
          <FormattedMessage id="common.previous" />
        </Button>
      </ZeroWidth>
      <Button onClick={onTodayClick}>
        <FormattedMessage id="common.today" />
      </Button>
      <RightBtn>
        <Button onClick={onNextClick}>
          <FormattedMessage id="common.next" />
        </Button>
      </RightBtn>
    </Flex>
  )
}
