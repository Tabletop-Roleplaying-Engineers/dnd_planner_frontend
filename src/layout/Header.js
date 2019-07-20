import { Button, Dropdown, Icon, Layout, Menu } from 'antd'
import React from 'react'
import { Flex } from 'noui/Position'
import Logo from 'components/Logo'
import { Link } from 'react-router-dom'
// import { Link } from 'react-router-dom'
// import { Box } from 'noui/Position'
import styled from 'styled-components'

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
    <Menu.Item key="1"><Link to="/profile">Profile</Link></Menu.Item>
  </Menu>
)

class Header extends React.PureComponent {
  render () {
    return (
      <StyledHeader>
        <Flex center justifyContent="space-between" height="100%">
          <Logo />

          {/*<Box>*/}
          {/*  <Box inline mr={10}>*/}
          {/*    <Link to="/dashboard">Dashboard</Link>*/}
          {/*  </Box>*/}
          {/*  <Box inline mr={10}>*/}
          {/*    <Link to="/profile">Profile</Link>*/}
          {/*  </Box>*/}
          {/*  <Link to="/help">Help</Link>*/}
          {/*</Box>*/}
  
          <Dropdown overlay={menu}>
            <Button style={{ padding: '0 10px'}} type="primary">
              <Icon style={{fontSize: '20px', color: 'black'}} type="menu" />
            </Button>
          </Dropdown>
          
        </Flex>
      </StyledHeader>
    )
  }
}

export default Header
