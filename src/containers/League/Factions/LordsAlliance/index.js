import { Affix, Tabs, Timeline } from 'antd'
import React, { useEffect, useState } from 'react'
import { Flex, Box } from 'noui/Position'
import { useScreenMedia } from 'noui/MediaQuery'
import { Paragraph, Header, Msg } from 'ui/Text'
import Portrait from 'ui/Portrait'
import TextWithImage from '../shared/components/TextWithImage'

import cover from '../shared/images/02_LATEST-STORY_Factions_LRDS_InlineR_140702_0.jpg'
import logo from './shared/download.png'

const GOALS = [
  'Забезпечити безпеку і процвітання міст та інших поселень Фаеруну.',
  'Підтримувати широку коаліцію заради стабільності.',
  'Оперативно знищувати загрозу існуючим правителям.',
  'Приносити честь і славу своїм лідерам та рідним землям.',
]

const BELIEFS = [
  'Щоб зберегти цивілізацію, всі повинні об’єднати зусилля в боротьбі із темними силами.',
  'Бийся за своє королівство. Тільки ти можеш принести честь, славу та процвітання своєму лорду.',
  'Не чекай, поки ворог прийде до тебе. Кращий захист - це напад.',
]

const LordsAlliance = ({ history, location }) => {
  const [tab, setTab] = useState(location.hash.substring(1) || 'main')
  const media = useScreenMedia()

  useEffect(() => {
    history.replace({
      path: location.path,
      hash: tab,
    })
  }, [history, location.path, tab])

  return (
    <Box>
      <Tabs
        activeKey={tab}
        onChange={setTab}
        type="card"
        tabPosition={media.isMobile ? 'top' : 'left'}
      >
        {/*Main*/}
        <Tabs.TabPane tab="Головна" key="main">
          <TextWithImage image={cover} text="Альянс Лордів" />

          <Box my={30}>
            <Paragraph fontSize="16px">
              Алянс Лордів - це вільна коаліція сталих політичних сил, що
              направлена на підтримку взаємної безпеки та процвітання. Ця
              організація відома своєю агресивністю, войовничістю та
              максимальною залученістю в політику.
            </Paragraph>
          </Box>

          <Box my={10}>
            <Paragraph fontSize="16px">
              Для того, щоб знайти та знищити небезпеку своїм рідним землям,
              агенти Альянсу Лордів мають бути дуже добре навчені. Мало хто може
              зрівнятись з ними на полі бою. Вони б’ються за славу та безпеку
              свого народу і своїх правителів, і роблять це з гордістю. Але
              Альянс Лордів може вистояти тільки якщо всі його члени будуть
              вести “чесну гру” між собою, що вимагає певної дипломатичності.
            </Paragraph>
          </Box>
        </Tabs.TabPane>

        <Tabs.TabPane tab="Цілі та переконання" key="goals_and_beliefs">
          <Box position="absolute" right={20} zIndex={10}>
            <Affix offsetTop={0}>
              <Portrait src={logo} alt="гул 1" />
            </Affix>
          </Box>

          <Flex pb={10}>
            <Header fontSize={30} fontWeight="bold">
              Цілі:
            </Header>
          </Flex>

          <Timeline>
            {GOALS.map((goal) => (
              <Timeline.Item>
                <Msg fontSize={18}>{goal}</Msg>
              </Timeline.Item>
            ))}
          </Timeline>

          <Flex pb={10}>
            <Header fontSize={30} fontWeight="bold">
              Переконання:
            </Header>
          </Flex>

          <Timeline>
            {BELIEFS.map((belief) => (
              <Timeline.Item>
                <Msg fontSize={18}>{belief}</Msg>
              </Timeline.Item>
            ))}
          </Timeline>

          <Box my={10}>
            <Paragraph fontSize="16px">
              ви можете наповнити цей блок своєю інформацією
            </Paragraph>
          </Box>
        </Tabs.TabPane>

        <Tabs.TabPane tab="Члени фракції" key="members" disabled></Tabs.TabPane>
      </Tabs>
    </Box>
  )
}

export default LordsAlliance
