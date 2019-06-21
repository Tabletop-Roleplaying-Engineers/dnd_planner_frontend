import React from 'react'
import { Box, Flex } from 'noui/Position'
import ZoomCard from 'components/ZoomCard'
import { Header, Paragraph } from 'ui/Text'
import { withRouter } from 'react-router-dom'
import { weAreWorking } from 'noui/Info'
import loreCover from './shared/lore.jpg'
import rulesCover from './shared/rules.jpg'
import calendarCover from './shared/calendar.png'

function Dashboard (props) {
  return (
    <Box mt={10} mx={30}>
      <Flex
        flexDirection={['column', 'row']}
        justifyContent={['center', 'space-between']}
        alignItems="center"
      >
        <ZoomCard
          title="Правила"
          image={rulesCover}
          width={['90vw', '33%']}
          my={[10, 0]}
          height={['50vw', '25vw']}
          onClick={() => props.history.push('/help#the_rules')}
        />
        
        <ZoomCard
          title="Календар"
          image={calendarCover}
          width={['90vw', '33%']}
          my={[10, 0]}
          height={['50vw', '25vw']}
          onClick={weAreWorking}
        />
        
        <ZoomCard
          title="Ліга Авантюристів"
          image={loreCover}
          width={['90vw', '33%']}
          my={[10, 0]}
          height={['50vw', '25vw']}
          onClick={() => props.history.push('/lore')}
        />
      </Flex>
      
      <Box pt={20}>
        <Header>Коротко про головне:</Header>
        
        <Box my={10}>
          <Paragraph>
            Dungeons & Dragons (укр. «Підземелля і дракони», скорочується до D&D або DnD) — настільна рольова гра в
            стилі
            фентезі, яка випускається компанією <a href="https://company.wizards.com/">Wizards of the Coast</a>.
          </Paragraph>
        </Box>
        
        <Box my={10}>
          <Paragraph>
            У грі беруть участь ігровий майстер (Dungeon Master, DM, Майстер) та кілька гравців, зазвичай від 3-х до
            6-ти. Для гри необхідні листи персонажів із записами їхніх характеристик, багатогранні кубики (на 4, 6, 8,
            10, 12 та 20 граней), іноді розграфлене поле та мініатюрки. Кожен гравець керує діями одного персонажа
            ігрового світу. Майстер діє від імені всіх неігрових персонажів (NPC, Non Player Character), таких як вороги
            чи помічники. Також він описує сам світ і події, що в ньому відбуваються.
          </Paragraph>
        </Box>
        
        <Box my={10}>
          <Paragraph>
            Протягом гри кожен гравець задає дії для свого персонажа, а результати дій визначаються Майстром відповідно
            до правил. Випадкові події моделюються киданням грального кубика (англ. dice). Іноді рішення майстра можуть
            не відповідати правилам задля сприяння цікавості ігрового сеансу. Це є «золотим правилом Dungeons &
            Dragons»: «DM завжди правий».
          </Paragraph>
        </Box>
        
        <Box my={10}>
          <Paragraph>
            У Львові D&D активно розвивається завдяки групі <a href="https://www.facebook.com/groups/dnd.lviv/">"Пряма
            Гільдія"</a> та
            клубу-магазину настільних ігор <a href="http://octopus.lviv.ua/">"Octopus"</a>.
          </Paragraph>
        </Box>
        
        <Flex column my={10}>
          <Paragraph>
            Телеграм-канал: <a href="https://t.me/LvivAL">https://t.me/LvivAL</a>
          </Paragraph>
          <Paragraph>
            Генерація персонажа: <a href="https://www.dndbeyond.com/">https://www.dndbeyond.com/</a>
          </Paragraph>
          <Paragraph>
            Що таке Ліга Авантюристів: <a href="https://bit.ly/2F75e8u">https://bit.ly/2F75e8u</a>
          </Paragraph>
          <Paragraph>
            Календар подій: <a href="http://clc.am/j1Ggbg">http://clc.am/j1Ggbg</a>
          </Paragraph>
        </Flex>
      </Box>
      
      {/*<Box>*/}
      {/*  <Button onClick={() => {*/}
      {/*    localStorage.setItem('FIRST_PAGE', '/calendar')*/}
      {/*    props.history.push('/calendar')*/}
      {/*  }}*/}
      {/*  >*/}
      {/*    Do not show me this page again!*/}
      {/*  </Button>*/}
      {/*</Box>*/}
    </Box>
  )
}

export default withRouter(Dashboard)
