import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { TabletAndDesktop, Mobile } from 'noui/MediaQuery'

const StyledLogo = styled.img`
  height: 60px;
`

const Logo = () =>
  <Link to="/">
    <TabletAndDesktop>
      <StyledLogo src="http://www.enworld.org/forum/attachment.php?attachmentid=62507&d=1404384551" alt="logo"/>
    </TabletAndDesktop>
    <Mobile>
      <StyledLogo src=" http://www.enworld.org/forum/attachment.php?attachmentid=62059&d=1402069840&stc=1" alt="logo"/>
    </Mobile>
  </Link>

export default Logo
