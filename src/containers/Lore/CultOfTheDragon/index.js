import React, { useEffect, useState } from 'react'
import { Tabs } from 'antd'
import { Box, Flex } from 'noui/Position'
import { Header, Quote, Paragraph, SecretText } from 'ui/Text'
import { isMobile } from 'noui/MediaQuery'

const CultOfTheDragon = ({history, location}) => {
  const [tab, setTab] = useState(location.hash.substring(1) || 'main')
  
  useEffect(() => {
    history.replace({
      path: location.path,
      hash: tab
    })
  }, [tab])
  
  return (
    <Box mt={10} mr={[0, 20]}>
      <Tabs
        activeKey={tab}
        onChange={setTab}
        type="card"
        tabPosition={isMobile() ? 'top' : 'left'}
      >
        <Tabs.TabPane
          tab="Головна"
          key="main"
        >
          <Flex center>
            <Header fontSize={30} fontWeight="bold">Культ Дракона</Header>
          </Flex>
          
          <Box my={10}>
            <Quote author="Саммастер">
              “...ніщо не вистоїть, крім похилених тронів, в яких замість правителів сидять мертві. Дракони вічно будуть
              правити світом…”
            </Quote>
          </Box>
          
          <Box my={10}>
            <Paragraph fontSize="16px">
              Містра - богиня магії - не раз удостоювала смертних честі бути своїми Обранцями, але не всі могли
              справитись із великим даром богині. Одним із таких був талановитий чарівник Саммастер. Він багато
              роздумував про роль драконів - цих прекрасних і смертоносних створінь, які з'явилися на Торілі задовго до
              зародження людської раси. І зрештою дійшов висновку, що дракони гідні поклоніння, що саме вони повинні
              правити світом, причому не просто дракони, а мертві дракони! Використовуючи силу, дану йому Містрою,
              Саммастер почав втілювати цю ідею в життя.
            </Paragraph>
          </Box>
          
          <Box my={10}>
            <Paragraph fontSize="16px">
              Так з’явився Культ Дракона - таємне товариство, що присвятило себе служінню невідворотній владі неживих
              драконів над Фаеруном. Культ займається збором інформації, незаконними оборудками, магічними
              дослідженнями, а також укладає альянси зі злими драконам, аби перетворювати їх у драколічів та поклонятись
              ім.
            </Paragraph>
          </Box>
          
          <Box my={10}>
            <Paragraph fontSize="16px">
              Символ Культу - вогонь з очима, що горять над кігтями дракона.
            </Paragraph>
          </Box>
          
          <Box my={10}>
            <Paragraph fontSize="16px">
              Після приходу до влади культиста на ім’я Северин, відбувся внутрішній розкол Культу Дракона на “новий” та
              “старий”.
            </Paragraph>
          </Box>
        
        </Tabs.TabPane>
        
        <Tabs.TabPane
          tab="Северин"
          key="severun"
        >
          <Flex center>
            <Header fontSize={30} fontWeight="bold">Северин</Header>
          </Flex>
          
          <Box my={10}>
            <Paragraph fontSize="16px">
              Лідер “нового” Культу Дракона.
            </Paragraph>
          </Box>
          
          <Box my={10}>
            <SecretText>
              Більше інформації після проходження завдання “Башня Ксонтала”
            </SecretText>
          </Box>
        </Tabs.TabPane>
        
        <Tabs.TabPane
          tab="'Новий' Культ Дракона"
          key="new_cult"
        >
          <Flex center>
            <Header fontSize={30} fontWeight="bold">“Новий” Культ Дракона</Header>
          </Flex>
          
          <Box my={10}>
            <SecretText>
              Більше інформації після проходження завдання “Чотири пекельні монети”
            </SecretText>
          </Box>
        </Tabs.TabPane>
        
        <Tabs.TabPane
          tab="Ti, що Говорять з Драконами"
          key="those_who_speak_with_dragons"
        >
          <Flex center>
            <Header fontSize={30} fontWeight="bold">Ті, що Говорять з Драконами</Header>
          </Flex>
          
          <Box my={10}>
            <SecretText>
              Більше інформації після проходження завдання “Таємниці Туманного Лісу”
            </SecretText>
          </Box>
        </Tabs.TabPane>
        
        <Tabs.TabPane
          tab="Маски Дракона"
          key="masks"
        >
          <Flex center>
            <Header fontSize={30} fontWeight="bold">Маски Дракона </Header>
          </Flex>
          
          <Box my={10}>
            <Paragraph fontSize="16px">
              П’ять древніх масок у формі голів дракона, кожна створена по подобі кожного з п’яти видів кольорових
              драконів. Їм приписують магічні властивості, але які - невідомо.
            </Paragraph>
          </Box>
          
          <Box my={10}>
            <SecretText>
              Більше інформації після проходження завдання “Башня Ксонтала”
            </SecretText>
          </Box>
        </Tabs.TabPane>
      </Tabs>
    </Box>
  )
}

export default CultOfTheDragon
