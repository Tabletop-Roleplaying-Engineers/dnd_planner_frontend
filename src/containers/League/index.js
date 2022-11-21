import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Lore from './Lore'
import CultOfTheDragon from './CultOfTheDragon'
import FamousPersons from './Famous'
import Phlan from './Phlan'
import Storyline from './Storyline'
import Factions from './Factions'

const Scene = () => {
  return (
    <Routes>
      <Route path={''} element={<Lore />} />
      <Route path={`cult_of_the_dragon/*`} element={<CultOfTheDragon />} />
      <Route path={`famous/*`} element={<FamousPersons />} />
      <Route path={`factions/*`} element={<Factions />} />
      <Route path={`storyline/*`} element={<Storyline />} />
      <Route path={`phlan/*`} element={<Phlan />} />
    </Routes>
  )
}

export default Scene
