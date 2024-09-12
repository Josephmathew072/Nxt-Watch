import {Component} from 'react'
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'
import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Trending from './components/Trending'
import Gaming from './components/Gaming'
import SavedVideos from './components/SavedVideos'
import VideoItemDetails from './components/VideoItemDetails'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import ThemeContext from './context/ThemeContext'
import SavedVideosContext from './context/SavedVideosContext'
import './App.css'

class App extends Component {
  state = {
    isDarkTheme: false,
    savedVideosData: [],
  }

  changeTheme = () => {
    this.setState(prevState => ({
      isDarkTheme: !prevState.isDarkTheme,
    }))
  }

  addVideos = data => {
    this.setState(prevState => {
      const videoExists = prevState.savedVideosData.some(
        each => each.id === data.id,
      )
      if (videoExists) {
        return prevState
      }
      return {
        savedVideosData: [...prevState.savedVideosData, data],
      }
    })
  }

  removeVideos = data => {
    this.setState(prevState => ({
      savedVideosData: prevState.savedVideosData.filter(
        each => each.id !== data.id,
      ),
    }))
  }

  render() {
    const {isDarkTheme, savedVideosData} = this.state

    return (
      <ThemeContext.Provider
        value={{isDarkTheme, changeTheme: this.changeTheme}}
      >
        <SavedVideosContext.Provider
          value={{
            savedVideosData,
            addVideos: this.addVideos,
            removeVideos: this.removeVideos,
          }}
        >
          <BrowserRouter>
            <Switch>
              <Route exact path="/login" component={LoginForm} />
              <ProtectedRoute exact path="/" component={Home} />
              <ProtectedRoute exact path="/trending" component={Trending} />
              <ProtectedRoute exact path="/gaming" component={Gaming} />
              <ProtectedRoute
                exact
                path="/saved-videos"
                component={SavedVideos}
              />
              <ProtectedRoute
                exact
                path="/videos/:id"
                component={VideoItemDetails}
              />
              <Route path="/not-found" component={NotFound} />
              <Redirect to="/not-found" />
            </Switch>
          </BrowserRouter>
        </SavedVideosContext.Provider>
      </ThemeContext.Provider>
    )
  }
}

export default App
