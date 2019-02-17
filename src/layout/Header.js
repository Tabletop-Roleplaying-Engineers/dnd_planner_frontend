import { Button, Layout } from 'antd'
import React from 'react'
import { Flex } from 'noui/Position'
import Logo from 'components/Logo'
import styled from 'styled-components'

const StyledHeader = styled(Layout.Header)`
  max-height: 64px;
  height: 64px;
  background: black;
  
  &.ant-layout-header{
    padding-left: 0;
  }
`

class Header extends React.PureComponent {
  
  render () {
    return (
      <StyledHeader>
        <Flex center justifyContent="space-between">
          <Logo />
          
          <Button type="primary">Sign In</Button>
        </Flex>
      </StyledHeader>
    )
  }
}

export default Header
