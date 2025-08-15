// Home.jsx (updated - only this file changed)
import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {FaSearch} from 'react-icons/fa'
import Header from '../Header'
import Sidebar from '../Sidebar'
import VideoCard from '../VideoCard'
import NxtContext from '../../context/NxtContext'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  in_progress: 'IN_PROGRESS',
  no_result: 'NO_RESULT',
}

class Home extends Component {
  state = {
    homeDataList: [],
    searchInput: '',
    apiStatus: apiStatusConstants.initial,
    showBanner: true,
  }

  componentDidMount() {
    this.getHomeVideos()
  }

  getHomeVideos = async () => {
    this.setState({apiStatus: apiStatusConstants.in_progress})
    const {searchInput} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/videos/all?search=${searchInput}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.videos.map(eachVideo => ({
        id: eachVideo.id,
        title: eachVideo.title,
        thumbnailUrl: eachVideo.thumbnail_url,
        channelName: eachVideo.channel.name,
        channelProfileUrl: eachVideo.channel.profile_image_url,
        viewCount: eachVideo.view_count,
        publishedAt: eachVideo.published_at,
      }))

      if (updatedData.length < 1) {
        this.setState({apiStatus: apiStatusConstants.no_result})
      }

      this.setState({
        homeDataList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  closeBanner = () => this.setState({showBanner: false})

  onRetry = () => {
    this.getHomeVideos()
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onClickedSearch = () => {
    this.getHomeVideos()
  }

  renderLoaderView = () => (
    <div className="flex justify-center items-center h-64" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderFailureView = isDark => {
    const failureUrl = isDark
      ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png'
    return (
      <div className="flex flex-col items-center text-center p-6">
        <img src={failureUrl} alt="failure view" className="mb-4 w-64" />
        <h1
          className={`${
            isDark ? 'text-white' : 'text-gray-900'
          } text-lg font-semibold`}
        >
          Oops! Something Went Wrong
        </h1>
        <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} mb-4`}>
          We are having some trouble to complete your request. Please try again.
        </p>
        <button
          type="button"
          onClick={this.onRetry}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Retry
        </button>
      </div>
    )
  }

  renderSuccessView = isDark => {
    const {homeDataList} = this.state

    return (
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {homeDataList.map(eachVideo => (
          <VideoCard
            key={eachVideo.id}
            videoDetails={eachVideo}
            isDark={isDark}
            variant="home"
          />
        ))}
      </ul>
    )
  }

  renderNoResultView = isDark => (
    <div className="flex flex-col items-center text-center p-6">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
        alt="no videos"
        className="mb-4 w-64"
      />
      <h1
        className={`${
          isDark ? 'text-white' : 'text-gray-900'
        } text-lg font-semibold`}
      >
        No Search results found
      </h1>
      <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} mb-4`}>
        Try different keywords or remove search filter
      </p>
      <button
        type="button"
        onClick={this.onRetry}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Retry
      </button>
    </div>
  )

  renderResult = isDark => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.in_progress:
        return this.renderLoaderView()
      case apiStatusConstants.success:
        return this.renderSuccessView(isDark)
      case apiStatusConstants.failure:
        return this.renderFailureView(isDark)
      case apiStatusConstants.no_result:
        return this.renderNoResultView(isDark)
      default:
        return null
    }
  }

  render() {
    const {showBanner, searchInput} = this.state
    return (
      <NxtContext.Consumer>
        {value => {
          const {isDark} = value
          return (
            <div
              className={`${
                isDark ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'
              } min-h-screen flex flex-col`}
            >
              {/* fixed header */}
              <Header />

              {/* flex container: sidebar is fixed, main is scrollable */}
              {/* NOTE: min-h-0 is important so children with overflow work correctly */}
              <div className="flex flex-1 min-h-0">
                {/* Sidebar (fixed) - still hidden on mobile */}
                <div className="hidden md:block">
                  <Sidebar />
                </div>

                {/* Main: keep mt-16 so it's below header, add md:ml-64 so it sits right of fixed sidebar */}
                <main className="flex-1 p-4 mt-16 mb-16 md:ml-64 overflow-y-auto">
                  {showBanner && (
                    <div
                      data-testid="banner"
                      style={{
                        backgroundImage: `url('https://assets.ccbp.in/frontend/react-js/nxt-watch-banner-bg.png')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                      }}
                      className={`flex flex-col sm:flex-row justify-between items-center gap-4 p-4 mb-4 rounded ${
                        isDark ? 'bg-gray-700' : 'bg-gray-200'
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                        <img
                          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                          alt="nxt watch logo"
                          className="w-32"
                        />
                        <p className="text-gray-600 text-center sm:text-left">
                          Buy Nxt Watch Premium
                        </p>
                        <button className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700">
                          GET IT NOW
                        </button>
                      </div>
                      <button
                        data-testid="close"
                        type="button"
                        onClick={this.closeBanner}
                        className="text-red-500 hover:text-red-700"
                      >
                        ✕
                      </button>
                    </div>
                  )}

                  {/* Search Bar */}
                  <div className="flex mb-4 gap-2 w-full">
                    <input
                      type="search"
                      id="searchId"
                      value={searchInput}
                      placeholder="Search"
                      onChange={this.onChangeSearchInput}
                      className={`flex-1 p-2 rounded border ${
                        isDark
                          ? 'bg-gray-800 text-white border-gray-600'
                          : 'bg-white text-gray-900 border-gray-300'
                      }`}
                    />
                    <button
                      data-testid="searchButton"
                      type="button"
                      onClick={this.onClickedSearch}
                      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center justify-center"
                    >
                      <FaSearch />
                    </button>
                  </div>

                  {this.renderResult(isDark)}
                </main>
              </div>
            </div>
          )
        }}
      </NxtContext.Consumer>
    )
  }
}

export default Home
