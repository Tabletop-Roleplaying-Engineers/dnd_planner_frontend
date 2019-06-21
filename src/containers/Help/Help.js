import React, { useState, useEffect } from 'react'
import { Tabs, List, Alert } from 'antd'
import { Box } from 'noui/Position'
import { textAlign } from 'styled-system'
import { Header, Msg } from 'ui/Text'
import { withRouter } from 'react-router-dom'
import { isMobile } from 'noui/MediaQuery'
import { Flex } from '../../noui/Position'
import { Label, Paragraph } from '../../ui/Text'

const RULES = [
  'Якщо це ваша перша гра Ліги Авантюристів - ви починаєте персонажем першого рівня!',
  'Заборонені будь-які evil-алайменти (окрім Lawful Evil для фракцій Жентарім та Альянс Лордів).',
  'Заборонена Unearthed Arcana.',
  'Заборонено PvP (Player versus Player).',
  'Початкові характеристики - лише через Standart Array (15, 14, 13, 12, 10, 8) або ж Point Buy.',
  'Генерування персонажів відбуваються по принципу PHB +1, тобто використовувати можна Книгу Гравця + ще одну книгу на вибір (Elemental Evil Player’s Companion, Volo’s Guide to Monsters, Xanathar’s Guide to Everything, Sword Coast Adventurer’s Guide, Mordenkainen’s Tome of Foes). Посилання на Книгу Гравця - [тут](https://dungeonsanddragons.ru/bookfull/5ed/5e%20Players%20Handbook%20-%20%D0%9A%D0%BD%D0%B8%D0%B3%D0%B0%20%D0%B8%D0%B3%D1%80%D0%BE%D0%BA%D0%B0%20RUS.pdf)',
  'Жодних рас/класів, які мають властивість “Політ”.',
  'Ваші стартові предмети описані в Книзі Гравця. Ви завжди берете стартові цифри, не використовуючи модифікатори кидка кубика.',
  'При отриманні нового рівня ви отримуєте середнє значення здоров’я, не через кидок кубика.',
  'Усі очки досвіду (ХР), золота та предмети, які ви отримуєте під час завершення завдання в Лізі Авантюристів переходять з вами в інші пригоди Ліги. Записуйте усі надходження. Золото та досвід ЗАВЖДИ ділиться порівну між усіма гравцями. Магічні предмети отримують ті, хто їх ще немає.',
  'За виконання квестів ви будете отримувати ДП (Дні Простою). Що воно таке і як його витрачати описано нижче.',
  'Між сесіями ви можете витрачати своє золото на купівлю предметів з Книги Гравця.',
  'ВАЖЛИВО! Між сесіями Ліги Авантюристів ви можете змінювати раси і класи, для того щоб підібрати собі героя до смаку. Однак ваші предмети зберігаються, очки досвіду зберігаються і, НАЙВАЖЛИВІШЕ, ім’я персонажа - також зберігається. Однак це можливо лише до 4 рівня включно!',
  'По ходу сюжету у вас буде можливість приєднатись до однієї із фракцій Флану та отримати ряд вагомих переваг. Але будьте уважні - зробивши вибір, змінити його уже не вийде. Опис усіх фракцій - [тут](https://dungeonsanddragons.ru/bookfull/AL_Faction_Guide_RUS.pdf)',
]

const DEATH_OPTIONS = [
  'Якщо тіло мертвого можна повернути в місто, і всі його важливі органи знаходяться на місці, гравець може заплатити 1250 золотих зі своїх запасів, щоб заплатити нейтральному клірику за закляття raise dead.',
  'Якщо в мертвого немає грошей, група може скинутись і воскресити товариша спільними коштами. Група не зобов’язана це робити, а персонаж не зобов’язаний повертати кошти.',
  'Якщо персонаж помирає і його воскрешають до завершення пригоди - він отримує усю винагороду по завершенню ігрової сесії.',
  'Якщо воскресіння відбувається по завершенню пригоди (силами авантюристів чи оплачуючи послуги чарівника) - персонаж отримує лише ту винагороду, яку він заробив, будучи живим.',
  'Якщо воскресіння відбувається перед наступною ігровою сесією - гравець не отримує жодної винагороди за попередню пригоду.',
  'Якщо персонаж 1-4 рівня і є членом однієї із фракцій, представник фракції може воскресити свого представника. Ця опція доступна лише на 1-4 рівні. Більше того, в такому випадку персонаж втрачає всі ХР, золото та предмети отримані під час поточної сесії, і не може перегравати цю пригоду.',
]

const DOWNTIME = [
  {
    label: 'Скористатись послугами чарівника.',
    text: 'Ціна за використані матеріали в заклятті може бути розділена між гравцями поточної пригоди.',
  },
  {
    label: 'Скопіювати закляття в свою книгу.',
    text: 'За кожен день простою персонаж можна витратити 8 годин для копіювання одного закляття у свою чарівну книгу. Два або більше персонажі в одній і тій же пригоді можуть разом витратити години простою для обміну відомими закляттями. Оскільки існує шанс невдалого копіювання, ці дії мають відбуватись в присутності ДМа.',
  },
  {
    label: 'Підвищити рівень',
    text: 'Можна витратити дні простою, щоб підвищити собі рівень. Однак це можливо лише на 4, 10 та 16 рівнях.\n' +
      'З 4 на 5 рівень - 20 днів\n' +
      'З 10 на 11 рівень - 100 днів\n' +
      'З 16 на 17 рівень - 300 днів\n',
  },
  {
    label: 'Взяти участь в азартних іграх',
    text: 'Ціна: 5 днів простою, ставка від 10 до 1000 золотих, три перевірки навиків: Уважності (Perception), Обману (Deception) та Залякування (Intimidation)\n' +
      'Ефект: від втрати ставки та отримання боргів, до подвоєння ставки\n',
  },
  {
    label: 'Вдатись до криміналу та пограбувати одного із торговців Флану',
    text: 'Ціна: 5 днів простою, 25 золотих, три перевірки навиків: Скритності (Stealth), Спритності (Dexterity) з наявними інструментами (Thievs Tools) та Обману (Deception) або Уважності (Perception) або Розслідування (Investigation) на вибір.\n' +
      'Ефект: від потрапляння в тюрму до отримання хорошої винагороди\n',
  },
  {
    label: 'Бійцівський турнір\n',
    text: 'Ціна: 5 днів простою, три перевірки навиків: Атлетика (Athletics), Акробатика (Acrobatics) та особлива перевірка Тілобудови (Constitution) з бонусом, рівним результату кидка найбільшої Кості Хітов (Hit Dice) персонажа. При бажанні будь-яку з цих перевірок можна замінити на кидок атаки своєї зброї.\n' +
      'Ефект: від нульового заробітку до 200 золотих прибутку\n',
  },
  {
    label: 'Релігійне служіння (лише для “віруючих” персонажів)\n',
    text: 'Ціна: 5 днів простою, перевірка Релігії (Religion) або Харизми (Charisma)\n' +
      'Ефект: \n' +
      '1-9 Ніякого ефекту. Старання гравця не були помічені \n' +
      '10-20 Наступна атака дорівнюватиме 19, якщо 19-20 для гравця кріт - то це кріт. \n' +
      '21+ Отримання Inspiration\n',
  },
]

const TRADE = [
  'Магічні предмети завжди отримує той гравець, який його ще немає, або ж в якого їх менше. Якщо предмет нікому не потрібен, тоді він просто покидає гру.',
  'Предмети можна обмінювати між гравцями за наступними правилами:\n' +
  '(якщо гравці не грають разом) за 15 днів простою з кожного гравця + ціна проживання за 15 днів;\n' +
  '(якщо гравці грають за одним столом) безкоштовно і миттєво;\n',
  'Гравець може "позичити" магічний предмет сопартійцю на час ігрової сесії, але це не рахується обміном і по завершенні завдання предмет автоматично повертається до власника.',
  'Предмети обмінюються ЛИШЕ на предмети тої ж рідкісності (uncommon на uncommon, rare на rare) і того ж ігрового сезону. Їх не можна обміняти на гроші чи на розхідні матеріали (свитки і зілля рахуються розхідним матеріалом).',
  'Отримані після завдання магічні предмети НІКОЛИ не продаються за ринковою ціною, їх можна лише обміняти.',
  'Існує можливість викинути чи знищити непотрібний магічний предмет, але він все одно буде рахуватись в ліміті магічних предметів, якими володіє гравець (необхідно лише для визначення в кого їх більше, під час розподілу нових предметів)',
  'При виході з фракції, персонаж втрачає усі очки renown даної фракції та більше не може повернутись до неї. Магічні фракційні предмети залишаються у власності персонажа.',
]

const FAQ = [
  'Створювати магічні свитки під час 1 сезону Ліги Авантюристів ЗАБОРОНЕНО! Знайдені на пригоді або куплені магічні свитки працюють по звичним правилам.',
  'Предмети, які ви даєте союзниками під час пригоди (магічні, звичайні, зілля, свитки) повертаються до вас після пригоди, якщо не були використані.',
  'У випадку суперечливих ситуацій за столом (різне трактування правил, нелогічне поводження персонажів тощо) фінальне слово за Майстром, який веде гру. Гравці можуть оскаржити рішення Майстра ПІСЛЯ гри, однак під час сесії фінальне слово за ним.',
  'Якщо гравець вимушено чи свідомо покидає пригоду до її завершення - він отримує лише ХР згідно пройдених сутичок та виконаних завдань на час його виходу. Він не отримує золото та не бере участь у розподілі магічних предметів в кінці сесії.',
  'Якщо гравець зареєструвався на гру, але не прийшов без попередження - пригода рахується пройденою, із занесенням в таблицю зіграних сесій. Пройти її знову цей персонаж уже не може. ',
]

const Help = ({history, location}) => {
  const [tab, setTab] = useState(location.hash.substring(1) || 'the_death')
  
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
        <Tabs.TabPane tab="Правила Ліги" key="the_rules">
          <Box my={10}>
            <Header>Правила Ліги Авантюристів</Header>
          </Box>
          
          <List
            size="large"
            bordered
            dataSource={RULES}
            renderItem={item => (<List.Item>{item}</List.Item>)}
          />
        </Tabs.TabPane>
        
        <Tabs.TabPane
          tab="Смерть персонажа"
          key="the_death"
        >
          <Box my={10}>
            <Header>Смерть персонажа</Header>
          </Box>
          
          <Box mb={10}>
            <Msg>
              Трапляється так, що небезпека виявляється занадто серйозною і один або кілька персонажів помирають під
              час виконання завдання. Ось як можна вийти із такої ситуації:
            </Msg>
          </Box>
          
          <List
            size="large"
            bordered
            dataSource={DEATH_OPTIONS}
            renderItem={item => (<List.Item>{item}</List.Item>)}
          />
          
          <Alert
            message="Важливо! "
            description="В усіх випадках вище, використовується закляття raise dead. Персонаж отримує -4 штраф на кидки атаки, спаскидки та перевірки навиків. Штраф зменшується на -1 за кожен довгий відпочинок. Між завданнями можна витрачати дні простою, щоб “проспати” цей штраф."
            type="info"
            showIcon
          />
          
          <Box>
            <Alert
              description="Якщо жоден з варіантів не підходить, прийдеться створювати нового персонажа 1-го рівня. Такий персонаж немає жодних переваг від свого попередника, оновлює ім’я та може заново проходити попередньо зіграні пригоди."
              type="error"
            />
          </Box>
        
        </Tabs.TabPane>
        
        <Tabs.TabPane
          tab="Дні простою"
          key="downtime_activities"
        >
          <Box my={10}>
            <Header>
              Дні простою
            </Header>
          </Box>
          
          <Paragraph>
            Час, який відбувається між пригодами, вимірюється в днях простою. Цей період можна витратити на наступні
            речі:
          </Paragraph>
          
          <List
            size="large"
            bordered
            dataSource={DOWNTIME}
            renderItem={({label, text}) => (
              <List.Item>
                <Flex column>
                  <Label textAlign="left">{label}</Label>
                  
                  {
                    text
                    .split('\n')
                    .map(t => (<Paragraph>{t}</Paragraph>))
                  }
                </Flex>
              </List.Item>
            )}
          />
        </Tabs.TabPane>
        
        <Tabs.TabPane
          tab="Обмін предметами"
          key="trade"
        >
          <Box my={10}>
            <Header>
              Обмін предметами
            </Header>
          </Box>
          
          <Box mt={20}>
            <Label textAlign="left">
              Щодо звичайних предметів:
            </Label>
          </Box>
          
          <Box my={10}>
            <Alert
              description="Обмінюватись звичайними предметами та золотом між СВОЇМИ персонажами ЗАБОРОНЕНО!"
              type="error"
            />
          </Box>
          
          <Box my={10}>
            <Alert
              description="Передавати золото та предмети іншому персонажу ЗАБОРОНЕНО! Дозволено лише оплачувати послуги під час пригоди (наприклад, скинутись золотом, аби купити лікувальне зілля чи предмет). В такому випадку предмет рахується у власності того персонажа, якому його вручили."
              type="error"
            />
          </Box>
          
          <Box my={10}>
            <Alert
              description="Обмін магічними предметами між своїми персонажами та іншими гравцями - за звичайними правилами."
              type="info"
            />
          </Box>
          
          <Box my={10}>
            <Label textAlign="left">
              Щодо магічних предметів:
            </Label>
          </Box>
          
          <Box my={10}>
            <Paragraph>
              В кінці кожної ігрової сесії герої у винагороду отримують не тільки гроші, славу і дні простою, а й
              предмети різного типу магічності. Вони можуть бути потрібні кільком гравцям одночасно, або ж не потрібні
              нікому. Нижче - декілька нюансів, як допоможуть вам розібратись хто, кому і за які гроші.
            </Paragraph>
          </Box>
          
          <List
            size="large"
            bordered
            dataSource={TRADE}
            renderItem={text => (
              <List.Item>
                <Flex column>
                  {
                    text
                    .split('\n')
                    .map(t => (<Paragraph>{t}</Paragraph>))
                  }
                </Flex>
              </List.Item>
            )}
          />
          
          <Box my={10}>
            <Paragraph>
              Усі маніпуляції з предметами (отримання, обмін, купівля) записуються на листку Ліги Авантюристів активного
              гравця (або обох гравців, якщо це був обмін).
            </Paragraph>
          </Box>
        </Tabs.TabPane>
  
        <Tabs.TabPane
          tab="Важливі дрібниці"
          key="faq"
        >
          <Box my={10}>
            <Header>
              Важливі дрібниці
            </Header>
          </Box>
    
          <List
            size="large"
            bordered
            dataSource={FAQ}
            renderItem={text => (
              <List.Item>
                <Paragraph>{text}</Paragraph>
              </List.Item>
            )}
          />
        </Tabs.TabPane>
      </Tabs>
    </Box>
  )
}

export default withRouter(Help)
