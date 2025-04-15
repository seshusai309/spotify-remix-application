import React from 'react'

const PlayerSongContext = React.createContext({
  playingTrackUrl: '',
  onClickAddTrack: () => {},
})

export default PlayerSongContext
