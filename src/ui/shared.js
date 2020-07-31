import React from 'react'
import { Icon, Menu } from 'antd'
import styled from 'styled-components'
import { Msg } from 'ui/Text'

const IconStyled = styled(Icon)`
  margin-left: 5px;
`

export const createMenu = items => (
  <Menu>
    {items.map(({ label, icon, onClick, ...other }, idx) => (
      <Menu.Item key={idx} onClick={onClick} {...other}>
        {label && <Msg>{label}</Msg>}

        {icon && <IconStyled type={icon} />}
      </Menu.Item>
    ))}
  </Menu>
)
