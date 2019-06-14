import React, { useEffect, useState } from 'react'
import { Alert, Tabs } from 'antd'
import { Box, Flex } from 'noui/Position'
import { Header, SecretText, Paragraph } from 'ui/Text'
import { isMobile } from 'noui/MediaQuery'

const Storyline = ({history, location}) => {
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
        {/*Головна*/}
        <Tabs.TabPane
          tab="Основна сюжетна лінія"
          key="main"
        >
          <Flex center>
            <Header fontSize={30} fontWeight="bold">Основна сюжетна лінія</Header>
          </Flex>
          
          <Box my={10}>
            <Paragraph fontSize="16px">
              “Тиранія Драконів” - це перший сезон ігрових сесій Ліги Авантюристів. Сюжет історії крутиться навколо
              загадкового Культу Дракона та рядового портового містечка Флан.
            </Paragraph>
          </Box>
          
          <Box my={10}>
            <Paragraph fontSize="16px">
              Усі історії викладені тут - пройдені та пережиті гравцями “Прямої Гільдії” в період з 2018 по 2019 рік.
              Містять певні розходження із офіційним першим сезоном Ліги Авантюристів.
            </Paragraph>
          </Box>
          
          <Box my={10}>
            <Alert message="Будьте уважні: присутні спойлери!" type="error"/>
          </Box>
        </Tabs.TabPane>
        {/*Кошенята*/}
        <Tabs.TabPane
          tab="Кошенята маєтку Ковель"
          key="kitties"
        >
          <Flex center>
            <Header fontSize={30} fontWeight="bold">Основна сюжетна лінія</Header>
          </Flex>
          
          <Box my={10}>
            <Paragraph fontSize="16px">
              Альянс Лордів наймає авантюристів для небезпечного завдання: прибути у Флан та вбити одіозного чарівника
              на ім’я Денлор.
            </Paragraph>
          </Box>
          
          <Box my={10}>
            <SecretText>
              Більше інформації після проходження завдання “Кошенята маєтку Ковель”
            </SecretText>
          </Box>
        </Tabs.TabPane>
        {/*Глістер*/}
        <Tabs.TabPane
          tab="Дорога на Глістер"
          key="glister"
        >
          <Flex center>
            <Header fontSize={30} fontWeight="bold">
              Дорога на Глістер
            </Header>
          </Flex>
          
          <Box my={10}>
            <Paragraph fontSize="16px">
              Відновлення роботи мідних шахт в Глістері породило зацікавленість в торговців Мельваунту. Багато хто
              вкладає гроші в розробку родовищ, сподіваючись що там де є мідь - буде й золото. Група авантюристів
              погоджується супроводити караван із шахтарським приладдям, ще не усвідомлюючи істинних наслідків цього
              "легкого заробітку"....
            </Paragraph>
          </Box>
          
          <Box my={10}>
            <SecretText>
              Більше інформації після проходження завдання “Дорога на Глістер”
            </SecretText>
          </Box>
        </Tabs.TabPane>
        {/*Проблеми*/}
        <Tabs.TabPane
          tab="Проблеми Флану"
          key="problems"
        >
          <Flex center>
            <Header fontSize={30} fontWeight="bold">
              Проблеми Флану
            </Header>
          </Flex>
          
          <Box my={10}>
            <Paragraph fontSize="16px">
              Флан - це портове містечко на березі Місячного Моря, де панує беззаконня та свавілля угрупування на ім’я
              Чорні Кулаки. Місцеві жителі все частіше стикаються із незгодами, які не хоче вирішувати місцева влада. Це
              “золотий час” для авантюристів, адже проблем у Флані багато, а платять за них добре.
            </Paragraph>
          </Box>
          
          <Box my={10}>
            <SecretText>
              Більше інформації після проходження завдання “Проблеми Флану”
            </SecretText>
          </Box>
        </Tabs.TabPane>
        {/*Сокіл*/}
        <Tabs.TabPane
          tab="Таємниці фортеці Сокіл"
          key="sokil"
        >
          <Flex center>
            <Header fontSize={30} fontWeight="bold">
              Таємниці фортеці Сокіл
            </Header>
          </Flex>
          
          <Box my={10}>
            <Paragraph fontSize="16px">
              Фортеця Сокіл уже давно не виконує свою першочергову функцію. Однак вона досі є важливим важелем на
              політичній арені Флану. Коли місцевий гарнізон раптово пропадає, в повітрі пахне неприємностями. І
              древніми прокляттями…
            </Paragraph>
          </Box>
          
          <Box my={10}>
            <SecretText>
              Більше інформації після проходження завдання “Таємниці фортеці Сокіл”
            </SecretText>
          </Box>
        </Tabs.TabPane>
        {/*Тіні*/}
        <Tabs.TabPane
          tab="Тіні над Місячним морем"
          key="shadows"
        >
          <Flex center>
            <Header fontSize={30} fontWeight="bold">
              Тіні над Місячним морем
            </Header>
          </Flex>
          
          <Box my={10}>
            <Paragraph fontSize="16px">
              Життя біля Місячного Моря ніколи не було легким. Бандити, пірати та жорстокі лорди правлять цими землями,
              ускладнюючи життя усім, хто хоче жити чесно. Але недавно з'явилась нова проблема: корабель-привид атакує
              прибережні селища. Ті, кому пощастило вижити, безумно шепочуть про "око драколіча"...
            </Paragraph>
          </Box>
          
          <Box my={10}>
            <SecretText>
              більше інформації після проходження завдання “Тіні над Місячним морем”
            </SecretText>
          </Box>
        </Tabs.TabPane>
        {/*Криптенгарден*/}
        <Tabs.TabPane
          tab="Гниль Криптенгардена"
          key="cryptogarden"
        >
          <Flex center>
            <Header fontSize={30} fontWeight="bold">
              Гниль Криптенгардена
            </Header>
          </Flex>
          
          <Box my={10}>
            <Paragraph fontSize="16px">
              Фракції Фаеруну дізнались про розміщення древнього артефакту. А значить прийшов час об’єднати зусилля,
              зібрати війська і рушити в глибину містичного лісу Криптенгарден та кинути виклик його господарю -
              древньому дракону Клагелеуматар.
            </Paragraph>
          </Box>
          
          <Box my={10}>
            <SecretText>
              більше інформації після проходження завдання “Тіні над Місячним морем”
            </SecretText>
          </Box>
        </Tabs.TabPane>
        {/*Данина*/}
        <Tabs.TabPane
          tab="Данина мертвим"
          key="tribute"
        >
          <Flex center>
            <Header fontSize={30} fontWeight="bold">
              Данина мертвим
            </Header>
          </Flex>
          
          <Box my={10}>
            <Paragraph fontSize="16px">
              Довгі роки Орден Тихого Савану турбувався про вічний спокій мертвих на Валінгенському кладовищі. Але все
              змінилось, коли з'явився некромант, що шукає ключ для реактивації Сяючого Озера - древнього резервуара
              сирої магічної енергії…
            </Paragraph>
          </Box>
          
          <Box my={10}>
            <SecretText>
              більше інформації після проходження завдання “Данина мертвим”
            </SecretText>
          </Box>
        </Tabs.TabPane>
        {/*Вшанування вогню*/}
        <Tabs.TabPane
          tab="Вшанування вогню"
          key="fire"
        >
          <Flex center>
            <Header fontSize={30} fontWeight="bold">
              Вшанування вогню
            </Header>
          </Flex>
          
          <Box my={10}>
            <Paragraph fontSize="16px">
              В давно покинутих руїнах Гір Драконячого Шпиля було помічено культистів та їхніх приспішників-кобольтів.
              По слухах, вони шукають подарунок для дракона, що живе в регіоні. Нащо їм це потрібно - невідомо, але
              нічого хорошого жителям Флану це точно не принесе.
            </Paragraph>
          </Box>
          
          <Box my={10}>
            <SecretText>
              більше інформації після проходження завдання “Вшанування вогню”
            </SecretText>
          </Box>
        </Tabs.TabPane>
        {/*Крадій свитків*/}
        <Tabs.TabPane
          tab="Крадій свитків"
          key="scrolls_thief"
        >
          <Flex center>
            <Header fontSize={30} fontWeight="bold">
              Крадій свитків
            </Header>
          </Flex>
          
          <Box my={10}>
            <Paragraph fontSize="16px">
              Площа Школяра - досить тихенький район Флану, але серія загадкових крадіжок стурбувала владних осіб в
              цьому районі. Вони не довіряють Чорному Кулаку, а тому їм потрібні "незалежні експерти"...
            </Paragraph>
          </Box>
          
          <Box my={10}>
            <SecretText>
              більше інформації після проходження завдання “Крадій свитків”
            </SecretText>
          </Box>
        </Tabs.TabPane>
        {/*Гул барабанів*/}
        <Tabs.TabPane
          tab="Гул барабанів"
          key="drums"
        >
          <Flex center>
            <Header fontSize={30} fontWeight="bold">
              Гул барабанів
            </Header>
          </Flex>
          
          <Box my={10}>
            <Paragraph fontSize="16px">
              Останні кілька днів вітер приносить з Сутінкового Болота гул барабанів. Кожного ранку із ферм неподалік
              хтось пропадає, і лише розмиті когтисті сліди ведуть кудись до води. Знайдіть викрадених та змусьте
              барабани замовкнути!
            </Paragraph>
          </Box>
        </Tabs.TabPane>
        {/*Історії*/}
        <Tabs.TabPane
          tab="Історії, розказані деревами"
          key="tales"
        >
          <Flex center>
            <Header fontSize={30} fontWeight="bold">
              Історії, розказані деревами
            </Header>
          </Flex>
          
          <Box my={10}>
            <Paragraph fontSize="16px">
              Колись давно ельфи і люди заключили союз: ельфи захищають Флан від небезпек, а люди не заходять в
              Сутінковий Ліс. Однак зникнення місцевого жителя може похитнути давню співпрацю. Проведіть розслідування
              та залучіться допомогою фей, щоб захистити Флан.
            </Paragraph>
          </Box>
          
          <Box my={10}>
            <SecretText>
              більше інформації після проходження завдання “Історії, розказані деревами”
            </SecretText>
          </Box>
        </Tabs.TabPane>
        {/*Бандити*/}
        <Tabs.TabPane
          tab="Бандити Залізного шляху"
          key="iron_route"
        >
          <Flex center>
            <Header fontSize={30} fontWeight="bold">
              Бандити Залізного шляху
            </Header>
          </Flex>
          
          <Box my={10}>
            <Paragraph fontSize="16px">
              Залізний Шлях - друга, після Фланського Тракту, важлива торгівельна дорога Флану. Однак і там неспокійно.
              Між двома бандами розгорнулась війна за контроль територій, від якої страждають і купці, і Флан. Групою
              найманців, що перетворились в бандитів, керує колишній офіцер Чорного Кулаку, а на чолі дикунів з півночі
              стоїть драконорождена чарівниця. Нанесіть удар у відповідь та покінчіть із бандами раз і назавжди!
            </Paragraph>
          </Box>
          
          <Box my={10}>
            <SecretText>
              більше інформації після проходження завдання “Бандити Залізного шляху”
            </SecretText>
          </Box>
        </Tabs.TabPane>
        {/*Тиранія*/}
        <Tabs.TabPane
          tab="Тиранія Флану"
          key="tyranny"
        >
          <Flex center>
            <Header fontSize={30} fontWeight="bold">
              Тиранія Флану
            </Header>
          </Flex>
          
          <Box my={10}>
            <Paragraph fontSize="16px">
              Все змінюється у Флані, і при тому - в гіршу сторону. Лицар-Командор Эктор Брамс, Лорд Регент Флану,
              збирає секретну зустріч усіх голів гільдій та впливових дворян, що працюють у Флані. Прийшов час навести
              порядок раз і назавжди!
            </Paragraph>
          </Box>
          
          <Box my={10}>
            <Paragraph fontSize="16px">
              А тим часом Алейд Буррал потребує когось, хто зможе розслідувати справу культиста Сперніка, якого скоро
              мають повісити. От тільки щось зовсім не так з цією справою...
            </Paragraph>
          </Box>
        </Tabs.TabPane>
        {/*Вежа*/}
        <Tabs.TabPane
          tab="Вежа Денлора"
          key="denlor_tower"
        >
          <Flex center>
            <Header fontSize={30} fontWeight="bold">
              Вежа Денлора
            </Header>
          </Flex>
          
          <Box my={10}>
            <Paragraph fontSize="16px">
              Більше сотні років тому у Флані жив могутній чарівник на ім’я Денлор. Він зник за дивних обставин,
              залишивши по собі лише вежу, запечатану невідомою магією. І ось нарешті прийшов час дізнатись, що
              знаходиться за її дверима.
            </Paragraph>
          </Box>
          
          <Box my={10}>
            <SecretText>
              більше інформації після проходження завдання “Острів Десяти”
            </SecretText>
          </Box>
        </Tabs.TabPane>
        {/*Острів10*/}
        <Tabs.TabPane
          tab="Острів Десяти"
          key="island_10"
        >
          <Flex center>
            <Header fontSize={30} fontWeight="bold">
              Острів Десяти
            </Header>
          </Flex>
        </Tabs.TabPane>
        {/*Мародери*/}
        <Tabs.TabPane
          tab="Мародери Сутінкового болота"
          key="swamp"
        >
          <Flex center>
            <Header fontSize={30} fontWeight="bold">
              Мародери Сутінкового болота
            </Header>
          </Flex>
          
          <Box my={10}>
            <Paragraph fontSize="16px">
              Шпигуни фракцій донесли - в глибинах Сутінкового Болота знайдено лігво чорного дракона. І там не лише
              скарби, а й таємниці, які можуть похитнути баланс сил у Флані. Поки дракон спалює села в околицях, час
              грабувати його лігво!
            </Paragraph>
          </Box>
          
          <Box my={10}>
            <SecretText>
              більше інформації після проходження завдання “Мародери Сутінкового болота”
            </SecretText>
          </Box>
        </Tabs.TabPane>
        {/*Піраміда*/}
        <Tabs.TabPane
          tab="Темна піраміда Острову Чаклуна"
          key="dark_pyramid"
        >
          <Flex center>
            <Header fontSize={30} fontWeight="bold">
              Темна піраміда Острову Чаклуна
            </Header>
          </Flex>
          
          <Box my={10}>
            <Paragraph fontSize="16px">
              Давно покинута піраміда на Острові Чаклуна з недавнього часу виділяє магічну енергію, що змінює істот та
              землю навколо себе. Культ Дракона зауважив це та відправляє експедицію, аби захопити цю дивну силу.
              Потрібно випередити їх та не дозволити таємницям піраміди потрапити в погані руки!
            </Paragraph>
          </Box>
          
          <Box my={10}>
            <SecretText>
              більше інформації після проходження завдання “Темна піраміда Острову Чаклуна”
            </SecretText>
          </Box>
        </Tabs.TabPane>
        {/*Повстанці*/}
        <Tabs.TabPane
          tab="Повстанці Флану"
          key="phlan_rebels"
        >
          <Flex center>
            <Header fontSize={30} fontWeight="bold">
              Повстанці Флану
            </Header>
          </Flex>
          
          <Box my={10}>
            <Paragraph fontSize="16px">
              Культ Дракона прийшов до влади у Флані. І хоча керівництво усіх фракцій було знищено, віддані агенти не
              померли. Вони зачаїлись, аби власними силами відбудувати те, що знищено, та в партизанській боротьбі, крок
              за кроком, зробити найголовніше - повернути своє місто!
            </Paragraph>
          </Box>
          
          <Box my={10}>
            <Paragraph fontSize="16px">
              Це ваша історія, яка твориться саме зараз!
            </Paragraph>
          </Box>
        </Tabs.TabPane>
        {/*Рада*/}
        <Tabs.TabPane
          tab="Рада Вотердіпу"
          key="council"
        >
          <Flex center>
            <Header fontSize={30} fontWeight="bold">
              Рада Вотердіпу
            </Header>
          </Flex>
          
          <Box my={10}>
            <Paragraph fontSize="16px">
              Дивні культисти вбивають невинних та забирають усе золото. А допомагають їм у цьому дракони. Фракції
              Фаеруну відкинули чвари заради спільної мети - зрозуміти що задумав Культ Дракона і зупинити їх.
            </Paragraph>
          </Box>
        </Tabs.TabPane>
        {/*Відродженя*/}
        <Tabs.TabPane
          tab="Відродження Сяючого Озера"
          key="pool"
        >
          <Flex center>
            <Header fontSize={30} fontWeight="bold">
              Відродження Сяючого Озера
            </Header>
          </Flex>
          
          <Box my={10}>
            <Paragraph fontSize="16px">
              Про древнє Сяюче Озеро ходить багато легенд. Що воно дарує вічне життя, що воно вміє воскрешати, що воно -
              джерело безграничної магії. Невідомо, що з цього правда, але Культ Дракона не даремно обрав Флан для свого
              нападу: колись під замком знаходилось те саме Сяюче Озеро. І нарешті прийшов час відродити його.
            </Paragraph>
          </Box>
          
          <Box my={10}>
            <SecretText>
              більше інформації після проходження завдання “Одного разу у серпні”
            </SecretText>
          </Box>
        </Tabs.TabPane>
        {/*Твроє проти зла*/}
        <Tabs.TabPane
          tab="Троє проти зла"
          key="three_versus_evil"
        >
          <Flex center>
            <Header fontSize={30} fontWeight="bold">
              Троє проти зла
            </Header>
          </Flex>
          
          <Box my={10}>
            <SecretText>
              більше інформації після проходження завдання “Втеча з Флану”
            </SecretText>
          </Box>
        </Tabs.TabPane>
        {/*Фінал*/}
        <Tabs.TabPane
          tab="**фінал сезону**"
          key="end_game"
        >
          <Flex center>
            <Header fontSize={30} fontWeight="bold">
             Фінал сезону
            </Header>
          </Flex>

          <Box my={10}>
            <SecretText>
              більше інформації після проходження усіх завдань основної сюжетної лінії
            </SecretText>
          </Box>
        </Tabs.TabPane>
      </Tabs>
    </Box>
  )
}

export default Storyline
