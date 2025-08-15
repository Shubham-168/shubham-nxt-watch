import {Link, useLocation} from 'react-router-dom'
import {FaTimes, FaHome, FaFire, FaGamepad, FaSave} from 'react-icons/fa'
import NxtContext from '../../context/NxtContext'

/**
 * Desktop: persistent, fixed sidebar (hidden on small screens).
 * Mobile (optional): pass isMobile + isOpen + closeSidebar to show an overlay drawer.
 */
const Sidebar = ({isMobile = false, isOpen = false, closeSidebar = () => {}}) => {
  const location = useLocation()

  const NavLinks = ({isDark, onItemClick = () => {}}) => {
    const linkBase =
      'flex items-center gap-3 p-3 rounded-md transition-colors duration-200'
    const activeBg = isDark ? 'bg-gray-700' : 'bg-gray-200'
    const hoverBg = isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-200'
    const activeAccent = 'border-l-4 border-red-600 font-semibold'

    const link = (to, label, Icon) => {
      const isActive = location.pathname === to
      return (
        <Link
          to={to}
          onClick={onItemClick}
          className={`${linkBase} ${isActive ? `${activeBg} ${activeAccent}` : hoverBg}`}
        >
          <Icon /> {label}
        </Link>
      )
    }

    return (
      <nav className="flex-1 flex flex-col px-4 space-y-4">
        {link('/', 'Home', FaHome)}
        {link('/trending', 'Trending', FaFire)}
        {link('/gaming', 'Gaming', FaGamepad)}
        {link('/saved-videos', 'Saved Videos', FaSave)}
      </nav>
    )
  }

  return (
    <NxtContext.Consumer>
      {value => {
        const {isDark} = value

        /* Desktop: fixed, persistent, hidden on small screens */
        const desktop = (
          <aside
            className={`hidden md:flex fixed left-0 top-16 bottom-0 w-64 
            ${isDark ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}
            border-r border-gray-300 z-30`}
          >
            <div className="flex flex-col justify-between w-full">
              <NavLinks isDark={isDark} />
              <div className="p-6">
                <p className="mb-2 font-semibold text-sm">CONTACT US</p>
                <div className="flex items-center space-x-3 mb-4">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
                    alt="facebook logo"
                    className="w-6 h-6"
                  />
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
                    alt="twitter logo"
                    className="w-6 h-6"
                  />
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
                    alt="linked in logo"
                    className="w-6 h-6"
                  />
                </div>
                <p className="text-xs">
                  Enjoy! Now to see your channels and recommendations!
                </p>
              </div>
            </div>
          </aside>
        )

        /* Mobile (optional): slide-in drawer + overlay; closes when a link is clicked */
        const mobile =
          isMobile && (
            <>
              <div
                onClick={closeSidebar}
                className={`fixed inset-0 bg-black/40 md:hidden transition-opacity z-40 ${
                  isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
                }`}
              />
              <aside
                className={`fixed top-0 left-0 h-full w-64 md:hidden z-50 transform transition-transform
                ${isOpen ? 'translate-x-0' : '-translate-x-full'}
                ${isDark ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}
                border-r border-gray-300`}
              >
                <div className="flex justify-end p-4">
                  <button onClick={closeSidebar}>
                    <FaTimes className="text-xl" />
                  </button>
                </div>
                <div className="flex flex-col justify-between h-[calc(100%-4rem)]">
                  <NavLinks isDark={isDark} onItemClick={closeSidebar} />
                  <div className="p-6">
                    <p className="mb-2 font-semibold text-sm">CONTACT US</p>
                    <div className="flex items-center space-x-3 mb-4">
                      <img
                        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
                        alt="facebook logo"
                        className="w-6 h-6"
                      />
                      <img
                        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
                        alt="twitter logo"
                        className="w-6 h-6"
                      />
                      <img
                        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
                        alt="linked in logo"
                        className="w-6 h-6"
                      />
                    </div>
                    <p className="text-xs">
                      Enjoy! Now to see your channels and recommendations!
                    </p>
                  </div>
                </div>
              </aside>
            </>
          )

        return (
          <>
            {desktop}
            {mobile}
          </>
        )
      }}
    </NxtContext.Consumer>
  )
}

export default Sidebar
