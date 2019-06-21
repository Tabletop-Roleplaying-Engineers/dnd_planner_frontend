import React, { Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'
// import { TabletAndDesktop, Mobile } from 'noui/MediaQuery'
import bigLogo from './shared/logoBig.png'
// import miniLogo from './shared/logoMini.svg'
import { space } from 'styled-system'

const Image = styled.img`
  height: 100%;
  object-fit: contain;
  cursor: pointer;
  ${space}
`

const Logo = props => {
  const navigate = () => props.history.push('/')
  
  return (
    <Fragment>
      {/*<TabletAndDesktop>*/}
      
      {/*</TabletAndDesktop>*/}
      <Image
        onClick={navigate}
        src={bigLogo}
        alt="logo"
      />
      {/*<Mobile>*/}
      {/*  <Image*/}
      {/*    ml="5px"*/}
      {/*    py="5px"*/}
      {/*    onClick={navigate}*/}
      {/*    src={miniLogo}*/}
      {/*    alt="logo"*/}
      {/*  />*/}
      {/*</Mobile>*/}
    </Fragment>
  )
}


export default withRouter(Logo)
