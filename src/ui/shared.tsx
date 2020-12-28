import React, { ComponentProps } from 'react'
import { Icon, Menu } from 'antd'
import styled from 'styled-components'
import { Msg } from 'ui/Text'

const IconStyled = styled(Icon)`
  margin-left: 5px;
`

type MenuItemProps = ComponentProps<typeof Menu.Item>

export interface MenuItem extends MenuItemProps {
  label: string
  icon: string
  onClick: () => void
}
export const createMenu = (items: MenuItem[]) => (
  <Menu>
    {items.map(({ label, icon, onClick, ...other }, idx) => (
      <Menu.Item key={idx} onClick={onClick} {...other}>
        {label && <Msg>{label}</Msg>}

        {icon && <IconStyled type={icon} />}
      </Menu.Item>
    ))}
  </Menu>
)
