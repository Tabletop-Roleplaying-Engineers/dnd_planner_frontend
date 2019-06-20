import React from 'react'
import { Flex } from 'noui/Position'
import ZoomCard from 'components/ZoomCard'
import { withRouter } from 'react-router-dom'
import { weAreWorking } from 'noui/Info'
import storylineCover from './shared/storyline.jpg'
import cultCover from './shared/thay.jpg'
import factionsCover from './shared/factions.jpg'
import phlanCover from './shared/phlan.jpg'
import famousCover from './shared/famous.jpg'
import tiamatCover from './shared/tiamat.jpg'


const ITEMS = [
  {
    label: 'Основна сюжетна лінія',
    link: '/storyline',
    image: storylineCover,
    onClick: props => props.history.push(`/lore/storyline`),
  },
  {
    label: 'Культ Дракона та їх союзники',
    link: '/cult_of_the_dragon',
    image: cultCover,
    onClick: props => props.history.push(`/lore/cult_of_the_dragon`),
  },
  {
    label: 'Фракції Флану та Фаєруну',
    link: '/factions',
    image: factionsCover,
    onClick: weAreWorking,
  },
  {
    label: 'Флан та околиці',
    link: '/phlan',
    image: phlanCover,
    onClick: weAreWorking,
  },
  {
    label: 'Визначні особистості',
    link: '/famous',
    image: famousCover,
    onClick: weAreWorking,
  },
  {
    label: 'Воскресіння Тіамат',
    link: '/resurrection_of_tiamat',
    image: tiamatCover,
    onClick: weAreWorking,
  },
]

const Lore = props => {
  return (
    <Flex
      justifyContent="space-between"
      flexWrap="wrap"
      my={10}
    >
      {
        ITEMS.map(({ label, onClick, image }) =>
          <ZoomCard
            key={label}
            title={label}
            image={image}
            width={[ '100%', '33%' ]}
            height={['45vw', '40vh']}
            maxHeight="none"
            my="5px"
            onClick={() => onClick(props)}
          />
        )
      }
    </Flex>
  )
}

export default withRouter(Lore)
