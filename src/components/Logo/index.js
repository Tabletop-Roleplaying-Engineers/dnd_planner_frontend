import React, { Fragment } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { TabletAndDesktop, Mobile } from 'noui/MediaQuery'
import bigLogo from './shared/logoBig.png'
import miniLogo from './shared/logoMini.svg'
import { space } from 'styled-system'

const Image = styled.img`
  height: 100%;
  object-fit: contain;
  cursor: pointer;
  ${space}
`

const Logo = () => {
  const navigate = useNavigate()

  const toHome = () => navigate('/')

  return (
    <Fragment>
      <TabletAndDesktop>
        <Image onClick={toHome} src={bigLogo} alt="logo" />
      </TabletAndDesktop>

      <Mobile>
        <Image ml="5px" py="5px" onClick={toHome} src={miniLogo} alt="logo" />
      </Mobile>
    </Fragment>
  )
}

export default Logo
