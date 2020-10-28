import React, { useEffect, useState } from 'react'
import { Tabs } from 'antd'
import { Box, Flex } from 'noui/Position'
import { Header, Quote, Paragraph, SecretText } from 'ui/Text'
import { useScreenMedia } from 'noui/MediaQuery'
import Portrait from 'ui/Portrait'
import castleCover from './shared/castle.jpg'
import cemeteryCover from './shared/cemetery.jpg'
import gateCover from './shared/gate.jpg'
import lyceumCover from './shared/lyceum.jpg'
import stationCover from './shared/station.jpg'
import tavernCover from './shared/tavern.jpg'
import towerCover from './shared/tower.jpg'
import poolCover from './shared/pool.jpg'

const Phlan = ({ history, location }) => {
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
        <Tabs.TabPane tab="Головна" key="main">
          <Flex center>
            <Header fontSize={30} fontWeight="bold">
              Флан
            </Header>
          </Flex>

          <Box my={10}>
            <Quote author="табличка над барною стійкою таверни “Гоблін, що Сміється”">
              Суворі землі народжують сильних людей
            </Quote>
          </Box>

          <Box my={10}>
            <Paragraph fontSize="16px">
              Флан, заснований в 367 ЛД, втілює собою непохитність людей і їх
              прагнення приносити цивілізацію в дикі місця. З моменту
              заснування, місто багато разів розносили на шматки, але воно
              відроджувалось як фенікс з власного попелища. Однак це сказалось
              на місцевій архітектурі: Флан буквально стоїть на власних руїнах,
              а в підвалах будинків можна зустріти спуски в древні катакомби.
            </Paragraph>
          </Box>

          <Box my={10}>
            <Paragraph fontSize="16px">
              Будучи одним із важливих портових міст на березі Місячного Моря,
              Флан опинився в скрутному становищі, коли помер Лорд-Протектор
              Анівар Даоран. До влади прийшов Ектор Брамс - начальник ордену
              Чорних Кулаків, військової організації, що існувала у Флані
              десятиліттями. Будучи хорошим військовим, але поганим політиком,
              Ектор Брамс пішов простим шляхом та об’явив військовий стан в
              місті та околицях.
            </Paragraph>
          </Box>

          <Box my={10}>
            <Paragraph fontSize="16px">
              Чорні Кулаки взяли владу у місті, тримаючи усіх в страху та
              порядку. Торгівля у Флані майже зупинились, гільдії почали
              боротись за контроль над містом, аби компенсувати втрату доходів.
              Заробітна плата різко впала, ціни на товари та послуги стрімко
              ростуть. З кожним днем, все Більше тіл розгойдується на
              Стояновський воротах. Флан, де нині панує беззаконня, являє собою
              лише жалюгідну тінь того, чим він був раніше.
            </Paragraph>
          </Box>

          <Box my={10}>
            <Paragraph fontSize="16px">
              Мало хто знає, що Флан приховує Сяюче Озеро. Знаходячись під
              Замком Вальєво, цей древній резервуар сирої магічної енергії не
              раз привертав увагу різних злих сил. Лорди-Протектори Флану
              присвятили своє життя захисту Сяючого Озера, однак несподівана
              смерть останнього Лорда обірвала цю таємницю.
            </Paragraph>
          </Box>
        </Tabs.TabPane>

        <Tabs.TabPane tab="Замок Вальєво" key="castle">
          <Flex center>
            <Header fontSize={30} fontWeight="bold">
              Замок Вальєво
            </Header>
          </Flex>

          <Box my={10}>
            <Paragraph fontSize="16px">
              Найбільша будівля у Флані. Являється зосередженням місцевої влади
              та місцем, де проживає Лорд-Регент Ектор Брамс. Сам замок
              величезний, його величні стіни із граніту та мармуру витримували
              не одну облогу.
            </Paragraph>
          </Box>

          <Box my={10}>
            <Paragraph fontSize="16px">
              Після приходу до влади дракона Ворганшаракса, замок Вальєво став
              його резиденцією. Саме сюди привозили полонених, аби вони копали в
              древніх руїнах під замком, до забутого Сяючого Озера.
            </Paragraph>
          </Box>

          <Portrait src={castleCover} alt="Castle" my={30} />
        </Tabs.TabPane>

        <Tabs.TabPane tab="Ворота Стоянов" key="gate">
          <Flex center>
            <Header fontSize={30} fontWeight="bold">
              Ворота Стоянов
            </Header>
          </Flex>

          <Box my={10}>
            <Paragraph fontSize="16px">
              Колосальна будівля, по слухам, побудована вогняними гігантами,
              представляє собою штаб-квартиру лицарів Чорного Кулака та є єдиним
              входом в замок Вальєво. Величезні стіни висотою 60 футів та
              шириною 30 футів тягнуться по обидві сторони від масивних кованих
              залізом дверей, які зачиняються лише під час війни. Злочинців,
              арештованих у Флані, ув’язнюють у Воротах Стоянов, і рано чи пізно
              більшість з них будуть повішані тут же.
            </Paragraph>
          </Box>

          <Portrait src={gateCover} alt="Gate" my={30} />
        </Tabs.TabPane>

        <Tabs.TabPane tab="Валінгенське кладовище" key="cemetery">
          <Flex center>
            <Header fontSize={30} fontWeight="bold">
              Валінгенське кладовище
            </Header>
          </Flex>

          <Box my={10}>
            <Paragraph fontSize="16px">
              На протилежній стороні річки Стоянов знаходиться міський цвинтар
              Флану - величний сад, повний дерев та квітів. Орден Келемвора
              десятиліттями опікується цим місцем, надаючи поминальні та
              поховальні послуги. З моменту переходу під опіку ордену, на
              Валінгенському кладовищі зникла нежить. І келемворити стараються з
              усіх сил, аби мертві залишались мертвими, а їхні душі -
              упокоєними.
            </Paragraph>
          </Box>

          <Portrait src={cemeteryCover} alt="cemetery" my={30} />
        </Tabs.TabPane>

        <Tabs.TabPane tab="Проклятий Ліцей Бейна" key="lyceum">
          <Flex center>
            <Header fontSize={30} fontWeight="bold">
              Проклятий Ліцей Бейна
            </Header>
          </Flex>

          <Box my={10}>
            <Paragraph fontSize="16px">
              Покинутий храм Бейна, про який ходять багато поганих чуток.
              Більшість з цих чуток поширювали Чорні Кулаки. Адже вони
              використовували підземелля Ліцею як нелегальну тюрму, в якій
              влаштовували смертельні бої.
            </Paragraph>
          </Box>

          <Box my={10}>
            <Paragraph fontSize="16px">
              Червона Чарівниця Зарлада використовувала це місце як
              штаб-квартиру для своїх операцій у Флані.
            </Paragraph>
          </Box>

          <Box my={10}>
            <SecretText>
              більше інформації після проходження завдання “Острів десяти”
            </SecretText>
          </Box>

          <Portrait src={lyceumCover} alt="lyceum" my={30} />
        </Tabs.TabPane>

        <Tabs.TabPane tab="Вежа Денлора" key="tower">
          <Flex center>
            <Header fontSize={30} fontWeight="bold">
              Вежа Денлора
            </Header>
          </Flex>

          <Box my={10}>
            <Paragraph fontSize="16px">
              Більше сотні років тому ця вежа належала могутньому чарівнику на
              ім’я Денлор. Але з часу його зникнення вежа стоїть запечатаною і
              порожньою.
            </Paragraph>
          </Box>

          <Box my={10}>
            <SecretText>
              більше інформації після проходження завдання “Вежа Денлора”
            </SecretText>
          </Box>

          <Portrait src={towerCover} alt="tower" my={30} />
        </Tabs.TabPane>

        <Tabs.TabPane tab="Таверна “Гоблін, Що Сміється”" key="tavern">
          <Flex center>
            <Header fontSize={30} fontWeight="bold">
              Таверна “Гоблін, Що Сміється”
            </Header>
          </Flex>

          <Box my={10}>
            <Paragraph fontSize="16px">
              “Гоблін, Що Сміється” - це стара відома таверна Флану, яка знавала
              кращі часи. Меблі зношені та мають шрами від різних потасовок.
              Штукатурка пожовтіла та осипалась, а люсти і лампи поржавіли.
              Однак це одне з найпопулярніших місць у Флані. Тут завжди є робота
              для авантюриста, пікантні слухи та, звісно ж, знаменитий
              капустяний суп.
            </Paragraph>
          </Box>

          <Portrait src={tavernCover} alt="tower" my={30} />
        </Tabs.TabPane>

        <Tabs.TabPane tab="Сортувальна Станція (СС)" key="station">
          <Flex center>
            <Header fontSize={30} fontWeight="bold">
              Вежа Денлора
            </Header>
          </Flex>

          <Box my={10}>
            <Paragraph fontSize="16px">
              Після приходу до влади дракона Ворганшаракса, колишні пожежні депо
              були переобладнані в “поліцейські” відділки, де квартируються
              Сльози Злоби. Сюди привозять полонених, допитують їх та, якщо вони
              виживають, перевозять у Ворота Стоянов.
            </Paragraph>
          </Box>

          <Box my={10}>
            <Paragraph fontSize="16px">
              СС знаходяться в кожному районі Флану, що дозволяє Сльозам Злоби
              ефективно контролювати населення та швидко реагувати на прояви
              непокори.
            </Paragraph>
          </Box>

          <Portrait src={stationCover} alt="tower" my={30} />
        </Tabs.TabPane>

        <Tabs.TabPane tab="Сяюче озеро" key="pool">
          <Flex center>
            <Header fontSize={30} fontWeight="bold">
              Сяюче озеро
            </Header>
          </Flex>

          <Box my={10}>
            <Paragraph fontSize="16px">
              Сяюче Озеро - це відкрита рана на тілі Плетіння, могутнє, але
              небезпечне джерело чистої магії. Лише могутні чарівники можуть
              використовувати цю сиру магію, для усіх інших вона становить
              смертельну небезпеку.
            </Paragraph>
          </Box>

          <Portrait src={poolCover} alt="Pool" my={30} />

          <Box my={10}>
            <Paragraph fontSize="16px">
              Культ Дракона розглядає Сяюче Озеро як ключ до контролю над
              регіоном, адже переконані що зможуть взяти під контроль його
              хаотичну силу. От тільки вони не знають найголовнішого. Сяюче
              Озеро являється “дверима” для Тирантраксуса, позапланарної
              сутності. Вона вселяється в могутніх істот, що контактують із
              Озером та підкоряє їх своїх волі.
            </Paragraph>
          </Box>

          <Box my={10}>
            <Paragraph fontSize="16px">
              Так уже трапилось 140 років тому, коли чарівник Денлор зібрав
              авантюристів, аби перемогти дракона Сроссара, в якого вселився
              Тирантраксус. Тоді магічне Сяюче Озеро під Фланом було перетворене
              в звичайну воду. Однак недавній зорепад утворив ще один розрив в
              Плетінні. І Культ Дракона захопив його, сподіваючись отримати
              доступ до могутньої сили. А натомість дав доступ Тирантраксусу до
              усіх їхніх надбань.
            </Paragraph>
          </Box>
        </Tabs.TabPane>
        {/*rest*/}
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

        <Tabs.TabPane tab="Сльози Злоби" key="tears_of_virulence">
          <Flex center>
            <Header fontSize={30} fontWeight="bold">
              Сльози Злоби
            </Header>
          </Flex>

          <Box my={10}>
            <Paragraph fontSize="16px">
              Хоч вельмишановний Лорд-Регент Ектор Брамс і мав у власних
              інтересах збереження безпеки у місті, не усі його підлеглі
              поділяли цей порив.
            </Paragraph>
          </Box>
          <Box my={10}>
            <Paragraph fontSize="16px">
              Коли Ворганшакс, Понівечена Злоба, та його приспішники-культисти
              захопили Флан, багато колишніх Чорних Кулаків переметнулись на
              сторону нападників, жадаючи зберегти свій владний статус. Ці
              зрадники зараз відомі під іменем Сліз Злоби та підтримують
              тиранічний режим, встановлений Культом Дракона.
            </Paragraph>
          </Box>
          <Box my={10}>
            <Paragraph fontSize="16px">
              Більшість з їхнього числа - добре озброєні воїни, багато хто - ще
              й досвідчені. Вони - залізний кулак на пульсі міста, і ті, з ким
              ви стикатиметесь частіше всього. Впізнати їх можна за
              яскраво-зеленою символікою у вигляді каплі, що вкриває їх безчесні
              чорні мундири.
            </Paragraph>
          </Box>

          <Box my={10}>
            <Quote author="з архівів Гахала Іммертума, Намісника фракції Альянс Лордів у Флані" />
          </Box>

          <Box my={10}>
            <Paragraph fontSize="16px">
              Сльози Злоби зберегли усі навички Чорних Кулаків. Ті ж манери
              допитів, та ж ненависть, те ж бажання робити все чужими руками. Їх
              багато, вони добре озброєні, у них є тактика, відточена роками.
              Але Культ потребує покори та гарматного м’яса, тому Сльози Злоби
              набирають до себе усіх: садистів, ображених та “патріотів” із
              промитими мізками. Секрет успішного протистояння з цими загонами -
              це знищення командування. Без командира Сльози Злоби
              перетворюються на звичайних головорізів.
            </Paragraph>
          </Box>

          <Box my={10}>
            <Paragraph fontSize="16px">
              Але як не всі Чорні Кулаки були корумповані, так не всі з них
              підтримали режим Ворганшакса. Такі особи як Алейд Буррал чи
              Джесаїл Грейкастл можуть бути цінними союзниками, які допоможуть
              переманити тих Чорних Кулаків, які коливаються.
            </Paragraph>
          </Box>

          <Box my={10}>
            <Quote author="з доповіді мисливця Гастона" />
          </Box>
        </Tabs.TabPane>

        <Tabs.TabPane tab="Червоні Чарівники Флану" key="red_wizards">
          <Flex center>
            <Header fontSize={30} fontWeight="bold">
              Червоні Чарівники Флану
            </Header>
          </Flex>

          <Box my={10}>
            <Paragraph fontSize="16px">
              Я лише кілька раз бачив Червоних Чарівників в дії. В червоних
              шатах, лисі, татуйовані, мовчазні. Вони працюють групами, по три
              чаклуна мінімум. Поки один виманює на себе противника, інші двоє
              знаходяться поруч, невидимі, готові або метнути гігантські вогняні
              кулі, або ж паралізувати суперників. Або ж і те, і інше. Деколи
              вони викликають мертвих собі на допомогу, оточуючи суперників, щоб
              шпурнути кулю вогню в натовп. Майже завжди вони супроводжують
              високопосадовців Культу чи важливі вантажі. Або ж беруть участь в
              каральних операціях, де цілять вогняними кулями в противників,
              ігноруючи жертви серед союзників. Мені інколи здається, що вони їм
              просто подобається метати вогняні кулі.
            </Paragraph>
          </Box>

          <Box my={10}>
            <Paragraph fontSize="16px">
              Я знаю, що Культ Дракона також має чаклунів, але Червоні, як їх
              називають Сльози Злоби, це зовсім інший рівень. Якщо ви не можете
              вбити їх першими - тікайте.
            </Paragraph>
          </Box>

          <Box my={10}>
            <Quote author="з доповіді мисливця Гастона" />
          </Box>
        </Tabs.TabPane>

        <Tabs.TabPane tab="Вітаючі" key="welcomers">
          <Flex center>
            <Header fontSize={30} fontWeight="bold">
              Вітаючі
            </Header>
          </Flex>

          <Box my={10}>
            <Paragraph fontSize="16px">
              Гільдія злодіїв Флану, що грабувала багатіїв та купців. Оскільки
              вони часто допомагали в обороні міста, їм дозволяли існувати
              відкрито, через що члени угрупування відрізали собі ліве вухо, аби
              виділятись.
            </Paragraph>
          </Box>

          <Box my={10}>
            <Paragraph fontSize="16px">
              Коли новий Лорд Регент Ектор Брамс прийшов до влади, Вітаючі
              опинились поза законом. Чорні Кулаки висліджують “одновухих” та
              вішають їх на Воротах Стоянов. Взамін Вітаючі почали грабувати
              гільдії, чим ще більше погіршили своє становище.
            </Paragraph>
          </Box>

          <Box my={10}>
            <Paragraph fontSize="16px">
              Все змінилось, коли Флан захопив дракон Ворганшаракс та Культ
              Дракона, Вітаючі стали народними героями. Використовуючи свої
              знання підземних комунікацій, колишні злодії почали виводити
              мешканців за межі міста та допомагати фракціям Флану в боротьбі з
              окупацією.
            </Paragraph>
          </Box>

          <Box my={10}>
            <Paragraph fontSize="16px">
              Правда не всім сподобався такий розвиток подій. Шрейлін Горл
              захопив владу над однією ячейкою Вітаючих, та використав їхні
              знання, аби допомогти Культу Дракона ловити втікачів. Взамін йому
              було даровано маєток Ковель та амністію.
            </Paragraph>
          </Box>
        </Tabs.TabPane>

        <Tabs.TabPane tab="Орден Воскресіння" key="resurrection_order">
          <Flex center>
            <Header fontSize={30} fontWeight="bold">
              Орден Воскресіння
            </Header>
          </Flex>

          <Box my={10}>
            <Paragraph fontSize="16px">
              Нікому невідоме угрупування, що з’явилось у Флані. Орден
              Воскресіння обіцяє повернути до життя усіх - за певну ціну. Для
              цього вони використовують демонічні ритуали та масові
              жертвоприношення. Очолює його невідома особа на ім’я Провідник.
            </Paragraph>
          </Box>

          <Box my={10}>
            <Quote author="з інтерв’ю для “Вісника Флану”">
              - Серйозно? Вас звати Провідник? Ви проводите струм? Чи бабусь
              через дорогу?
              <br />
              - При житті я носив інше ім'я. Зараз мене називають Провідник - я
              проводжу померлих в наш світ.
              <br />
              - Ви...ем...мертвий?
              <br />
              - Так. Я жив і помер. І зрозумів, що смерть - це просто інша форма
              життя.
              <br />
              - Глибок твердження... Напевно як ваша могила. Хе.... Кгм... Ваш
              Орден воскрешає усіх бажаючих?
              <br />
              - Так, усіх хто може заплатити ціну.
              <br />
              - 10 000 золотих - це серйозна плата. Ви робите знижки постійним
              клієнтам?
              <br />
              - Не можна воскреснути двічі.
              <br />
              - І ви "повертаєте" навіть ворогів Культу Дракона? Вам не здається
              це "протизаконним"?
              <br />
              - Смерть не має законів. Перед нею усі рівні.
              <br />
              - Чудово. Куди приходити, якщо я раптом помру? В Алестон? Ви,
              здається, там влаштовували масовий геноцид останнього разу.
              <br />- Алестон виконав своє завдання. Тепер ми чекаємо його у
              Вежі Денлора.
            </Quote>
          </Box>
        </Tabs.TabPane>
      </Tabs>
    </Box>
  )
}

export default Phlan
