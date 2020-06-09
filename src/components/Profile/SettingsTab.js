import React, { useCallback } from 'react'
import { Button, Avatar } from 'antd'
import styled from 'styled-components'
import { Flex } from 'noui/Position'
import { Msg } from 'ui/Text'
import { getAvatarLetters } from 'utils/common'

const getUserName = user => {
  return `${user.firstName || ''} ${user.lastName || ''}`
}

const AvatarWrapper = styled.span`
  margin: 10px;
`

export const SettingsTab = props => {
  const { onLogOutClick, logoutBehalf, isOnBehalf, user } = props

  return (
    <Flex column width={['100%', '45%']}>
      <Flex alignItems="center">
        <AvatarWrapper>
          <Avatar size="large" src={user.avatar}>
            {getAvatarLetters(user)}
          </Avatar>
        </AvatarWrapper>
        <Msg fontSize="24px">{getUserName(user)}</Msg>
      </Flex>

      <Button onClick={onLogOutClick}>Sign out</Button>

      {isOnBehalf && (
        <Button onClick={logoutBehalf}>
          Sign out from {getUserName(user)}
        </Button>
      )}
    </Flex>
  )
}
