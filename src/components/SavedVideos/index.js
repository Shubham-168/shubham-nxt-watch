import {HiFire} from 'react-icons/hi'
import Header from '../Header'
import Sidebar from '../Sidebar'
import VideoCard from '../VideoCard'
import NxtContext from '../../context/NxtContext'

const SavedVideos = () => (
  <NxtContext.Consumer>
    {value => {
      const {isDark, savedVideoList} = value

      const NoSaved = () => (
        <div className="flex flex-col items-center justify-center w-full h-full text-center p-6">
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
            alt="no saved videos"
            className="w-60 mb-4"
          />
          <h1
            className={`text-2xl font-semibold mb-2 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}
          >
            No saved videos found
          </h1>
          <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            You can save your videos while watching them
          </p>
        </div>
      )

      const List = () => (
        <div className="flex flex-col w-full">
          {/* Header Row */}
          <div
            className={`flex items-center gap-3 p-6 ${
              isDark ? 'bg-gray-800' : 'bg-gray-200'
            }`}
          >
            <div className="bg-red-100 text-red-600 p-3 rounded-full">
              <HiFire className="text-xl" />
            </div>
            <h1
              className={`text-2xl font-bold ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}
            >
              Saved Videos
            </h1>
          </div>

          {/* Video List */}
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 p-4">
            {savedVideoList.map(eachVideo => (
              <VideoCard
                key={eachVideo.id}
                videoDetails={eachVideo}
                isDark={isDark}
              />
            ))}
          </ul>
        </div>
      )

      return (
        <div className={`${isDark ? 'bg-gray-900' : 'bg-gray-100'}`}>
          <Header />

          {/* Push content below fixed header */}
          <div className="pt-16 flex">
            {/* Desktop sidebar (mobile handled by header’s hamburger) */}
            <Sidebar />

            {/* Main content: offset for desktop sidebar to avoid overlap */}
            <main
              className={`w-full md:ml-64 min-h-[calc(100vh-4rem)] overflow-y-auto`}
            >
              {savedVideoList.length > 0 ? <List /> : <NoSaved />}
            </main>
          </div>
        </div>
      )
    }}
  </NxtContext.Consumer>
)

export default SavedVideos
