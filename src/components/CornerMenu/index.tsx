import React from 'react'
import { Dropdown, Icon } from 'antd'
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
            <Icon type="ellipsis" data-testid="corner-menu" />
          </Dropdown>
        </Box>
      )}
    </Box>
  )
}
