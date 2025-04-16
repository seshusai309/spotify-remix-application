import React from 'react'

const PlayerSongContext = React.createContext({
  playingTrackUrl: '',
  onClickAddTrack: () => {},
  isPlaying: false,
  changeState: () => {},
})

export default PlayerSongContext
