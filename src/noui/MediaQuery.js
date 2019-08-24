import React from 'react'
import MediaQuery from 'react-responsive'
import { useMedia } from 'use-media'

export const Mobile = ({children, ...rest}) =>
  <MediaQuery minDeviceWidth={320} maxDeviceWidth={767} {...rest}>
    {children}
  </MediaQuery>

export const Tablet = ({children, ...rest}) =>
  <MediaQuery minDeviceWidth={768} maxDeviceWidth={1223} {...rest}>
    {children}
  </MediaQuery>

export const Desktop = ({children, ...rest}) =>
  <MediaQuery minDeviceWidth={1224} {...rest}>
    {children}
  </MediaQuery>

export const TabletAndDesktop = ({children, ...rest}) =>
  <MediaQuery minDeviceWidth={768} {...rest}>
    {children}
  </MediaQuery>

export const isMobile = () => useMedia({ maxWidth: 767 })
export const isTablet = () => useMedia({ maxWidth: 1223 })
export const isDesktop = () => useMedia({ minWidth: 1244 })

