import React from 'react'
import { Flex } from 'noui/Position'
import ZoomCard from 'components/ZoomCard'
import { useNavigate } from 'react-router-dom'
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
    onClick: (props) => props.navigate(`/lore/storyline`),
  },
  {
    label: 'Культ Дракона та їх союзники',
    link: '/cult_of_the_dragon',
    image: cultCover,
    onClick: (props) => props.navigate(`/lore/cult_of_the_dragon`),
  },
  {
    label: 'Фракції Флану та Фаєруну',
    link: '/factions',
    image: factionsCover,
    onClick: (props) => props.navigate(`/lore/factions`),
  },
  {
    label: 'Флан та околиці',
    link: '/phlan',
    image: phlanCover,
    onClick: (props) => props.navigate(`/lore/phlan`),
  },
  {
    label: 'Визначні особистості',
    link: '/famous',
    image: famousCover,
    onClick: (props) => props.navigate(`/lore/famous`),
  },
  {
    label: 'Воскресіння Тіамат',
    link: '/resurrection_of_tiamat',
    image: tiamatCover,
    onClick: weAreWorking,
  },
]

const Lore = () => {
  const navigate = useNavigate()

  return (
    <Flex justifyContent="space-between" flexWrap="wrap" mx={[0, 30]}>
      {ITEMS.map(({ label, onClick, image }) => (
        <ZoomCard
          key={label}
          title={label}
          image={image}
          width={['100%', '33%']}
          height={['45vw', '40vh']}
          maxHeight="none"
          mt="10px"
          onClick={() => onClick({ navigate })}
        />
      ))}
    </Flex>
  )
}

export default Lore
