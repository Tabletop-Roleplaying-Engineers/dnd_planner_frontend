import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Tabs } from 'antd'
import { Box, Flex } from 'noui/Position'
import { Header, Quote, Paragraph, SecretText } from 'ui/Text'
import { useScreenMedia } from 'noui/MediaQuery'
import Portrait from 'ui/Portrait'
import ectorPortrait from './shared/ector.jpg'
import alaidPortrait from './shared/alaid.jpg'
import marcotPortrait from './shared/marcot.jpg'
import mirlanaPortrait from './shared/mirlana.jpg'
import connradPortrait from './shared/connrad.jpg'

const CultOfTheDragon = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [tab, setTab] = useState(location.hash.substring(1) || 'ector_brahms')
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
    <Box mt={10} mr={[0, 20]}>
      <Tabs
        activeKey={tab}
        onChange={setTab}
        type="card"
        tabPosition={media.isMobile ? 'top' : 'left'}
      >
        {/*Ектор Брамс*/}
        <Tabs.TabPane tab="Коннрад Броненвіл" key="Connrad_bronenvil">
          <Flex center>
            <Header fontSize={30} fontWeight="bold">
              Коннрад Броненвіл
            </Header>
          </Flex>

          <Box my={10}>
            <Paragraph fontSize="16px">
              Коннрад Броненвіл був 12 королем Міфрільного Залу та лідером клану
              Бетлхамерів. Прямолінійний та справедливий, він покладався на силу
              своїх товаришів і хороше стратегічне планування. Коли Культ
              Дракона почав набирати сили та загрожувати усьому Фаеруну,
              Коннрада вибрали представником дварфів Альянсу Лордів на Раді
              Вотердіпу. Однак він так до неї і не доїхав.
            </Paragraph>
          </Box>

          <Portrait src={connradPortrait} alt="Connrad_bronenvil" my={30} />

          <Box my={10}>
            <Paragraph fontSize="16px">
              В околицях Флану на його кортеж напали орки. Зрозумівши цінність
              полоненого, вони продали його Культу Дракона, а ті відправили
              короля Міфрільного Залу до свого лідера - Северина. Але туди
              Коннрад теж не доїхав.
            </Paragraph>
          </Box>

          <Box my={10}>
            <Paragraph fontSize="16px">
              Коннрад Броненвіл був 12 королем Міфрільного Залу та лідером клану
              Бетлхамерів. Прямолінійний та справедливий, він покладався на силу
              своїх товаришів і хороше стратегічне планування. Коли Культ
              Дракона почав набирати сили та загрожувати усьому Фаеруну,
              Коннрада вибрали представником дварфів Альянсу Лордів на Раді
              Вотердіпу. Однак він так до неї і не доїхав.
            </Paragraph>
          </Box>
        </Tabs.TabPane>

        {/*Ектор Брамс*/}
        <Tabs.TabPane tab="Ектор Брамс" key="ector_brahms">
          <Flex center>
            <Header fontSize={30} fontWeight="bold">
              Ектор Брамс
            </Header>
          </Flex>

          <Portrait
            src={ectorPortrait}
            alt="Ector"
            label="Порядок має підтримуватись сталевою рукою!"
            my={30}
          />

          <Box my={10}>
            <Paragraph fontSize="16px">
              Ектор Брамс служив Лицарем-командором Чорних Кулаків при двох
              останніх Лордах Флану. Він вперто-чесний, грубий, 64-річний
              чоловік,на чиї плечі ліг важкий тягар керівництва. Його рідко
              бачать на публіці без офіційною регалії його нинішній посаді -
              зачарованого чорно-емалевого латного обладунку і довгого багряного
              плаща, що символізують те, що він Лорд-Регент Флану. Він жорстоко
              розбирається з донесеннями про хабарі, і рідкісний гвардієць
              переживав Більше одного підтвердженого обвинувачення.
            </Paragraph>
          </Box>
        </Tabs.TabPane>

        {/*Алейд Буррал*/}
        <Tabs.TabPane tab="Алейд Буррал" key="aleid">
          <Flex center>
            <Header fontSize={30} fontWeight="bold">
              Алейд Буррал
            </Header>
          </Flex>

          <Portrait src={alaidPortrait} alt="Алейд Буррал" my={30} />

          <Box my={10}>
            <Quote author="з доповіді мисливця Гастона">
              Серед Чорних Кулаків не усі мудаки. Є ще садисти, маніяки та ті,
              хто відкрито насолоджуються своєю владою. Але лицар Алейд Буррал -
              це рідкісний виняток. Вона сильний воїн із гострим розумом, але її
              добре серце, яке вона ховає за маскою строгості, заважає
              кар’єрному росту. Вона не терпить егоїстичних дураків, і вважає
              усіх авантюристів саме такими.
            </Quote>
          </Box>
        </Tabs.TabPane>

        {/*Йовір Глендон*/}
        <Tabs.TabPane tab="Йовір Глендон" key="yovir">
          <Flex center>
            <Header fontSize={30} fontWeight="bold">
              Йовір Глендон
            </Header>
          </Flex>

          <Box my={10}>
            <Paragraph fontSize="16px">
              Йовір Глендон - власник титулу Провідник Мертвих, найвищого титулу
              ордену Келемвора. Без почуття гумору. Бриє налисо голов, але
              носить акуратно пострижену бороду.
            </Paragraph>
          </Box>

          <Box my={10}>
            <Paragraph fontSize="16px">
              Вважає догляд за Валінгенським кладовищем важливою частиною своєї
              віри, тому його часто можна бачити в робах, забруднених травою, і
              з серпом в руках.
            </Paragraph>
          </Box>
        </Tabs.TabPane>

        {/*Маркот Хассельпонд*/}
        <Tabs.TabPane tab="Маркот Хассельпонд" key="macrot">
          <Flex center>
            <Header fontSize={30} fontWeight="bold">
              Маркот Хассельпонд
            </Header>
          </Flex>

          <Box my={10}>
            <Paragraph fontSize="16px">
              Маркот, в народі відомий як Товстий Мар, - це офіціант таверни
              “Гоблін, Що Сміється”. Відомий своєю надмірною балакучістю, а
              також знанням різних історій. У нього дві улюблені справи. Перша -
              це розпитувати авантюристів про їхні авантюри, аби потім
              перекручувати ці історії та видавати за давно забуті легенди.
              Друга - не приносити страви вчасно.
            </Paragraph>
          </Box>

          <Portrait src={marcotPortrait} alt="Ector" my={30} />
        </Tabs.TabPane>

        {/*Мірлана*/}
        <Tabs.TabPane tab="Мірлана" key="mirlana">
          <Flex center>
            <Header fontSize={30} fontWeight="bold">
              Мірлана
            </Header>
          </Flex>

          <Box my={10}>
            <Paragraph fontSize="16px">
              Одна з елітних воїнів Тею - Тейський лицар. Сильна, небезпечна,
              тренована, холоднокровна - і фанатично віддана своїй справі.
            </Paragraph>
          </Box>

          <Portrait
            src={mirlanaPortrait}
            alt="Mirlana"
            label="Тільки Рат Модар приведе Тей до перемоги"
            my={30}
          />

          <Box my={10}>
            <Paragraph fontSize="16px">
              Одна з елітних воїнів Тею - Тейський лицар. Сильна, небезпечна,
              тренована, холоднокровна - і фанатично віддана своїй справі.
            </Paragraph>
          </Box>

          <Box my={10}>
            <SecretText>
              більше інформації після проходження завдання “Повернення Червоної
              Королеви”
            </SecretText>
          </Box>

          <Box my={10}>
            <Paragraph fontSize="16px">
              Після зникнення Зарлади, Мірлана стала ренегатом. Утіікачи від
              своїх колишніх союзників, вона потрапила в пастку і пішла на
              вимушену співпрацю із фракціями Флану.
            </Paragraph>
          </Box>

          <Box my={10}>
            <Quote author="Мірлана на допиті голів фракцій">
              “Просто щоб ви знали - мені не подобається наш союз так само як і
              вам. Але Зарладу потрібно зупинити! Допоки вона не знищила нас
              усіх!”
            </Quote>
          </Box>

          <Box my={10}>
            <SecretText>
              більше інформації після проходження завдання “Ренегат. Частина 3”
            </SecretText>
          </Box>
        </Tabs.TabPane>
      </Tabs>
    </Box>
  )
}

export default CultOfTheDragon
