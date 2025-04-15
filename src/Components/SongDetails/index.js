import {Component} from 'react'
import {withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import moment from 'moment'

import {IoMdArrowRoundBack} from 'react-icons/io'

import {BsFillExclamationTriangleFill} from 'react-icons/bs'

import Loading from '../Loading'
import PlayerSongContext from '../../Context/PlayerSongContext'

import Header from '../Header'

import './index.css'

const apiStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  progess: 'PROGRESS',
}

class SongDetails extends Component {
  state = {EditorsPicklistSongs: {}, apistatusView: apiStatus.initial}

  componentDidMount() {
    this.getDetails()
  }

  getDetails = async () => {
    this.setState({apistatusView: apiStatus.progress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis2.ccbp.in/spotify-clone/playlists-details/${id}`
    const token = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      console.log(data)
      const updatedpicks = {
        imgUrl: data.images[0].url,
        name: data.name,
        id: data.id,
        subPara: data.description.substring(0, data.description.indexOf('.')),
        tracksList: data.tracks.items.map((each, index) => {
          const x = moment()
          const y = moment(each.added_at)
          const duration = moment.duration(x.diff(y))
          const years = duration.years()
          const months = duration.months()
          const days = duration.days()
          let publishedDate
          if (years > 0) {
            publishedDate = `${years} years ago`
          } else if (months > 0) {
            publishedDate = `${months} months ago`
          } else {
            publishedDate = `${days} days ago`
          }

          const trackName = each.track.name
          const dashPosition = trackName.indexOf('-') // Renamed from 'dashIndex' to 'dashPosition'
          const parenthesisPosition = trackName.indexOf('(') // Renamed from 'parenthesisIndex'
          const bracketPosition = trackName.indexOf('[') // Renamed from 'bracketIndex'

          const cutoffPosition = Math.min(
            parenthesisPosition !== -1 ? parenthesisPosition : Infinity,
            bracketPosition !== -1 ? bracketPosition : Infinity,
            dashPosition !== -1 ? dashPosition : Infinity,
          )

          const result =
            cutoffPosition !== Infinity
              ? trackName.substring(0, cutoffPosition).trim()
              : trackName.trim()

          const minutes = Math.floor(each.track.duration_ms / 60000)
          const seconds = Math.floor((each.track.duration_ms % 60000) / 1000)

          const albumName = each.track.album.name
          let result1

          const quoteMatch = albumName.match(/"(.*?)"/) // Match text inside double quotes
          if (quoteMatch) {
            const quotedText = quoteMatch[1]
            const dashIndex = quotedText.indexOf('-')
            if (dashIndex !== -1) {
              result1 = quotedText.substring(0, dashIndex).trim() // Extract text before the dash
            } else {
              result1 = quotedText.trim() // Use the full quoted text
            }
          } else {
            const firstParenthesisIndex = albumName.indexOf('(')
            const firstBracketIndex = albumName.indexOf('[')
            let cutoffIndex

            if (firstParenthesisIndex !== -1 && firstBracketIndex !== -1) {
              cutoffIndex = Math.min(firstParenthesisIndex, firstBracketIndex)
            } else if (firstParenthesisIndex !== -1) {
              cutoffIndex = firstParenthesisIndex
            } else if (firstBracketIndex !== -1) {
              cutoffIndex = firstBracketIndex
            } else {
              cutoffIndex = -1 // No parenthesis or bracket found
            }

            if (cutoffIndex !== -1) {
              result1 = albumName.substring(0, cutoffIndex).trim() // Extract text before cutoff
            } else {
              result1 = albumName.trim() // Use the full album name
            }
          }

          return {
            addedAt: publishedDate,
            track: result,
            duration: `${String(minutes).padStart(2, '0')}:${String(
              seconds,
            ).padStart(2, '0')}`,
            popularity: each.track.popularity,
            album: result1,
            artist: each.track.artists[0].name,
            audioPlayer: each.track.preview_url,
            trackNo: index + 1,
            imgUrl: each.track.album.images[1].url,
          }
        }),
      }
      this.setState({
        EditorsPicklistSongs: updatedpicks,
        apistatusView: apiStatus.success,
      })
    }
  }

  clickedback = () => {
    const {history} = this.props
    history.push('/')
  }

  renderSuccessView = () => (
    <PlayerSongContext.Consumer>
      {value => {
        const {onClickAddTrack} = value
        const {EditorsPicklistSongs} = this.state
        const {imgUrl, name, subPara, tracksList} = EditorsPicklistSongs

        const clickedEvent = url => {
          onClickAddTrack(url)
        }
        return (
          <div className="detailsSong-container">
            <button
              onClick={this.clickedback}
              type="button"
              className="navigatebackcontainer"
            >
              <IoMdArrowRoundBack className="icn" />
              <p>Back</p>
            </button>
            <div className="detailsSubmainContainer">
              <img alt="detailing" src={imgUrl} />
              <div className="sideContent">
                <p className="editHead">Editor&apos;s picks</p>
                <h1 className="mainhead">{name}</h1>
                <p className="subpara">{subPara}</p>
              </div>
            </div>
            <div className="playingList">
              <ul className="tabletopcontent">
                <li>{}</li>
                <li>Track</li>
                <li>Album</li>
                <li>Time</li>
                <li>Artist</li>
                <li>Added</li>
              </ul>
              <hr className="mobileHrVanish" />

              {tracksList.map(each => (
                <ul
                  onClick={() => clickedEvent(each)}
                  key={each.trackNo}
                  className="tabletopcontent1"
                >
                  <li className="trackNoEached">{each.trackNo}</li>
                  <li className="trackEached">
                    {each.track}
                    <div className="mobiledownPart">
                      <p>{each.artist}</p>
                    </div>
                  </li>
                  <li className="albumEached">{each.album}</li>
                  <li className="durationEached">{each.duration}</li>
                  <li className="artistEached">{each.artist}</li>
                  <li className="added_atEached">{each.addedAt}</li>
                </ul>
              ))}
            </div>
          </div>
        )
      }}
    </PlayerSongContext.Consumer>
  )

  renderfailureView = () => (
    <div className="failurecontainer wala">
      <div className="tada">
        <BsFillExclamationTriangleFill className="failureicn" />
        <p>Something went wrong. Please try again</p>
        <button onClick={() => this.getDetails()} type="button">
          Try Again
        </button>
      </div>
    </div>
  )

  render() {
    const {apistatusView} = this.state

    let a

    switch (apistatusView) {
      case apiStatus.success:
        a = this.renderSuccessView()
        break
      case apiStatus.progress:
        a = <Loading />
        break
      case apiStatus.failure:
        a = this.renderfailureView()
        break
      default:
        a = null
    }

    return (
      <div className="main">
        <div className="desktopOnly">
          <Header />
        </div>

        {a}
      </div>
    )
  }
}

export default withRouter(SongDetails)
