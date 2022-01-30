import { PlusOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import React from 'react'
import { Box, Flex } from 'noui/Position'
import { Msg } from 'ui/Text'
import styled from 'styled-components'

const Wrapper = styled(Box)`
  min-height: 80px;
  padding: 0 10px;
`

const CellHeader = styled(Flex)`
  padding: 10px 0;
`

// TODO: do we use it?
const FullCalendarCell = ({ children, date, showAddGame, onAddGame }) => (
  <Wrapper>
    <CellHeader my={10} justifyContent="space-between">
      {showAddGame && (
        <Button
          type="primary"
          shape="round"
          icon={<PlusOutlined />}
          size="small"
          onClick={onAddGame}
        />
      )}
      <Msg>{date.format('DD')}</Msg>
    </CellHeader>

    {children}
  </Wrapper>
)

export default FullCalendarCell
