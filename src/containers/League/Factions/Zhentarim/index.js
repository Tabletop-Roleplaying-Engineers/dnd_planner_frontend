import { Affix, Tabs, Timeline } from 'antd'
import React, { useEffect, useState } from 'react'
import { Flex, Box } from 'noui/Position'
import { isMobile } from 'noui/MediaQuery'
import { Paragraph, Header, Msg } from 'ui/Text'
import Portrait from 'ui/Portrait'
import TextWithImage from '../shared/components/TextWithImage'

import cover from '../shared/images/02_LATEST-STORY_Factions_ZHNT_InlineR_140702_0.jpg'
import logo from './shared/5e_Zhentarim_Symbol.png'

const GOALS = [
  'Збагачуватись.',
  'Шукати можливості захопити владу.',
  'Розширювати вплив на ключові організації та людей.',
  'Керувати Фаеруном.',
]

const BELIEFS = [
  'Жентарім - твоя сім’я. Ти прикриває його, він прикриває тебе.',
  'Ти - господар своєї долі. Не будь чимось меншим за те, ким ти можеш стати.',
  'У всього та всіх є своя ціна.',
]

const Zhentarim = ({history, location}) => {
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
            text="Жентарім"
          />
          
          <Box my={30}>
            <Paragraph fontSize="16px">
              Жентарім - це безпринципова тіньова мережа, мета якої - поширити свій вплив на весь Фаерун. Організація
              амбіційна, опортуністична та вважає, що при владі мають бути лише достойні, в незалежності від їхнього
              економічного чи соціального стану.
            </Paragraph>
          </Box>
          
          <Box my={10}>
            <Paragraph fontSize="16px">
              Агент Жентаріму відчуває себе частиною великої сім’ї, покладаючись на Чорну Мережу в питаннях ресурсів та
              безпеки. Однак, члени організації користуються достатньою автономією, аби переслідувати власні інтереси, а
              також досягти певного рівня особистої могутності чи впливу.
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

export default Zhentarim
