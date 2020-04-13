import { Avatar, Tooltip } from 'antd'
import React from 'react'

const UserInfo = ({ firstName, lastName, username, avatar, position = 'top' }) =>
  <Tooltip placement={position} title={`${firstName} ${lastName}`}>
    <a
      href={`https://web.telegram.org/#/im?p=@${username}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      <Avatar size="large" src={avatar}/>
    </a>
  </Tooltip>
UserInfo.displayName = 'UserInfo'

export default UserInfo
