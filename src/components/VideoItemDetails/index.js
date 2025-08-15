import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import ReactPlayer from 'react-player'
import {AiOutlineLike, AiOutlineDislike} from 'react-icons/ai'
import {MdPlaylistAdd} from 'react-icons/md'
import NxtContext from '../../context/NxtContext'
import Header from '../Header'
import Sidebar from '../Sidebar'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class VideoItemDetails extends Component {
  state = {
    videoData: null,
    apiStatus: apiStatusConstants.initial,
    isLiked: false,
    isDisliked: false,
  }

  componentDidMount() {
    this.getVideoData()
  }

  getVideoData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {match} = this.props
    const {id} = match.params
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/videos/${id}`
    const options = {
      headers: {Authorization: `Bearer ${jwtToken}`},
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()
      const videoDetails = data.video_details
      const updatedData = {
        id: videoDetails.id,
        title: videoDetails.title,
        videoUrl: videoDetails.video_url,
        thumbnailUrl: videoDetails.thumbnail_url,
        channel: {
          name: videoDetails.channel.name,
          profileImageUrl: videoDetails.channel.profile_image_url,
          subscriberCount: videoDetails.channel.subscriber_count,
        },
        viewCount: videoDetails.view_count,
        publishedAt: videoDetails.published_at,
        description: videoDetails.description,
      }
      this.setState({
        videoData: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onClickLike = () => {
    this.setState(prev => ({
      isLiked: !prev.isLiked,
      isDisliked: false,
    }))
  }

  onClickDislike = () => {
    this.setState(prev => ({
      isDisliked: !prev.isDisliked,
      isLiked: false,
    }))
  }

  renderLoader = () => (
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
          onClick={this.getVideoData}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Retry
        </button>
      </div>
    )
  }

  renderVideoDetails = (isDark, onSavingVideo, savedVideoList) => {
    const {videoData, isLiked, isDisliked} = this.state
    if (!videoData) return null

    const isAlreadySaved = savedVideoList.some(
      video => video.id === videoData.id,
    )

    const handleSave = () => {
      if (!isAlreadySaved) {
        onSavingVideo(videoData)
      }
    }

    return (
      <div className="flex flex-col gap-4">
        {/* Video Player */}
        <div className="w-full aspect-video bg-black">
          <ReactPlayer
            url={videoData.videoUrl}
            width="100%"
            height="100%"
            controls
          />
        </div>

        {/* Title */}
        <h1
          className={`${
            isDark ? 'text-white' : 'text-gray-900'
          } text-xl font-semibold`}
        >
          {videoData.title}
        </h1>

        {/* Views & Actions */}
        <div className="flex flex-wrap justify-between items-center gap-4 text-sm">
          <span className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            {videoData.viewCount} views • {videoData.publishedAt}
          </span>
          <div className="flex gap-4">
            <button
              onClick={this.onClickLike}
              className={`flex items-center gap-1 ${
                isLiked
                  ? 'text-blue-500'
                  : isDark
                  ? 'text-white'
                  : 'text-gray-700'
              }`}
            >
              <AiOutlineLike /> Like
            </button>
            <button
              onClick={this.onClickDislike}
              className={`flex items-center gap-1 ${
                isDisliked
                  ? 'text-blue-500'
                  : isDark
                  ? 'text-white'
                  : 'text-gray-700'
              }`}
            >
              <AiOutlineDislike /> Dislike
            </button>
            <button
              onClick={handleSave}
              className={`flex items-center gap-1 ${
                isAlreadySaved ? 'text-green-500' : ''
              }`}
            >
              <MdPlaylistAdd /> {isAlreadySaved ? 'Saved' : 'Save'}
            </button>
          </div>
        </div>

        <hr className={isDark ? 'border-gray-700' : 'border-gray-300'} />

        {/* Channel Info */}
        <div className="flex gap-4">
          <img
            src={videoData.channel.profileImageUrl}
            alt="channel logo"
            className="w-12 h-12 rounded-full"
          />
          <div>
            <p
              className={`${
                isDark ? 'text-white' : 'text-gray-900'
              } font-semibold`}
            >
              {videoData.channel.name}
            </p>
            <p
              className={`${
                isDark ? 'text-gray-400' : 'text-gray-600'
              } text-sm`}
            >
              {videoData.channel.subscriberCount} subscribers
            </p>
          </div>
        </div>

        {/* Description */}
        <p
          className={`${
            isDark ? 'text-gray-300' : 'text-gray-800'
          } whitespace-pre-line`}
        >
          {videoData.description}
        </p>
      </div>
    )
  }
  renderMainContent = (isDark, onSavingVideo, savedVideoList) => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      case apiStatusConstants.success:
        return this.renderVideoDetails(isDark, onSavingVideo, savedVideoList)
      case apiStatusConstants.failure:
        return this.renderFailureView(isDark)
      default:
        return null
    }
  }

  render() {
    return (
      <NxtContext.Consumer>
        {value => {
          const {isDark, onSavingVideo, savedVideoList} = value
          return (
            <div
              className={`${
                isDark ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'
              } min-h-screen flex flex-col`}
            >
              <Header />
              <div className="flex flex-1 min-h-0">
                <div className="hidden md:block">
                  <Sidebar />
                </div>
                {/* Main Content */}
                <main className="flex-1 p-4 mt-16 mb-16 md:ml-64 overflow-y-auto">
                  {this.renderMainContent(
                    isDark,
                    onSavingVideo,
                    savedVideoList,
                  )}
                </main>
              </div>
            </div>
          )
        }}
      </NxtContext.Consumer>
    )
  }
}

export default VideoItemDetails
