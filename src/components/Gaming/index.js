import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {FaGamepad} from 'react-icons/fa'

import Header from '../Header'
import Sidebar from '../Sidebar'
import VideoCard from '../VideoCard'
import NxtContext from '../../context/NxtContext'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  in_progress: 'IN_PROGRESS',
}

class Gaming extends Component {
  state = {
    gameList: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getGamingVideos()
  }

  getGamingVideos = async () => {
    this.setState({apiStatus: apiStatusConstants.in_progress})
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/videos/gaming`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.videos.map(eachVideo => ({
        id: eachVideo.id,
        title: eachVideo.title,
        thumbnailUrl: eachVideo.thumbnail_url,
        viewCount: eachVideo.view_count,
      }))
      this.setState({
        gameList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onRetry = () => {
    this.getGamingVideos()
  }

  renderLoaderView = () => (
    <div
      className="flex justify-center items-center w-full h-64"
      data-testid="loader"
    >
      <Loader type="ThreeDots" color="#2563eb" height="50" width="50" />
    </div>
  )

  renderFailureView = isDark => {
    const failureUrl = isDark
      ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png'

    return (
      <div className="flex flex-col justify-center items-center text-center p-4">
        <img src={failureUrl} alt="failure view" className="w-60 md:w-80" />
        <h1
          className={`text-xl font-bold mt-4 ${
            isDark ? 'text-white' : 'text-gray-800'
          }`}
        >
          Oops! Something Went Wrong
        </h1>
        <p className={`mt-2 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
          We are having some trouble completing your request. Please try again.
        </p>
        <button
          type="button"
          onClick={this.onRetry}
          className="mt-4 bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition"
        >
          Retry
        </button>
      </div>
    )
  }

  renderSuccessView = isDark => {
    const {gameList} = this.state
    return (
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 p-4">
        {gameList.map(eachVideo => (
          <VideoCard
            key={eachVideo.id}
            videoDetails={eachVideo}
            isDark={isDark}
          />
        ))}
      </ul>
    )
  }

  renderResult = isDark => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.in_progress:
        return this.renderLoaderView()
      case apiStatusConstants.success:
        return this.renderSuccessView(isDark)
      case apiStatusConstants.failure:
        return this.renderFailureView(isDark)
      default:
        return null
    }
  }

  render() {
    return (
      <NxtContext.Consumer>
        {({isDark}) => (
          <div
            className={`flex flex-col min-h-screen ${
              isDark ? 'bg-gray-900' : 'bg-gray-100'
            }`}
          >
            <Header />
            <div className="flex flex-1">
              <div className="hidden md:block w-60">
                <Sidebar />
              </div>
              <main className="flex-1">
                <div
                  className={`flex items-center gap-3 p-4 ${
                    isDark ? 'bg-gray-800' : 'bg-gray-200'
                  }`}
                >
                  <FaGamepad
                    className={`text-2xl ${
                      isDark ? 'text-green-500' : 'text-green-600'
                    }`}
                  />
                  <h1
                    className={`text-2xl font-semibold ${
                      isDark ? 'text-white' : 'text-gray-900'
                    }`}
                  >
                    Gaming
                  </h1>
                </div>
                {this.renderResult(isDark)}
              </main>
            </div>
          </div>
        )}
      </NxtContext.Consumer>
    )
  }
}

export default Gaming
