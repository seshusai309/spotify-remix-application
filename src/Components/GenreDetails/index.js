import {Component} from 'react'

import {withRouter} from 'react-router-dom'

import {BsFillExclamationTriangleFill} from 'react-icons/bs'

import Cookies from 'js-cookie'
import {IoMdArrowRoundBack} from 'react-icons/io'

import Loading from '../Loading'

import Header from '../Header'

import './index.css'

const apiStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  progress: 'PROGRESS',
}

class GenreDetails extends Component {
  state = {genresList: [], apiStatusView: apiStatus.initial}

  componentDidMount() {
    this.getDetails()
  }

  onclickgoback = () => {
    const {history} = this.props
    history.push('/')
  }

  getDetails = async () => {
    this.setState({apiStatusView: apiStatus.progress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const token = Cookies.get('jwt_token')
    const url = `https://apis2.ccbp.in/spotify-clone/category-playlists/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const data2 = data.playlists.items.filter(each => each != null)
      const updatedData = data2.map(each => ({
        imageUrl: each.images[0].url,
        name: each.name,
        totalTracks: each.tracks.total,
      }))
      this.setState({genresList: updatedData, apiStatusView: apiStatus.success})
    } else {
      this.setState({apiStatusView: apiStatus.failure})
    }
  }

  renderSuccessView = () => {
    const {genresList} = this.state
    return (
      <div data-testid="bgcontainer" className="bg-container">
        <button onClick={this.onclickgoback} type="button" className="cstm">
          <IoMdArrowRoundBack className="icn" />
          <p>Back</p>
        </button>
        <div data-testid="tadascontainer" className="tadas-container">
          <h1 className="headname">Podcast</h1>
          <ul className="ulwave">
            {genresList.map(each => (
              <li key={each.name}>
                <img alt="wala" src={each.imageUrl} />
                <h1 className="mobilegenre">{each.name}</h1>
                <p className="mobilegenrepara">{`Total Tracks ${each.totalTracks}`}</p>
                <div
                  data-testid="showinMobileView"
                  className="showin-MobileView"
                >
                  <h1 className="showin-MobileViewHead">{each.name}</h1>
                  <p>{`Total Tracks ${each.totalTracks}`}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }

  renderfailureView = () => (
    <div data-testid="failurecontainer" className="failurecontainer">
      <div data-testid="tadacontainer" className="tada-container">
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
      <div data-testid="maincontainer" className="main-container">
        <div data-testid="maintaincontainer" className="maintain-container">
          <Header />
        </div>
        {a}
      </div>
    )
  }
}

export default withRouter(GenreDetails)
