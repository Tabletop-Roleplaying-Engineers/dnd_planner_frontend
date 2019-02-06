import { Button, Layout } from 'antd'
import React from 'react'
import { Flex } from 'noui/Position'
import styled from 'styled-components'

const StyledHeader = styled(Layout.Header)`
  max-height: 64px;
  height: 64px;
  background: black;
  
  &.ant-layout-header{
    padding-left: 0;
  }
`

const Logo = styled.img`
  height: 60px;
`

class Header extends React.PureComponent {
  
  render () {
    return (
      <StyledHeader>
        <Flex center justifyContent="space-between">
          <Logo src="http://www.enworld.org/forum/attachment.php?attachmentid=62507&d=1404384551" alt="logo"/>
        
          <Button type="primary">Sign In</Button>
        </Flex>
      </StyledHeader>
    )
  }
}

export default Header
