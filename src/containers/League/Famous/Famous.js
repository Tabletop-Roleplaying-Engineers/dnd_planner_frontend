import React from 'react'
import { useNavigate } from 'react-router-dom'
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

const Famous = () => {
  const navigate = useNavigate()

  return (
    <Flex justifyContent="center" flexWrap="wrap">
      {TOPICS.map(({ label, link, image }) => (
        <ZoomCard
          key={label}
          title={label}
          image={image}
          width={['90vw', '30vw']}
          height={['50vw', '80vh']}
          maxHeight={['40vh', 'none']}
          my={['5px', 10]}
          mx={[20, 10]}
          onClick={() => navigate(`/lore${link}`)}
        />
      ))}
    </Flex>
  )
}

export default Famous
