import React, { ComponentProps, ReactNode } from 'react'
import { Menu } from 'antd'
import styled from 'styled-components'
import { Msg } from 'ui/Text'
import { Flex } from 'noui/Position'

const IconWrapper = styled.div`
  margin-left: 5px;
`

type MenuItemProps = ComponentProps<typeof Menu.Item>

export interface MenuItem extends MenuItemProps {
  label: string
  icon: ReactNode
  onClick: () => void
  'data-testid': string
}
export const createMenu = (items: MenuItem[]) => (
  <Menu>
    {items.map(({ label, icon, onClick, ...other }, idx) => (
      <Menu.Item key={idx} onClick={onClick} {...other}>
        <Flex>
          {label && <Msg>{label}</Msg>}

          {icon && <IconWrapper>{icon}</IconWrapper>}
        </Flex>
      </Menu.Item>
    ))}
  </Menu>
)
