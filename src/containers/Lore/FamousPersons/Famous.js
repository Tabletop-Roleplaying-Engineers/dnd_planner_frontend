import React from 'react'
import ZoomCard from 'components/ZoomCard'
import { Flex } from 'noui/Position'
import enemyCover from './shared/enemy.jpg'
import allyCover from './shared/ally.jpg'
import adventurerCover from './shared/adventurer.jpg'


const TOPICS = [
  {
    label: 'Вороги',
    link: '/famous/enemy',
    image: enemyCover,
  },
  {
    label: 'Союзники',
    link: '/famous/ally',
    image: allyCover,
  },
  {
    label: 'Авантюристи',
    link: '/famous/adventurer',
    image: adventurerCover,
  },
]

const Famous = props => {
  return (
    <Flex
      justifyContent="center"
      flexWrap="wrap"
    >
      {
        TOPICS.map(({ label, link, image }) =>
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

export default Famous
