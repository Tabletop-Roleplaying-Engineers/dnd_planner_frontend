import React from 'react'
import { Button, Avatar } from 'antd'
import styled from 'styled-components'
import { Flex } from 'noui/Position'
import { Msg } from 'ui/Text'
import { getAvatarLetters } from 'utils/common'
import { Carousel } from 'antd'

const getUserName = (user) => {
  return `${user.firstName || ''} ${user.lastName || ''}`
}

const AvatarWrapper = styled.span`
  margin: 10px;
`

export const SettingsTab = (props) => {
  const { onLogOutClick, user } = props

  return (
    <Flex column width={['100%', '45%']}>
      <Flex alignItems="center">
        <AvatarWrapper>
          <Avatar size="large" src={user.avatar}>{getAvatarLetters(user)}</Avatar>
        </AvatarWrapper>
        <Msg fontSize="24px">{getUserName(user)}</Msg>
      </Flex>

      <Button
        onClick={onLogOutClick}
      >
        Sign out
      </Button>

      <Carousel effect="fade" dotPosition="left">
        <div>
          <h3>1</h3>
        </div>
        <div>
          <h3>2</h3>
        </div>
        <div>
          <h3>3</h3>
        </div>
        <div>
          <h3>4</h3>
        </div>
      </Carousel>

      {/* <iframe
        title="twitchPlayer"
        src="https://player.twitch.tv/?channel=ikethavel"
        frameborder="0"
        allowfullscreen="true"
        scrolling="no"
        height="378"
        width="620"
      ></iframe>

      <iframe
        title="twitchChat"
        src="https://www.twitch.tv/embed/ikethavel/chat"
        frameborder="0"
        scrolling="no"
        height="500"
        width="350"
      ></iframe> */}

    </Flex>
  )
}
