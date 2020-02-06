import React, { useContext, useEffect } from 'react'
import { Button, Dropdown, Icon, Layout, Menu } from 'antd'
import { Flex } from 'noui/Position'
import Logo from 'components/Logo'
import { withRouter } from 'react-router-dom'
// import { Link } from 'react-router-dom'
// import { Box } from 'noui/Position'
import styled from 'styled-components'
import { Box } from '../noui/Position'
import { UserContext } from '../context/userContext'
import { isTesting } from 'utils/common'

const StyledHeader = styled(Layout.Header)`
  max-height: 64px;
  height: 64px;
  background: black;

  &.ant-layout-header{
    padding: 0 3vw 0 0;
  }
`

const menu = ({ history }) => (
  <Menu onClick={({ key, domEvent }) => {
    domEvent.preventDefault();
    domEvent.stopPropagation();

    history.push('/' + key)
  }}>
    <Menu.Item key="calendar">
      <Box inline mr="5px">
        <Icon type="calendar" />
      </Box>
      Calendar
    </Menu.Item>

    <Menu.Item key="dashboard">
      <Box inline mr="5px">
        <Icon type="home" />
      </Box>
      Dashboard
    </Menu.Item>

    <Menu.Item key="profile">
      <Box inline mr="5px">
        <Icon type="user" />
      </Box>
      Profile
    </Menu.Item>

  </Menu>
)

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
  const params = Object.keys(authData).map((key) => `${key}=${authData[key]}`).join('&')

  useEffect(() => {
    const telegramIFrame = document.querySelector('iframe[id*="telegram-login-"]')
    // Need to remove Telegram iframe, it is rendered over the button
    telegramIFrame.remove()
  }, [])

  return <a data-testid="login-btn" href={`/login?${params}`}>Login</a>
}

const Header = ({ history }) => {
  const { user } = useContext(UserContext)

  return (
    <StyledHeader>
      <Flex center justifyContent="space-between" height="100%">
        <Logo />

        {user && (
          <span data-testid="profile-drop-menu">
            <Dropdown trigger={['click']} placement="bottomRight" overlay={menu({ history })}>
              <Button style={{ padding: '0 10px'}} type="primary">
                Roll for...
                {/*<Icon style={{fontSize: '20px', color: 'black'}} type="menu" />*/}
              </Button>
            </Dropdown>
          </span>
        )}

        {isTesting() && !user && <TestLoginBtn />}

      </Flex>
    </StyledHeader>
  )
}

export default withRouter(Header)
