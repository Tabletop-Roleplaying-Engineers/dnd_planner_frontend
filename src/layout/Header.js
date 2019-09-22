import React, { useContext } from 'react'
import { Button, Dropdown, Icon, Layout, Menu } from 'antd'
import { Flex } from 'noui/Position'
import Logo from 'components/Logo'
import { Link } from 'react-router-dom'
// import { Link } from 'react-router-dom'
// import { Box } from 'noui/Position'
import styled from 'styled-components'
import { Box } from '../noui/Position'
import { UserContext } from '../context/userContext'

const StyledHeader = styled(Layout.Header)`
  max-height: 64px;
  height: 64px;
  background: black;

  &.ant-layout-header{
    padding: 0 3vw 0 0;
  }
`

const menu = (
  <Menu>
    <Menu.Item key="calendar">
      <Link to="/calendar">
        <Box inline mr="5px">
          <Icon type="calendar" />
        </Box>
        Calendar
      </Link>
    </Menu.Item>

    <Menu.Item key="dashboard">
      <Link to="/dashboard">
        <Box inline mr="5px">
          <Icon type="home" />
        </Box>
        Dashboard
      </Link>
    </Menu.Item>

    <Menu.Item key="profile">
      <Link to="/profile">
        <Box inline mr="5px">
          <Icon type="user" />
        </Box>
        Profile
      </Link>
    </Menu.Item>

  </Menu>
)

const Header = () => {
  const { user } = useContext(UserContext)

  return (
    <StyledHeader>
      <Flex center justifyContent="space-between" height="100%">
        <Logo />

        {user && (
          <Dropdown placement="bottomRight" overlay={menu}>
            <Button style={{ padding: '0 10px'}} type="primary">
              Roll for...
              {/*<Icon style={{fontSize: '20px', color: 'black'}} type="menu" />*/}
            </Button>
          </Dropdown>
        )}
      </Flex>
    </StyledHeader>
  )
}

export default Header
