import Emerald_Enclave from 'resources/Emerald_Enclave.png'
import Harpers from 'resources/Harpers.png'
import Lords_Alliance from 'resources/Lords_Alliance.png'
import Order_of_the_Gauntlet from 'resources/Order_of_the_Gauntlet.png'
import Zhentarim from 'resources/Zhentarim.png'
import Un_Faction from 'resources/Un_Faction.png'
import * as R from 'ramda'

export const playersInGame = [3, 4, 5, 6]

export const factions = [
  {
    name: 'Un Faction',
    logo: Un_Faction
  },
  {
    name: 'Harpers',
    logo: Harpers
  },
  {
    name: 'Order of the Gauntlet',
    logo: Order_of_the_Gauntlet
  },
  {
    name: 'Emerald Enclave',
    logo: Emerald_Enclave
  },
  {
    name: 'Lords’ Alliance',
    logo: Lords_Alliance
  },
  {
    name: 'Zhentarim',
    logo: Zhentarim
  }
]

export const modalWidth = () => R.min(document.body.clientWidth * 0.8, 640)