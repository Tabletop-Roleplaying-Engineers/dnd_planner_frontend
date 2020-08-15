import React from 'react'
import { GameInfo, ParticipantsList, GameParticipation } from 'components/Game'

export const FullGame = ({ game, user, onRemoveChar }) => {
  return (
    <>
      <GameInfo game={game} />
      <ParticipantsList
        characters={game.characters}
        game={game}
        user={user}
        onRemoveCharClick={char => onRemoveChar(char)}
      />
      {/* {game.characters.length < game.players && (
          <GameParticipation
            game={game}
            onParticipate={this.onParticipate}
            onLeave={() => this.fetchCurrentGame(game.id)}
          />
        )} */}
    </>
  )
}
