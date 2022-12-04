import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Factions from './Factions'
import Harpers from './Harpers'
import OrderOfGauntlet from './OrderOfGauntlet'
import EmeraldEnclave from './EmeraldEnclave'
import LordsAlliance from './LordsAlliance'
import Zhentarim from './Zhentarim'
import Others from './Others'

const Scene = () => {
  return (
    <Routes>
      <Route path={''} element={<Factions />} />
      <Route path={`the_harpers`} element={<Harpers />} />
      <Route path={`the_order_of_the_gauntlet`} element={<OrderOfGauntlet />} />
      <Route path={`the_emerald_enclave`} element={<EmeraldEnclave />} />
      <Route path={`the_lords_alliance`} element={<LordsAlliance />} />
      <Route path={`the_zhentarim`} element={<Zhentarim />} />
      <Route path={`others`} element={<Others />} />
    </Routes>
  )
}

export default Scene
