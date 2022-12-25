import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Flex } from 'noui/Position'
import ZoomCard from 'components/ZoomCard'

import theHarpersCover from './shared/images/LATESTSTORY_Factions_Factions_Mosaic_Harpers_140611_0.jpg'
import theOrderOfTheGauntletCover from './shared/images/LATESTSTORY_Factions_Factions_Mosaic_Order-of-the-Gauntlet_140611_0.jpg'
import theEmeraldEnclaveCover from './shared/images/LATESTSTORY_Factions_Factions_Mosaic_Emerald-Enclave_140611.jpg'
import theLordsAllianceCover from './shared/images/LATESTSTORY_Factions_Factions_Mosaic_Lords-Alliance_140611_0.jpg'
import theZhentarimCover from './shared/images/LATESTSTORY_Factions_Factions_Mosaic_Zhentarim_140611_0.jpg'

const MainFactions = [
  {
    label: 'Арфісти',
    link: `/the_harpers`,
    image: theHarpersCover,
  },
  {
    label: 'Орден Латної Рукавиці',
    link: `/the_order_of_the_gauntlet`,
    image: theOrderOfTheGauntletCover,
  },
  {
    label: 'Смарагдовий Анклав',
    link: `/the_emerald_enclave`,
    image: theEmeraldEnclaveCover,
  },
  {
    label: 'Альянс Лордів',
    link: `/the_lords_alliance`,
    image: theLordsAllianceCover,
  },
  {
    label: 'Жентарім',
    link: `/the_zhentarim`,
    image: theZhentarimCover,
  },
]

const Factions = () => {
  const navigate = useNavigate()

  return (
    <Box mt={10} mr={[0, 20]}>
      <Flex>
        {MainFactions.map(({ label, link, image }) => (
          <ZoomCard
            key={label}
            title={label}
            image={image}
            width={['90vw', '20vw']}
            height={['50vw', '80vh']}
            maxHeight={['40vh', 'none']}
            my={['5px', 10]}
            mx={[10, '5px']}
            onClick={() => navigate(`/lore/factions${link}`)}
          />
        ))}
      </Flex>
    </Box>
  )
}

export default Factions
