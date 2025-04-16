import {Bars} from 'react-loader-spinner'

import './index.css'

const Loading = () => (
  <div data-testid="LoadingView" className="LoadingView">
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
)

export default Loading
