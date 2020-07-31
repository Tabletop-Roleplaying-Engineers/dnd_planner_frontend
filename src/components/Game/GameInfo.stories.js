import React from 'react'
import { GameInfo } from './GameInfo'
import { Providers } from 'utils/stories'

export default {
  title: 'GameInfo',
}

const game = {
  characters: [],
  tags: [],
}

export const Default = () => (
  <Providers>
    <GameInfo game={game} />
  </Providers>
)
