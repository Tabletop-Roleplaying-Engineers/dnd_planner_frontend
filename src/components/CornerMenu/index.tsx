import React from 'react'
import { EllipsisOutlined } from '@ant-design/icons'
import { Dropdown } from 'antd'
import { createMenu, MenuItem } from 'ui/shared'
import { Box } from 'noui/Position'

interface Props {
  items: MenuItem[]
  hide?: boolean
}
export const CornerMenu: React.FC<Props> = (props) => {
  const { items, children, hide } = props

  return (
    <Box position="relative">
      {children}
      {!hide && (
        <Box position="absolute" top={0} right={10}>
          <Dropdown overlay={createMenu(items)} trigger={['click']}>
            <EllipsisOutlined data-testid="corner-menu" />
          </Dropdown>
        </Box>
      )}
    </Box>
  )
}
