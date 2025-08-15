import {Link, NavLink, withRouter} from 'react-router-dom'
import React, {useState} from 'react'
import Popup from 'reactjs-popup'
import Cookies from 'js-cookie'
import {FaMoon, FaSun, FaBars, FaSignOutAlt} from 'react-icons/fa'
import {IoClose} from 'react-icons/io5'
import NxtContext from '../../context/NxtContext'

const Header = props => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const toggleMenu = () => setIsMenuOpen(prev => !prev)

  return (
    <NxtContext.Consumer>
      {value => {
        const {isDark, toggleDarkMode} = value

        const onToggleTheme = () => toggleDarkMode()

        const onLogout = () => {
          const {history} = props
          Cookies.remove('jwt_token')
          history.replace('/login')
        }

        const logoUrl = isDark
          ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
          : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'

        const menuLinks = [
          {name: 'Home', path: '/'},
          {name: 'Trending', path: '/trending'},
          {name: 'Gaming', path: '/gaming'},
          {name: 'Saved Videos', path: '/saved-videos'},
        ]

        return (
          <>
            <header
              className={`fixed top-0 left-0 right-0 z-20 flex items-center justify-between px-4 py-3 border-b ${
                isDark
                  ? 'bg-gray-900 border-gray-700'
                  : 'bg-white border-gray-200'
              }`}
            >
              {/* Left: Logo */}
              <Link to='/' className='flex items-center'>
                <img src={logoUrl} alt='website logo' className='h-8' />
              </Link>

              {/* Right */}
              <div className='flex items-center gap-4'>
                {/* Theme toggle */}
                <button
                  type='button'
                  onClick={onToggleTheme}
                  data-testid='theme'
                  className={`text-xl p-2 rounded-full ${
                    isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-200'
                  }`}
                  aria-label='Toggle theme'
                >
                  {isDark ? (
                    <FaSun className='text-white' />
                  ) : (
                    <FaMoon className='text-gray-800' />
                  )}
                </button>

                {/* Profile + Logout for large screens */}
                <div className='hidden md:flex items-center gap-4'>
                  <img
                    src='https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png'
                    alt='profile'
                    className='h-8 w-8 rounded-full'
                  />
                  <button
                    type='button'
                    onClick={onLogout}
                    className={`px-4 py-1 rounded border text-sm ${
                      isDark
                        ? 'border-white text-white hover:bg-gray-700'
                        : 'border-gray-800 text-gray-800 hover:bg-gray-100'
                    }`}
                  >
                    Logout
                  </button>
                </div>

                {/* Hamburger + Logout icon for small screens */}
                <div className='flex items-center gap-3 md:hidden'>
                  <button
                    type='button'
                    className='text-2xl'
                    onClick={toggleMenu}
                    aria-label='Open menu'
                  >
                    {isMenuOpen ? (
                      <IoClose
                        className={isDark ? 'text-white' : 'text-gray-800'}
                      />
                    ) : (
                      <FaBars
                        className={isDark ? 'text-white' : 'text-gray-800'}
                      />
                    )}
                  </button>
                  <button
                    type='button'
                    onClick={onLogout}
                    className={`text-xl ${
                      isDark
                        ? 'text-red-400 hover:text-red-500'
                        : 'text-red-500 hover:text-red-600'
                    }`}
                    aria-label='Logout'
                  >
                    <FaSignOutAlt />
                  </button>
                </div>
              </div>
            </header>

            {/* Dropdown menu for small screens */}
            {isMenuOpen && (
              <div
                className={`absolute top-14 right-4 w-52 rounded-md shadow-lg border py-2 z-50 md:hidden ${
                  isDark
                    ? 'bg-gray-900 border-gray-700'
                    : 'bg-white border-gray-200'
                }`}
              >
                <nav className='flex flex-col'>
                  {menuLinks.map(link => (
                    <NavLink
                      key={link.path}
                      to={link.path}
                      className={`px-4 py-2 rounded-md transition-colors duration-200 ${
                        isDark
                          ? 'text-gray-200 hover:bg-gray-800 hover:text-red-400'
                          : 'text-gray-800 hover:bg-gray-100 hover:text-red-600'
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {link.name}
                    </NavLink>
                  ))}
                </nav>
              </div>
            )}
          </>
        )
      }}
    </NxtContext.Consumer>
  )
}

export default withRouter(Header)
