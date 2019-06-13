import React from 'react'
import { Flex } from 'noui/Position'
import ZoomCard from 'components/ZoomCard'
import { withRouter } from 'react-router-dom'
import thayCover from './shared/thay.jpg'
import cultCover from './shared/cult.jpg'
import phlanCover from './shared/phlan.jpg'
import spoilersCover from './shared/cult.jpg'

const ITEMS = [
  {
    label: 'Teй',
    link: '/thay',
    image: thayCover,
  },
  {
    label: 'Культ Дракона',
    link: '/cult_of_the_dragon',
    image: cultCover,
  },
  {
    label: 'Флан',
    link: '/phlan',
    image: phlanCover,
  },
  {
    label: 'Основна сюжетна лінія',
    link: '/spoilers',
    image: spoilersCover,
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
            width={[ '90vw', '40%' ]}
            maxHeight={[100, 250]}
            my={[ 5, 10 ]}
            mx={[ 20, 10 ]}
            onClick={() => props.history.push(`/lore${link}`)}
          />
        )
      }

    </Flex>
  )
}

export default withRouter(Lore)
