import { Affix, Tabs, Timeline } from 'antd'
import React, { useEffect, useState } from 'react'
import { Flex, Box } from 'noui/Position'
import { useScreenMedia } from 'noui/MediaQuery'
import { Paragraph, Header, Msg } from 'ui/Text'
import Portrait from 'ui/Portrait'
import TextWithImage from '../shared/components/TextWithImage'

import cover from '../shared/images/02_LATEST-STORY_Factions_Harpers_InlineR_140702_0.jpg'
import logo from './shared/br-harpers.png'

const GOALS = [
  'Збирати інформацію по усьому Фаеруну.',
  'Завуальовано відстоювати ідеали рівності та справедливості.',
  'Протистояти тиранам та тим лідерам чи організаціям, що досягають занадто великої могутності.',
  'Допомагати слабким, бідним та ущемленим.',
]

const BELIEFS = [
  'Інформації та магічних знань ніколи не буває занадто багато.',
  'Занадто велика влада розбещує.',
  'Ніхто не має бути безпомічним.',
]

const Harpers = ({ history, location }) => {
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
          <TextWithImage image={cover} text="Арфісти" />

          <Box my={30}>
            <Paragraph fontSize="16px">
              Арфісти - це широка мережа чаклунів та шпигунів, що відстоюють
              ідеали рівності та таємно протистоять зловживанню владою. Ця
              організація знає про багато речей, але мало хто знає про неї.
            </Paragraph>
          </Box>

          <Box my={10}>
            <Paragraph fontSize="16px">
              Агенти Арфістів навчені діяти самотужки та покладатись виключно на
              власні ресурси. Якщо вони потрапляють в неприємності, вони ніколи
              не розраховують, що інші Арфісти їх врятують. Не дивлячись на це,
              кожен Арфіст готовий прийти на поміч в час потреби, а дружба між
              агентами фракції практично непорушна. Майстри шпигунства та
              скритого проникнення, вони діють в тіні, застосовують багато
              фальшивих особистостей для створення союзів, розширення своєї
              мережі по збору інформації, а також маніпуляції іншими заради
              власних потреб.
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

export default Harpers
