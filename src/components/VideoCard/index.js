import {Link} from 'react-router-dom'

const VideoCard = ({videoDetails, isDark, variant = 'home'}) => {
  const {
    id,
    title,
    thumbnailUrl,
    channelName,
    channelProfileUrl,
    viewCount,
    publishedAt,
  } = videoDetails

  const containerClasses =
    variant === 'saved'
      ? 'flex flex-col sm:flex-row gap-4'
      : 'flex flex-col gap-2'

  const thumbnailClasses =
    variant === 'saved'
      ? 'w-full sm:w-60 h-auto rounded-lg object-cover'
      : 'w-full rounded-lg'

  return (
    <li className="list-none">
      <Link to={`/videos/${id}`} className="block">
        <div className={`video-card ${containerClasses}`}>
          {/* Thumbnail */}
          <img
            src={thumbnailUrl}
            alt="video thumbnail"
            className={thumbnailClasses}
          />

          {/* Details */}
          <div className="flex flex-col gap-2">
            {variant === 'home' && (
              <div className="flex gap-3 items-start">
                <p
                  className={`font-semibold text-sm leading-snug ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  {title}
                </p>
              </div>
            )}

            {variant === 'saved' && (
              <p
                className={`font-semibold text-sm leading-snug ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}
              >
                {title}
              </p>
            )}

            <p className="text-xs text-gray-500">{channelName}</p>
            <p className="text-xs text-gray-500">
              {viewCount} views • {publishedAt}
            </p>
          </div>
        </div>
      </Link>
    </li>
  )
}

export default VideoCard
