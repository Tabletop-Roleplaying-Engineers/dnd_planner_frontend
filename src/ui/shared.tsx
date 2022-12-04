import React, { ComponentProps, ReactNode } from 'react'
import { Menu } from 'antd'
import styled from 'styled-components'
import { Msg } from 'ui/Text'

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
export const createMenu = (items: MenuItem[]) =>
  items.map(({ label, icon, onClick, ...other }, idx) => ({
    key: idx,
    onClick: onClick,
    itemIcon: icon && <IconWrapper>{icon}</IconWrapper>,
    label: label && <Msg>{label}</Msg>,
  }))
