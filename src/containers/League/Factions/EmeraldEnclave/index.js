import { Affix, Tabs, Timeline } from 'antd'
import React, { useEffect, useState } from 'react'
import { Flex, Box } from 'noui/Position'
import { isMobile } from 'noui/MediaQuery'
import { Paragraph, Header, Msg } from 'ui/Text'
import Portrait from 'ui/Portrait'
import TextWithImage from '../shared/components/TextWithImage'

import cover from '../shared/images/02_LATEST-STORY_Factions_EmeraldEnclave_InlineR_140702_0.jpg'
import logo from './shared/53957976bc25a4c2b49dbfe71253d0d8.png'

const GOALS = [
  'Відновлювати та підтримувати природній порядок.',
  'Знищити все, що протиприроднє.',
  'Тримати стихійні сили світу під контролем.',
  'Стримувати цивілізацію та природу від взаємного знищення.',
]

const BELIEFS = [
  'Природній порядок має бути збережено.',
  'Усі сили, що загрожують природньому порядку, мають бути знищені.',
  'Цивілізація і природа мають існувати мирно.',
]

const EmeraldEnclave = ({history, location}) => {
  const [tab, setTab] = useState(location.hash.substring(1) || 'main')
  
  useEffect(() => {
    history.replace({
      path: location.path,
      hash: tab
    })
  }, [tab])
  
  return (
    <Box>
      <Tabs
        activeKey={tab}
        onChange={setTab}
        type="card"
        tabPosition={isMobile() ? 'top' : 'left'}
      >
        {/*Main*/}
        <Tabs.TabPane
          tab="Головна"
          key="main"
        >
          <TextWithImage
            image={cover}
            text="Смарагдовий Анклав"
          />
          
          <Box my={30}>
            <Paragraph fontSize="16px">
              Смарагдовий Анклав - це поширена група мешканців дикої місцевості, які зберігають природний стан речей та
              викорчовують усі протиприродні загрози. Члени цієї організації розсіяні по світу та схильні до
              відлюдності.
            </Paragraph>
          </Box>
          
          <Box my={10}>
            <Paragraph fontSize="16px">
              Агенти Смарагдового Анклаву розкидані по світу і переважно працюють ізольовано. Виживання в суворому світі
              також потребує серйозної виносливості та майстерності в мистецтві бою. Вони вчаться більше покладатись на
              власні сили, аніж на інших. Однак частина агентів Смарагдового Анклаву присвячують себе допомозі іншим для
              виживання серед небезпек диких земель.
            </Paragraph>
          </Box>
        </Tabs.TabPane>
        
        <Tabs.TabPane
          tab="Цілі та переконання"
          key="goals_and_beliefs"
        >
          <Box
            position="absolute"
            right={20}
            zIndex={10}
          >
            <Affix offsetTop={0}>
              <Portrait
                src={logo}
                alt="гул 1"
              />
            </Affix>
          </Box>
          
          <Flex pb={10}>
            <Header fontSize={30} fontWeight="bold">
              Цілі:
            </Header>
          </Flex>
          
          <Timeline>
            {
              GOALS.map(goal =>
                <Timeline.Item>
                  <Msg fontSize={18}>
                    {goal}
                  </Msg>
                </Timeline.Item>
              )
            }
          </Timeline>
          
          <Flex pb={10}>
            <Header fontSize={30} fontWeight="bold">
              Переконання:
            </Header>
          </Flex>
          
          <Timeline>
            {
              BELIEFS.map(belief =>
                <Timeline.Item>
                  <Msg fontSize={18}>
                    {belief}
                  </Msg>
                </Timeline.Item>
              )
            }
          </Timeline>
          
          <Box my={10}>
            <Paragraph fontSize="16px">
              ви можете наповнити цей блок своєю інформацією
            </Paragraph>
          </Box>
        
        </Tabs.TabPane>
        
        <Tabs.TabPane
          tab="Члени фракції"
          key="members"
          disabled
        >
        
        </Tabs.TabPane>
      </Tabs>
    </Box>
  )
}

export default EmeraldEnclave
