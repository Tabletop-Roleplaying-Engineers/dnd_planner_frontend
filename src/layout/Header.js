import React, { useContext, useEffect } from 'react'
import {
  CalendarOutlined,
  HomeOutlined,
  SearchOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { Button, Dropdown, Layout, Menu } from 'antd'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { FormattedMessage } from 'react-intl'
import { Flex } from 'noui/Position'
import { isTesting } from 'utils/common'
import Logo from 'components/Logo'
import { Box } from '../noui/Position'
import { UserContext } from '../context/userContext'

const StyledHeader = styled(Layout.Header)`
  max-height: 64px;
  height: 64px;
  background: black;

  &.ant-layout-header {
    padding: 0 3vw 0 0;
  }
`

const NavigationMenu = () => {
  const navigate = useNavigate()

  return (
    <Menu
      onClick={({ key, domEvent }) => {
        domEvent.preventDefault()
        domEvent.stopPropagation()

        navigate('/' + key)
      }}
    >
      <Menu.Item key="calendar">
        <Box inline mr="5px">
          <CalendarOutlined />
        </Box>
        <FormattedMessage id="menu.calendar" />
      </Menu.Item>

      <Menu.Item key="dashboard">
        <Box inline mr="5px">
          <HomeOutlined />
        </Box>
        <FormattedMessage id="menu.dashboard" />
      </Menu.Item>

      <Menu.Item key="search">
        <Box inline mr="5px">
          <SearchOutlined />
        </Box>
        <FormattedMessage id="menu.search" />
      </Menu.Item>

      <Menu.Item key="profile">
        <Box inline mr="5px">
          <UserOutlined />
        </Box>
        <FormattedMessage id="menu.profile" />
      </Menu.Item>
    </Menu>
  )
}

const TestLoginBtn = () => {
  const authData = {
    first_name: 'first_name',
    last_name: 'last_name',
    photo_url: 'photo_url',
    id: 'id',
    username: 'username',
    auth_date: 'auth_date',
    hash: 'hash',
  }
  const params = Object.keys(authData)
    .map((key) => `${key}=${authData[key]}`)
    .join('&')

  useEffect(() => {
    const telegramIFrame = document.querySelector(
      'iframe[id*="telegram-login-"]',
    )
    // Need to remove Telegram iframe, it is rendered over the button
    telegramIFrame.remove()
  }, [])

  return (
    <a data-testid="login-btn" href={`/login?${params}`}>
      Login
    </a>
  )
}

const Header = () => {
  const { user } = useContext(UserContext)

  return (
    <StyledHeader>
      <Flex center justifyContent="space-between" height="100%">
        <Logo />

        {user && (
          <span data-testid="profile-drop-menu">
            <Dropdown
              trigger={['click']}
              placement="bottomRight"
              overlay={<NavigationMenu />}
            >
              <Button style={{ padding: '0 10px' }} type="primary">
                <FormattedMessage id="menu.buttonLabel" />
              </Button>
            </Dropdown>
          </span>
        )}

        {isTesting() && !user && <TestLoginBtn />}
      </Flex>
    </StyledHeader>
  )
}

export default Header
