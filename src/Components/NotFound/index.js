import {Link} from 'react-router-dom'

import './index.css'

const NotFound = () => (
  <div data-testid="LoadingView" className="LoadingView">
    <img
      alt="page not found"
      src="https://res.cloudinary.com/diptulwgs/image/upload/v1744777607/first%20project/404_1_hytesj.png"
    />
    <p className="para">PAGE NOT FOUND</p>
    <Link to="/">
      <button className="sova" type="button">
        Home Page
      </button>
    </Link>
  </div>
)

export default NotFound
