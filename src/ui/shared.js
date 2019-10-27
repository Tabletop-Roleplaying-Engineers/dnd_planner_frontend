import React from 'react'
import { Icon, Menu } from 'antd'
import { Msg } from 'ui/Text'

export const createMenu = items => (
  <Menu>
    {
      items.map(({ label, icon, onClick, ...other }, idx) =>
        <Menu.Item key={idx} onClick={onClick} {...other}>
          {
            label && <Msg>{label}</Msg>
          }

          {
            icon &&  <Icon type={icon} />
          }
        </Menu.Item>
      )
    }
  </Menu>
)
