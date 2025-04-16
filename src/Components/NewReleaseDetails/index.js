import {Component} from 'react'
import Cookies from 'js-cookie'

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
  progress: 'PROGRESS',
}

class NewReleaseDetails extends Component {
  state = {newreleaseList: {}, apiStatusView: apiStatus.initial}

  componentDidMount() {
    this.getDetails()
  }

  navigating = () => {
    const {history} = this.props
    history.push('/')
  }

  getDetails = async () => {
    this.setState({apiStatusView: apiStatus.progress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const token = Cookies.get('jwt_token')

    const url = `https://apis2.ccbp.in/spotify-clone/album-details/${id}`
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

      const albumName = data.name
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

      const updtatedData = {
        imageUrl: data.images[0].url,
        subPara: data.label,
        name: result1,
        popularity: data.popularity,
        artist: data.artists[0].name,
        tracksList: data.tracks.items.map((each, index) => {
          const minutes = Math.floor(each.duration_ms / 60000)
          const seconds = Math.floor((each.duration_ms % 60000) / 1000)

          const originalAlbumName = each.name
          let extractedResult

          const quotedSegmentMatch = originalAlbumName.match(/"(.*?)"/) // Match text inside double quotes
          if (quotedSegmentMatch) {
            const quotedSegment = quotedSegmentMatch[1]
            const dashPosition = quotedSegment.indexOf('-')
            if (dashPosition !== -1) {
              extractedResult = quotedSegment.substring(0, dashPosition).trim() // Extract text before the dash
            } else {
              extractedResult = quotedSegment.trim() // Use the full quoted text
            }
          } else {
            const parenthesisPosition = originalAlbumName.indexOf('(')
            const bracketPosition = originalAlbumName.indexOf('[')
            let cutoffPosition

            if (parenthesisPosition !== -1 && bracketPosition !== -1) {
              cutoffPosition = Math.min(parenthesisPosition, bracketPosition)
            } else if (parenthesisPosition !== -1) {
              cutoffPosition = parenthesisPosition
            } else if (bracketPosition !== -1) {
              cutoffPosition = bracketPosition
            } else {
              cutoffPosition = -1 // No parenthesis or bracket found
            }

            if (cutoffPosition !== -1) {
              extractedResult = originalAlbumName
                .substring(0, cutoffPosition)
                .trim() // Extract text before cutoff
            } else {
              extractedResult = originalAlbumName.trim() // Use the full album name
            }
          }

          return {
            duration: `${String(minutes).padStart(2, '0')}:${String(
              seconds,
            ).padStart(2, '0')}`,
            audioPlayer: each.preview_url,
            track: extractedResult,
            trackNo: index + 1,
            imgUrl: data.images[0].url,
            artist: each.artists[each.artists.length - 1].name,
          }
        }),
      }
      this.setState({
        newreleaseList: updtatedData,
        apiStatusView: apiStatus.success,
      })
    } else {
      this.setState({apiStatusView: apiStatus.failure})
    }
  }

  renderSuccessView = () => (
    <PlayerSongContext.Consumer>
      {value => {
        const {newreleaseList} = this.state
        const {imageUrl, name, subPara, tracksList} = newreleaseList
        const {onClickAddTrack} = value

        const clickedEvent = url => {
          onClickAddTrack(url)
        }

        return (
          <div
            data-testid="newreleaseDetailsContainer"
            className="newreleaseDetails-Container"
          >
            <button onClick={this.navigating} type="button" className="backed">
              <IoMdArrowRoundBack className="icn" />
              <p>Back</p>
            </button>
            <div
              data-testid="detailsSubmainContainer"
              className="detailsSubmain-Container"
            >
              <img alt="detailing" src={imageUrl} />
              <div data-testid="sideContent" className="sideContent-container">
                <p className="editHead">New Releases</p>
                <h1 className="mainhead">{name}</h1>
                <p className="subpara">{subPara}</p>
              </div>
            </div>
            <div className="playingList">
              <ul className="tabletopcontent">
                <li>{}</li>
                <li>Track</li>

                <li>Time</li>

                <li>Popularity</li>
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
                  <li>{each.duration}</li>
                  <li className="progressMobile">
                    <div className="progress-4">{}</div>
                  </li>
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
    const {apiStatusView} = this.state

    let a

    switch (apiStatusView) {
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

export default NewReleaseDetails
