import React from 'react'

import { Box, Flex } from 'noui/Position'
import ZoomCard from 'components/ZoomCard'
import { Header, Paragraph } from 'ui/Text'
import { withRouter } from 'react-router-dom'
import rulesCover from './shared/rules.jpg'
import calendarCover from './shared/calendar.png'

import { IFrame } from './shared/styled'


function Dashboard(props) {
  return (
    <Box mt={10} mx={30}>
      <Flex
        flexDirection={['column', 'row']}
        justifyContent={['center', 'space-between']}
        alignItems="center"
      >
        <ZoomCard
          title="Ліга Авантюристів"
          image={rulesCover}
          width={['90vw', '33%']}
          my={[10, 0]}
          height={['50vw', '25vw']}
          onClick={() => props.history.push('/rules')}
        />

        <ZoomCard
          title="Календар ігор"
          image={calendarCover}
          width={['90vw', '33%']}
          my={[10, 0]}
          height={['50vw', '25vw']}
          onClick={() => props.history.push('/calendar')}
        />

        <IFrame
          title="twitchPlayer"
          src="https://player.twitch.tv/?channel=dnd_lviv_guild"
          frameborder="0"
          allowfullscreen="true"
          scrolling="no"
          width={['90vw', '33%']}
          height={['50vw', '25vw']}
          my={[10, 0]}
        ></IFrame>

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
            Телеграм-канал: <a href="https://t.me/LvivDnD" target="_blank" rel="noopener noreferrer">https://t.me/LvivDnD</a>
          </Paragraph>
          <Paragraph>
            Генерація персонажа: <a href="https://www.dndbeyond.com/" target="_blank" rel="noopener noreferrer">https://www.dndbeyond.com/</a>
          </Paragraph>
          <Paragraph>
            Базові правила D&D 5e: <a href="https://dnd.wizards.com/articles/features/basicrules" target="_blank" rel="noopener noreferrer">https://dnd.wizards.com/articles/features/basicrules</a>
          </Paragraph>
        </Flex>
      </Box>
    </Box>
  )
}

export default withRouter(Dashboard)
