import {Link} from 'react-router-dom'

import './index.css'

const SongicnCard = props => {
  const {songsdetails, type, altingValue} = props
  const {name, id, imgUrl} = songsdetails
  const trackName = name

  const dashPosition = trackName.indexOf('-')
  const parenthesisPosition = trackName.indexOf('(')
  const bracketPosition = trackName.indexOf('[')

  const cutoffPosition = Math.min(
    parenthesisPosition !== -1 ? parenthesisPosition : Infinity,
    bracketPosition !== -1 ? bracketPosition : Infinity,
    dashPosition !== -1 ? dashPosition : Infinity,
  )

  const result =
    cutoffPosition !== Infinity
      ? trackName.substring(0, cutoffPosition).trim()
      : trackName.trim()

  let paths
  switch (type) {
    case 'firstPick':
      paths = `/playlist/${id}`
      break
    case 'secondPick':
      paths = `/category/${id}/playlists`
      break
    default:
      paths = `/album/${id}`
  }

  return (
    <Link to={paths}>
      <li data-testid="songCardcontainer" className="songCard-container">
        <img alt={altingValue} src={imgUrl} />
        <h1>{result}</h1>
      </li>
    </Link>
  )
}

export default SongicnCard
