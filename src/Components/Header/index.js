import {Component} from 'react'
import Cookies from 'js-cookie'
import {withRouter} from 'react-router-dom'

import {IoMdLogOut} from 'react-icons/io'
import {VscThreeBars} from 'react-icons/vsc'

import './index.css'

class Header extends Component {
  state = {opend: true}

  onLogout = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/')
  }

  onclickedOpen = () => {
    this.setState(each => ({opend: !each.opend}))
  }

  render() {
    const {opend} = this.state
    let val
    if (opend) {
      val = 'present'
    } else {
      val = ''
    }

    return (
      <>
        <nav className="navbar">
          <img
            alt="logout"
            src="https://res.cloudinary.com/diptulwgs/image/upload/v1744454422/first%20project/music_vpkci1.png"
          />
          <div className="logout">
            <button onClick={this.onLogout} className="cstmBtn" type="button">
              <IoMdLogOut className="logouticn" />
              <p className="logout-para">logout</p>
            </button>
          </div>
        </nav>
        <nav className="MobileHeader">
          <div className="sub">
            <img
              alt="logout"
              src="https://res.cloudinary.com/diptulwgs/image/upload/v1744454422/first%20project/music_vpkci1.png"
            />
            <button onClick={this.onclickedOpen} type="button">
              <VscThreeBars className="cstmbar" />
            </button>
          </div>
          <div className={`cstmda ${val}`}>
            <hr />
            <button
              onClick={this.onLogout}
              className="cstmlogout"
              type="button"
            >
              Log out
            </button>
          </div>
        </nav>
      </>
    )
  }
}

export default withRouter(Header)
