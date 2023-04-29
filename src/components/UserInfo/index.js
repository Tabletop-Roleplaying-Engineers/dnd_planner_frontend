import React from 'react'
import { Avatar, Tooltip } from 'antd'

const UserInfo = ({
  firstName,
  lastName,
  username,
  avatar,
  position = 'top',
  ...rest
}) => (
  <Tooltip placement={position} title={`${firstName || ''} ${lastName || ''}`}>
    <a
      href={`https://t.me/${username}`}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => e.stopPropagation()}
      aria-label="User avatar"
      {...rest}
    >
      <Avatar size="large" src={avatar} />
    </a>
  </Tooltip>
)

export default UserInfo
