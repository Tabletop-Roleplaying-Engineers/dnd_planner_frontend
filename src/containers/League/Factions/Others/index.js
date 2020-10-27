import React, { useEffect, useState } from 'react'
import { Tabs } from 'antd'
import { Box, Flex } from 'noui/Position'
import { Header, Quote, Paragraph } from 'ui/Text'
import { useScreenMedia } from 'noui/MediaQuery'

const OtherFactions = ({ history, location }) => {
  const [tab, setTab] = useState(location.hash.substring(1) || 'main')
  const media = useScreenMedia()

  useEffect(() => {
    history.replace({
      path: location.path,
      hash: tab,
    })
  }, [history, location.path, tab])

  return (
    <Box mt={10} mr={[0, 20]}>
      <Tabs
        activeKey={tab}
        onChange={setTab}
        type="card"
        tabPosition={media.isMobile ? 'top' : 'left'}
      >
        <Tabs.TabPane tab="Чорні Кулаки" key="black_fists">
          <Flex center>
            <Header fontSize={30} fontWeight="bold">
              Чорні Кулаки
            </Header>
          </Flex>

          <Box my={10}>
            <Paragraph fontSize="16px">
              Військова організація Флану під командуванням командора Ектора
              Брамса. Маючи коріння в культі Бейна, Чорні Кулаки обірвали всі
              формальні зв'язки десятиліття тому, проте вони все ще словесно
              шанують Бейна.
            </Paragraph>
          </Box>

          <Box my={10}>
            <Paragraph fontSize="16px">
              Після того як Ектор Брамс став Лордом-Регентом Флану, Чорні Кулаки
              почали відповідати за підтримання порядку і дисципліни у Флані.
              Через вакуум влади, лицарі Чорного Кулака отримали повноваження
              виступати одночасно в якості судді, присяжних і ката. Їх суд
              швидкий і суворий, за що громадяни Флана їх бояться та ненавидять.
            </Paragraph>
          </Box>

          <Box my={10}>
            <Paragraph fontSize="16px">
              Нижні чини ордена наскрізь корумповані, і хабарництво та знущання
              є звичайним явищем. Саме небажання Чорних Кулаків займатись своїми
              обов’язками і спричинило притік авантюристів у Флан: заплатити
              найманцям за виконання роботи виявилось ефективніше аніж чекати
              допомоги міської варти.
            </Paragraph>
          </Box>
        </Tabs.TabPane>

        <Tabs.TabPane tab="Сльози Злоби" key="main">
          <Flex center>
            <Header fontSize={30} fontWeight="bold">
              Сльози Злоби
            </Header>
          </Flex>

          <Box my={10}>
            <Quote author="з архівів Гахала Іммертума, Намісника фракції Альянс Лордів у Флані">
              Хоч вельмишановний Лорд-Регент Ектор Брамс і мав у власних
              інтересах збереження безпеки у місті, не усі його підлеглі
              поділяли цей порив. Коли Ворганшаракс, Понівечена Злоба, та його
              приспішники-культисти захопили Флан, багато колишніх Чорних
              Кулаків переметнулись на сторону нападників, жадаючи зберегти свій
              владний статус. Ці зрадники зараз відомі під іменем Сліз Злоби та
              підтримують тиранічний режим, встановлений Культом Дракона.
              Більшість з їхнього числа - добре озброєні воїни, багато хто - ще
              й досвідчені. Вони - залізний кулак на пульсі міста, і ті, з ким
              ви стикатиметесь частіше всього. Впізнати їх можна за
              яскраво-зеленою символікою у вигляді каплі, що вкриває їх безчесні
              чорні мундири.
            </Quote>
          </Box>

          <Box my={10}>
            <Quote author="з доповіді мисливця Гастона">
              Сльози Злоби зберегли усі навички Чорних Кулаків. Ті ж манери
              допитів, та ж ненависть, те ж бажання робити все чужими руками. Їх
              багато, вони добре озброєні, у них є тактика, відточена роками.
              Але Культ потребує покори та гарматного м’яса, тому Сльози Злоби
              набирають до себе усіх: садистів, ображених та “патріотів” із
              промитими мізками. Секрет успішного протистояння з цими загонами -
              це знищення командування. Без командира Сльози Злоби
              перетворюються на звичайних головорізів. Але як не всі Чорні
              Кулаки були корумповані, так не всі з них підтримали режим
              Ворганшаракса. Такі особи як Алейд Буррал чи Джесаїл Грейкастл
              можуть бути цінними союзниками, які допоможуть переманити тих
              Чорних Кулаків, які коливаються.
            </Quote>
          </Box>
        </Tabs.TabPane>

        <Tabs.TabPane tab="" key="main">
          <Flex center>
            <Header fontSize={30} fontWeight="bold"></Header>
          </Flex>

          <Box my={10}>
            <Paragraph fontSize="16px"></Paragraph>
          </Box>
        </Tabs.TabPane>

        <Tabs.TabPane tab="" key="main">
          <Flex center>
            <Header fontSize={30} fontWeight="bold"></Header>
          </Flex>

          <Box my={10}>
            <Paragraph fontSize="16px"></Paragraph>
          </Box>
        </Tabs.TabPane>

        <Tabs.TabPane tab="" key="main">
          <Flex center>
            <Header fontSize={30} fontWeight="bold"></Header>
          </Flex>

          <Box my={10}>
            <Paragraph fontSize="16px"></Paragraph>
          </Box>
        </Tabs.TabPane>
      </Tabs>
    </Box>
  )
}

export default OtherFactions
