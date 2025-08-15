import Header from '../Header'
import Sidebar from '../Sidebar'

import NxtContext from '../../context/NxtContext'

const NotFound = () => (
  <NxtContext.Consumer>
    {value => {
      const {isDark} = value

      const renderNotFoundView = () => {
        const notFoundUrl = isDark
          ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-dark-theme-img.png'
          : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png'

        return (
          <div>
            <img src={notFoundUrl} alt="not found" />
            <h1 className={isDark ? 'dark-text' : 'light-text'}>
              {' '}
              Page Not Found{' '}
            </h1>
            <p className={isDark ? 'dark-text' : 'light-text'}>
              {' '}
              we are sorry, the page you requested could not be found.{' '}
            </p>
          </div>
        )
      }

      return (
        <div>
          <ul>
            <Header />
          </ul>
          <div
            className={
              isDark ? 'home-dark-main-container' : 'home-light-main-container'
            }
          >
            <Sidebar />
            {renderNotFoundView()}
          </div>
        </div>
      )
    }}
  </NxtContext.Consumer>
)

export default NotFound
