import {Switch, Route, Redirect} from 'react-router-dom'
import {Component} from 'react'
import Cookies from 'js-cookie'

import NotFound from './Components/NotFound'
import BottomPlayer from './Components/BottomPlayer'
import PlayerSongContext from './Context/PlayerSongContext'
import Home from './Components/Home'
import Login from './Components/Login'
import ProtectedRoute from './Components/ProtectedRoute'
import SongDetails from './Components/SongDetails'
import GenreDetails from './Components/GenreDetails'
import NewReleaseDetails from './Components/NewReleaseDetails'

import './App.css'

class App extends Component {
  state = {
    playingTrackUrl: {},
    isPlaying: false,
    prevsong: '',
  }

  changeState = () => {
    const {isPlaying} = this.state
    this.setState({isPlaying: !isPlaying})
  }

  addingSong = allItems => {
    if (allItems !== null) {
      const {audioPlayer} = allItems
      const {isPlaying, prevsong} = this.state
      if (audioPlayer !== prevsong) {
        if (isPlaying) {
          this.setState({
            playingTrackUrl: allItems,
            isPlaying: !isPlaying,
            prevsong: audioPlayer,
          })
        } else {
          this.setState({playingTrackUrl: allItems, prevsong: audioPlayer})
        }
      }
    } else {
      this.setState(each => ({playingTrackUrl: each.playingTrackUrl}))
    }
  }

  render() {
    const {playingTrackUrl, isPlaying} = this.state
    const token = Cookies.get('jwt_token')
    let a
    if (token === undefined) {
      a = null
    } else {
      a = <BottomPlayer />
    }
    return (
      <PlayerSongContext.Provider
        value={{
          playingTrackUrl,
          onClickAddTrack: this.addingSong,
          isPlaying,
          changeState: this.changeState,
        }}
      >
        <div>{Object.keys(playingTrackUrl).length > 0 ? a : null}</div>
        <Switch>
          <ProtectedRoute exact path='/' component={Home} />
          <Route exact path='/login' component={Login} />
          <ProtectedRoute exact path='/song/:id' component={SongDetails} />
          <ProtectedRoute
            exact
            path='/song/genres/:id'
            component={GenreDetails}
          />
          <Route
            exact
            path='/song/newrelease/:id'
            component={NewReleaseDetails}
          />
          <ProtectedRoute path='/notfound' component={NotFound} />
          <Redirect to='/notfound' />
        </Switch>
      </PlayerSongContext.Provider>
    )
  }
}

export default App
