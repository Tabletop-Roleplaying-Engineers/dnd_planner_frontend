import React, { useEffect, useState } from 'react'
import { Tabs } from 'antd'
import { Box, Flex } from 'noui/Position'
import { Header, Quote, Paragraph, SecretText } from 'ui/Text'
import { isMobile } from 'noui/MediaQuery'
import Portrait from 'ui/Portrait'
import rathPortrait from './shared/rath.jpg'
import zarladaPortrait from './shared/zarlada.jpg'
// import chesterPortrait from './shared/chester.jpg'
import severynPortrait from './shared/severyn.jpg'
import johnPortrait from './shared/john.jpg'
import cronPortrait from './shared/cron.jpg'
import dragonPortrait from './shared/dragon.jpg'

const Enemies = ({history, location}) => {
  const [tab, setTab] = useState(location.hash.substring(1) || 'main')
  
  useEffect(() => {
    history.replace({
      path: location.path,
      hash: tab
    })
  }, [tab])
  
  return (
    <Box mt={10} mr={[0, 20]}>
      123
    </Box>
  )
}

export default Enemies
