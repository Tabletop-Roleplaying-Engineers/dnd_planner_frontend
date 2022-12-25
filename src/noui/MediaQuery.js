import React, { useEffect, useMemo, useState } from 'react'
import MediaQuery from 'react-responsive'

export const Mobile = ({ children, ...rest }) => (
  <MediaQuery minDeviceWidth={320} maxDeviceWidth={767} {...rest}>
    {children}
  </MediaQuery>
)

export const Tablet = ({ children, ...rest }) => (
  <MediaQuery minDeviceWidth={768} maxDeviceWidth={1223} {...rest}>
    {children}
  </MediaQuery>
)

export const Desktop = ({ children, ...rest }) => (
  <MediaQuery minDeviceWidth={1224} {...rest}>
    {children}
  </MediaQuery>
)

export const TabletAndDesktop = ({ children, ...rest }) => (
  <MediaQuery minDeviceWidth={768} {...rest}>
    {children}
  </MediaQuery>
)

export function useScreenMedia() {
  const device = useMedia(
    ['(min-width: 1224px)', '(min-width: 768px)'],
    ['desktop', 'tablet'],
    'mobile',
  )

  return useMemo(
    () => ({
      isMobile: device === 'mobile',
      isTablet: device === 'tablet',
      isDesktop: device === 'desktop',
    }),
    [device],
  )
}

function useMedia(queries, values, defaultValue) {
  // Array containing a media query list for each query
  const mediaQueryLists = queries.map((q) => window.matchMedia(q))
  // Function that gets value based on matching media query
  const getValue = () => {
    // Get index of first media query that matches
    const index = mediaQueryLists.findIndex((mql) => mql.matches)

    // Return related value or defaultValue if none
    return typeof values[index] !== 'undefined' ? values[index] : defaultValue
  }
  // State and setter for matched value
  const [value, setValue] = useState(getValue)
  useEffect(
    () => {
      // Event listener callback
      // Note: By defining getValue outside of useEffect we ensure that it has ...
      // ... current values of hook args (as this hook callback is created once on mount).
      const handler = () => setValue(getValue)
      // Set a listener for each media query with above handler as callback.
      mediaQueryLists.forEach((mql) => mql.addListener(handler))

      // Remove listeners on cleanup
      return () => mediaQueryLists.forEach((mql) => mql.removeListener(handler))
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [], // Empty array ensures effect is only run on mount and unmount
  )

  return value
}
