import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const StyledLogo = styled.img`
  height: 60px;
`

const Logo = () =>
  <Link to="/">
    <StyledLogo src="http://www.enworld.org/forum/attachment.php?attachmentid=62507&d=1404384551" alt="logo"/>
  </Link>

export default Logo
