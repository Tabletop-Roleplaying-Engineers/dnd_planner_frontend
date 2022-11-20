import React from 'react'
import { Route, RouteProps, Routes, Navigate } from 'react-router-dom'
import { CharacterPage } from './Character'

const Scene: React.FC<RouteProps> = () => {
  return (
    <Routes>
      <Route path={`:id`} element={<CharacterPage />} />
      <Route path={``} element={<Navigate to="/" />} />
    </Routes>
  )
}

export default Scene
