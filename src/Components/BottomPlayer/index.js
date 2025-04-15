import React, {Component} from 'react'

import {FaPlay, FaPause} from 'react-icons/fa'
import {IoMdVolumeHigh, IoMdVolumeLow, IoMdVolumeOff} from 'react-icons/io'

import Cookies from 'js-cookie'
import PlayerSongContext from '../../Context/PlayerSongContext'

import './index.css'

class BottomPlayer extends Component {
  state = {progress: 0, duration: 0, volume: 100}

  audioRef = React.createRef()

  componentDidMount() {
    this.audioRef.current.addEventListener(
      'loadedmetadata',
      this.handleLoadedMetadata,
    )
    this.audioRef.current.addEventListener('timeupdate', this.handleTimeUpdate)
  }

  componentWillUnmount() {
    this.audioRef.current.removeEventListener(
      'loadedmetadata',
      this.handleLoadedMetadata,
    )
    this.audioRef.current.removeEventListener(
      'timeupdate',
      this.handleTimeUpdate,
    )
  }

  handleLoadedMetadata = () => {
    const {duration} = this.audioRef.current
    this.setState({duration})
  }

  handleTimeUpdate = () => {
    const {currentTime, duration} = this.audioRef.current || {
      currentTime: 0,
      duration: 1,
    }
    const progress = (currentTime / duration) * 100

    // Dynamically update the CSS variable for progress width
    const progressBar = document.querySelector('.progressBar')
    if (progressBar) {
      progressBar.style.setProperty('--seek-before-width', `${progress}%`)
    }

    this.setState({progress})
  }

  handleVolumeChange = e => {
    const volume = e.target.value
    this.audioRef.current.volume = volume / 100 // Set audio volume
    this.setState({volume})
  }

  renderVolumeIcon = () => {
    const {volume} = this.state

    if (volume === 0) return <IoMdVolumeOff size={20} />
    if (volume < 50) return <IoMdVolumeLow size={20} />
    return <IoMdVolumeHigh className="cstmvlm" size={20} />
  }

  formatTime = time => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    const formattedMinutes = minutes.toString().padStart(2, '0')
    const formattedSeconds = seconds.toString().padStart(2, '0')
    return `${formattedMinutes}:${formattedSeconds}`
  }

  render() {
    return (
      <PlayerSongContext.Consumer>
        {value => {
          const {progress, duration, volume} = this.state
          const {playingTrackUrl, isPlaying, changeState} = value
          const {artist, audioPlayer, imgUrl, track} = playingTrackUrl

          const clickchanging = () => {
            if (isPlaying) {
              this.audioRef.current.pause()
            } else {
              this.audioRef.current.play()
            }
            changeState(audioPlayer)
          }

          console.log(progress)

          const token = Cookies.get('jwt_token')
          if (token === undefined) {
            return null
          }
          return (
            <div className="trackDiv">
              <div className="subTrackDiv">
                <img
                  className="playingImg"
                  src={imgUrl}
                  alt="Track Thumbnail"
                />
                <div className="trackdetails">
                  <p className="songNameheading">{track}</p>
                  <p className="songNamepara">{artist}</p>
                </div>
              </div>
              <div className="trackDiv2">
                <audio ref={this.audioRef} src={audioPlayer} preload="metadata">
                  <track
                    src="captions_en.vtt"
                    kind="captions"
                    label="English Captions"
                  />
                </audio>
                <button
                  className="custombtn"
                  onClick={clickchanging}
                  type="button"
                >
                  {isPlaying ? (
                    <FaPause className="pauseStyle" />
                  ) : (
                    <FaPlay className="playStyle" />
                  )}
                </button>
                <p className="timeduration">
                  {this.formatTime(this.audioRef.current?.currentTime || 0)} /{' '}
                  {this.formatTime(duration)}
                </p>
                <div>
                  <input
                    type="range"
                    className="progressBar"
                    min="0"
                    max="100"
                    /* eslint-disable-next-line no-unneeded-ternary */
                    value={progress ? progress : 0}
                    onChange={e => {
                      const newTime = (e.target.value / 100) * duration
                      this.audioRef.current.currentTime = newTime
                      this.setState({progress: e.target.value})
                    }}
                  />
                </div>
              </div>
              <div className="volumeControl">
                <button type="button" className="volumeIcon">
                  {this.renderVolumeIcon()}
                </button>
                <input
                  type="range"
                  className="volumeSlider"
                  min="0"
                  max="100"
                  value={volume}
                  onChange={this.handleVolumeChange}
                />
              </div>
            </div>
          )
        }}
      </PlayerSongContext.Consumer>
    )
  }
}

export default BottomPlayer
