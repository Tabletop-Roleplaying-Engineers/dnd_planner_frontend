import React, { Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'
import { TabletAndDesktop, Mobile } from 'noui/MediaQuery'
import bigLogo from './shared/logoBig.png'
import miniLogo from './shared/logoMini.svg'

const Image = styled.img`
  height: 100%;
  object-fit: contain;
  cursor: pointer;
`

const Logo = props => {
  const navigate = () => props.history.push('/')
  
  return (
    <Fragment>
      <TabletAndDesktop>
        <Image
          onClick={navigate}
          src={bigLogo}
          alt="logo"
         />
      </TabletAndDesktop>

      <Mobile>
        <Image
          onClick={navigate}
          src={miniLogo}
          alt="logo"
         />
      </Mobile>
    </Fragment>
  )
}


export default withRouter(Logo)
