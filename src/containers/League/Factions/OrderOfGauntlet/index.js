import { Affix, Tabs, Timeline } from 'antd'
import React, { useEffect, useState } from 'react'
import { Flex, Box } from 'noui/Position'
import { useScreenMedia } from 'noui/MediaQuery'
import { Paragraph, Header, Msg } from 'ui/Text'
import Portrait from 'ui/Portrait'
import TextWithImage from '../shared/components/TextWithImage'

import cover from '../shared/images/02_LATEST-STORY_Factions_OOTG_InlineR_140702_0.jpg'
import logo from './shared/br-orderofthegauntlet.png'
import { useLocation, useNavigate } from 'react-router-dom'

const GOALS = [
  'Завжди бути спостережливим і озброєним перед лицем зла.',
  'Виявляти загрози у вигляді секретних груп та злих істот.',
  'Насаджувати справедливість.',
  'Нести покарання лише у відповідь - ніколи не атакувати першим.',
]

const BELIEFS = [
  'Віра - це найвеличніша зброя проти зла - віра в бога, друзів і самого себе.',
  'Протистояння злу - складна задача, що потребує неймовірної хоробрості і сили',
  'Карати злі діяння - справедливо. Карати злі думки - ні.',
]

const OrderOfGauntlet = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [tab, setTab] = useState(location.hash.substring(1) || 'main')
  const media = useScreenMedia()

  useEffect(() => {
    navigate(
      {
        hash: tab,
      },
      { replace: true },
    )
  }, [navigate, tab])

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
          <TextWithImage image={cover} text="Орден Латної Рукавиці" />

          <Box my={30}>
            <Paragraph fontSize="16px">
              Орден Латної Рукавиці об’єднує пильних та відданих своїй справі
              шукачів справедливості. Ця організація відома своїм благородством
              та фанатизмом.
            </Paragraph>
          </Box>

          <Box my={10}>
            <Paragraph fontSize="16px">
              Орден Латної Рукавиці - це міцне угрупування осіб, що розділяють
              спільні ідеали, рухомі релігійним фанатизмом або ж загостреним
              відчуттям справедливості. Дружба і братерство важливі для членів
              Ордену, і вони відносяться один до одного із довірою та
              прив’язаністю, яка буває тільки між братами чи сестрами. Як
              солдати із високою мотивацією, агенти Ордену намагаються стати
              кращими в тому, що роблять, і шукають можливості випробувати свою
              доблесть.
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

export default OrderOfGauntlet
