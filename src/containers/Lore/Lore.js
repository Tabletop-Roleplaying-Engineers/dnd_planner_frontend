import React from 'react'
import { Flex } from 'noui/Position'
import ZoomCard from 'components/ZoomCard'
import { withRouter } from 'react-router-dom'

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
  },
  {
    label: 'Культ Дракона та їх союзники',
    link: '/cult_of_the_dragon',
    image: cultCover,
  },
  {
    label: 'Фракції Флану та Фаєруну',
    link: '/factions',
    image: factionsCover,
  },
  {
    label: 'Флан та околиці',
    link: '/phlan',
    image: phlanCover,
  },
  {
    label: 'Визначні особистості',
    link: '/famous_persons',
    image: famousCover,
  },
  {
    label: 'Воскресіння Тіамат',
    link: '/resurrection_of_tiamat',
    image: tiamatCover,
  },
]

const Lore = props => {
  return (
    <Flex
      justifyContent="center"
      flexWrap="wrap"
    >
      {
        ITEMS.map(({ label, link, image }) =>
          <ZoomCard
            key={label}
            title={label}
            image={image}
            width={[ '90vw', '30vw' ]}
            height={['50vw', '25vw']}
            maxHeight={['40vh', '40vh']}
            my={[ '5px', 10 ]}
            mx={[ 20, 10 ]}
            onClick={() => props.history.push(`/lore${link}`)}
          />
        )
      }

    </Flex>
  )
}

export default withRouter(Lore)
