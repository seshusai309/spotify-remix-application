import {Component} from 'react'
import Cookies from 'js-cookie'

import {Bars} from 'react-loader-spinner'

import Header from '../Header'
import SongicnCard from '../SongicnCard'

import './index.css'

const apiStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  progess: 'PROGRESS',
}

class Home extends Component {
  state = {
    api1StatusView: apiStatus.initial,
    api2StatusView: apiStatus.initial,
    api3StatusView: apiStatus.initial,
    editorsPickList: {listed: [], type: ''},
    genresMoodList: {listed: [], type: ''},
    newReleases: {listed: [], type: ''},
  }

  componentDidMount() {
    this.getDetials()
  }

  getDetials = async () => {
    this.setState({
      api1StatusView: apiStatus.progess,
      api2StatusView: apiStatus.progess,
      api3StatusView: apiStatus.progess,
    })
    const url1 = 'https://apis2.ccbp.in/spotify-clone/featured-playlists'
    const url2 = 'https://apis2.ccbp.in/spotify-clone/categories'
    const url3 = 'https://apis2.ccbp.in/spotify-clone/new-releases'

    const token = Cookies.get('jwt_token')

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response1 = await fetch(url1, options)
    const response2 = await fetch(url2, options)
    const response3 = await fetch(url3, options)

    if (response1.ok) {
      const data1 = await response1.json()

      const updatedData1 = data1.playlists.items.map(each => ({
        name: each.name,
        id: each.id,
        imgUrl: each.images[0].url,
      }))
      this.setState({
        editorsPickList: {listed: updatedData1, type: 'firstPick'},
        api1StatusView: apiStatus.success,
      })
    }

    if (response2.ok) {
      const data2 = await response2.json()

      const updatedData2 = data2.categories.items.map(each => ({
        name: each.name,
        id: each.id,
        imgUrl: each.icons[0].url,
      }))
      this.setState({
        genresMoodList: {listed: updatedData2, type: 'secondPick'},
        api2StatusView: apiStatus.success,
      })
    }

    if (response3.ok) {
      const data3 = await response3.json()

      const updatedData3 = data3.albums.items.map(each => ({
        name: each.name,
        id: each.id,
        imgUrl: each.images[1].url,
      }))
      this.setState({
        newReleases: {listed: updatedData3, type: 'thirdPick'},
        api3StatusView: apiStatus.success,
      })
    }
  }

  renderEditorsList = () => {
    const {editorsPickList} = this.state
    return (
      <div data-testid="editorcontainer" className="editor-container">
        <h1>Editor’s picks</h1>
        <ul className="unorderlist">
          {editorsPickList.listed.map(each => (
            <SongicnCard
              altingValue="featured playlist"
              type={editorsPickList.type}
              key={each.id}
              songsdetails={each}
            />
          ))}
        </ul>
      </div>
    )
  }

  renderGenresList = () => {
    const {genresMoodList} = this.state
    return (
      <div data-testid="editorcontainer" className="editor-container">
        <h1>Genres & Moods</h1>
        <ul className="unorderlist">
          {genresMoodList.listed.map(each => (
            <SongicnCard
              altingValue="category"
              type={genresMoodList.type}
              key={each.id}
              songsdetails={each}
            />
          ))}
        </ul>
      </div>
    )
  }

  renderNewReleaseList = () => {
    const {newReleases} = this.state
    return (
      <div data-testid="editorcontainer" className="editor-container">
        <h1>New releases</h1>
        <ul className="unorderlist">
          {newReleases.listed.map(each => (
            <SongicnCard
              altingValue="new release album"
              type={newReleases.type}
              key={each.id}
              songsdetails={each}
            />
          ))}
        </ul>
      </div>
    )
  }

  renderfailureView = () => (
    <div data-testid="failurecontainer" className="failurecontainer">
      <div className="insideCardfailure">
        <img
          alt="failure view"
          className="failureicn"
          src="https://res.cloudinary.com/diptulwgs/image/upload/v1744777620/first%20project/Icon_vy3pcg.png"
        />
        <p>Something went wrong. Please try again</p>
        <button onClick={() => this.getDetials()} type="button">
          Try Again
        </button>
      </div>
    </div>
  )

  renderLoadingView = () => (
    <div>
      <div className="failurecontainer">
        <div className="insideLoadingView">
          <Bars
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="bars-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
          <p>Loading...</p>
        </div>
      </div>
    </div>
  )

  render() {
    const {api3StatusView, api1StatusView, api2StatusView} = this.state
    let a
    let b
    let c

    switch (api1StatusView) {
      case apiStatus.progess:
        a = this.renderLoadingView()
        break
      case apiStatus.success:
        a = this.renderEditorsList()
        break
      case apiStatus.failure:
        a = this.renderfailureView()
        break
      default:
        a = null
    }

    // Show genres list or failure
    switch (api2StatusView) {
      case apiStatus.progess:
        b = this.renderLoadingView()
        break
      case apiStatus.success:
        b = this.renderGenresList()
        break
      case apiStatus.failure:
        b = this.renderfailureView()
        break
      default:
        b = null
    }

    // Show new releases or failure
    switch (api3StatusView) {
      case apiStatus.progess:
        c = this.renderLoadingView()
        break
      case apiStatus.success:
        c = this.renderNewReleaseList()
        break
      case apiStatus.failure:
        c = this.renderfailureView()
        break
      default:
        c = null
    }

    return (
      <div>
        <Header />
        <div data-testid="homecontainer" className="home-container">
          {a}
          {b}
          {c}
        </div>
      </div>
    )
  }
}

export default Home
