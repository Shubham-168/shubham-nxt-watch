import {Component} from 'react'
import Cookies from 'js-cookie'
import NxtContext from '../../context/NxtContext'

class Login extends Component {
  state = {
    username: '',
    password: '',
    errorMsg: '',
    showErrorMsg: false,
    showPassword: false,
  }

  // onSuccess = jwtToken => {
  //   const {history} = this.props
  //   Cookies.set('jwt_token', jwtToken, {expires: 30})
  //   history.replace('/')
  // }

  // onFailure = errorMsg => {
  //   this.setState({
  //     showErrorMsg: true,
  //     errorMsg,
  //   })
  // }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const {history} = this.props
    history.replace('/')
    // const options = {
    //   method: 'POST',
    //   body: JSON.stringify(userDetails),
    // }
    // const apiLoginUrl = 'https://apis.ccbp.in/login'
    // const response = await fetch(apiLoginUrl, options)
    // const data = await response.json()
    // if (response.ok === true) {
    //   this.onSuccess(data.jwt_token)
    // } else {
    //   this.onFailure(data.error_msg)
    // }
    
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onClickCheckbox = () => {
    this.setState(prevState => ({showPassword: !prevState.showPassword}))
  }

  render() {
    const {username, password, errorMsg, showErrorMsg, showPassword} =
      this.state
    const {history} = this.props
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      history.replace('/')
    }

    return (
      <NxtContext.Consumer>
        {value => {
          const {isDark} = value
          const logoUrl = isDark
            ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
            : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'

          return (
            <div
              className={`flex items-center justify-center min-h-screen px-4 ${
                isDark ? 'bg-gray-900' : 'bg-gray-100'
              }`}
            >
              <div
                className={`w-full max-w-sm rounded-lg shadow-lg p-8 ${
                  isDark ? 'bg-gray-800' : 'bg-white'
                }`}
              >
                <img
                  src={logoUrl}
                  alt="website logo"
                  className="mx-auto mb-6 w-40"
                />

                <form
                  onSubmit={this.onSubmitForm}
                  className="flex flex-col space-y-4"
                >
                  <label
                    htmlFor="usernameId"
                    className={`text-sm font-semibold ${
                      isDark ? 'text-gray-300' : 'text-gray-700'
                    }`}
                  >
                    USERNAME
                  </label>
                  <input
                    type="text"
                    id="usernameId"
                    placeholder="Username"
                    value={username}
                    onChange={this.onChangeUsername}
                    className={`w-full px-3 py-2 border rounded-md outline-none ${
                      isDark
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                    }`}
                  />

                  <label
                    htmlFor="passwordId"
                    className={`text-sm font-semibold ${
                      isDark ? 'text-gray-300' : 'text-gray-700'
                    }`}
                  >
                    PASSWORD
                  </label>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="passwordId"
                    placeholder="Password"
                    value={password}
                    onChange={this.onChangePassword}
                    className={`w-full px-3 py-2 border rounded-md outline-none ${
                      isDark
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                    }`}
                  />

                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="checkboxId"
                      onClick={this.onClickCheckbox}
                      className="w-4 h-4"
                    />
                    <label
                      htmlFor="checkboxId"
                      className={`${
                        isDark ? 'text-gray-300' : 'text-gray-700'
                      }`}
                    >
                      Show Password
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2 mt-4 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700"
                  >
                    Login
                  </button>
                </form>

                {showErrorMsg && (
                  <p className="mt-3 text-sm text-red-500">{errorMsg}</p>
                )}
              </div>
            </div>
          )
        }}
      </NxtContext.Consumer>
    )
  }
}

export default Login
