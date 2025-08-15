import {Component} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'

import Login from './components/Login'
import Trending from './components/Trending'
import Home from './components/Home'
import Gaming from './components/Gaming'
import SavedVideos from './components/SavedVideos'
import VideoItemDetails from './components/VideoItemDetails'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import NxtContext from './context/NxtContext'

import './App.css'

class App extends Component {
  state = {
    isDark: false,
    savedVideoList: [],
  }

  toggleDarkMode = () => {
    this.setState(prevState => ({isDark: !prevState.isDark}))
  }

  onSavingVideo = savedVideo => {
    this.setState(prevState => {
      const alreadySaved = prevState.savedVideoList.some(
        video => video.id === savedVideo.id
      )
      if (alreadySaved) {
        // If already saved, remove it (toggle behavior)
        return {
          savedVideoList: prevState.savedVideoList.filter(
            video => video.id !== savedVideo.id
          ),
        }
      }
      // Otherwise add it
      return {
        savedVideoList: [...prevState.savedVideoList, savedVideo],
      }
    })
  }

  onUnSavingVideo = id => {
    this.setState(prevState => ({
      savedVideoList: prevState.savedVideoList.filter(
        eachVideo => eachVideo.id !== id
      ),
    }))
  }

  render() {
    const {isDark, savedVideoList} = this.state
    return (
      <NxtContext.Provider
        value={{
          isDark,
          savedVideoList,
          toggleDarkMode: this.toggleDarkMode,
          onSavingVideo: this.onSavingVideo,
          onUnSavingVideo: this.onUnSavingVideo,
        }}
      >
        <Switch>
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/trending" component={Trending} />
          <ProtectedRoute exact path="/gaming" component={Gaming} />
          <ProtectedRoute exact path="/saved-videos" component={SavedVideos} />
          <ProtectedRoute
            exact
            path="/videos/:id"
            component={VideoItemDetails}
          />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="/not-found" />
        </Switch>
      </NxtContext.Provider>
    )
  }
}

export default App
