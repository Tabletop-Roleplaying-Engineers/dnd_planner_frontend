import { Button, Layout } from 'antd'
import React from 'react'
import { Flex } from 'noui/Position'
import Logo from 'components/Logo'
import { Link } from 'react-router-dom'
import { Box } from 'noui/Position'
import styled from 'styled-components'

const StyledHeader = styled(Layout.Header)`
  max-height: 64px;
  height: 64px;
  background: black;
  
  &.ant-layout-header{
    padding: 0 3vw 0 0;
  }
`

class Header extends React.PureComponent {
  render () {
    return (
      <StyledHeader>
        <Flex center justifyContent="space-between">
          <Logo />

          <Box>
            <Box inline mr={10}>
              <Link to="/dashboard">Dashboard</Link>
            </Box>
            <Box inline mr={10}>
              <Link to="/profile">Profile</Link>
            </Box>
            <Link to="/help">Help</Link>
          </Box>

          <Button type="primary">Sign In</Button>
        </Flex>
      </StyledHeader>
    )
  }
}

export default Header
