import React, { useEffect, useState } from 'react'
import { Tabs } from 'antd'
import { Box, Flex } from 'noui/Position'
import { Header, Quote, Paragraph, SecretText } from 'ui/Text'
import { isMobile } from 'noui/MediaQuery'
import Portrait from 'ui/Portrait'
import ectorPortrait from './shared/ector.jpg'


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
        {/*Ектор Брамс*/}
        <Tabs.TabPane
          tab="Ектор Брамс"
          key="ector_brahms"
        >
          <Flex center>
            <Header fontSize={30} fontWeight="bold">Ектор Брамс</Header>
          </Flex>
          
          <Portrait
            src={ectorPortrait}
            alt="Ector"
            label="Порядок має підтримуватись сталевою рукою!"
            my={30}
          />
          
          <Box my={10}>
            <Paragraph fontSize="16px">
              Ектор Брамс служив Лицарем-командором Чорних Кулаків при двох останніх Лордах Флану. Він вперто-чесний,
              грубий, 64-річний чоловік,на чиї плечі ліг важкий тягар керівництва. Його рідко бачать на публіці без
              офіційною регалії його нинішній посаді -
              зачарованого чорно-емалевого латного обладунку і довгого багряного плаща, що символізують те, що він
              Лорд-Регент Флану. Він жорстоко розбирається з донесеннями про хабарі, і рідкісний гвардієць переживав
              Більше одного підтвердженого обвинувачення.
            </Paragraph>
          </Box>
        </Tabs.TabPane>

      </Tabs>
    </Box>
  )
}

export default CultOfTheDragon
