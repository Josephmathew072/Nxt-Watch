import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect, Link} from 'react-router-dom'
import {HiFire} from 'react-icons/hi'
import {formatDistanceToNow} from 'date-fns'
import SideBar from '../SideBar'
import ThemeContext from '../../context/ThemeContext'
import SavedVideosContext from '../../context/SavedVideosContext'
import {
  MainContainer,
  Heading,
  IconContainer,
  Banner,
  VideosContainer,
  Paragraph,
} from './styledComponents'
import Header from '../Header'
import './index.css'

class SavedVideos extends Component {
  renderVideosDetailsView = () => (
    <ThemeContext.Consumer>
      {value => {
        const {isDarkTheme} = value
        return (
          <SavedVideosContext.Consumer>
            {savedVideosContext => {
              const {savedVideosData} = savedVideosContext
              const noOfVideos = savedVideosData.length

              if (noOfVideos > 0) {
                return (
                  <div className="saved-content-container">
                    <Banner
                      className="saved-banner-container"
                      backgroundColor={isDarkTheme}
                    >
                      <IconContainer
                        className="website-logo"
                        backgroundColor={isDarkTheme}
                      >
                        <HiFire className="page-icon" />
                      </IconContainer>
                      <Heading
                        className="banner-head"
                        color={isDarkTheme ? '#ffffff' : ''}
                      >
                        Saved Videos
                      </Heading>
                    </Banner>
                    <ul className="videos-container">
                      {savedVideosData.map(each => {
                        const date = each.publishedAt
                        return (
                          <li className="item-container" key={each.id}>
                            <Link to={`/videos/${each.id}`}>
                              <img
                                src={each.thumbnailUrl}
                                alt="video thumbnail"
                                className="thumbnail"
                              />
                              <div>
                                <Paragraph
                                  className="title"
                                  color={isDarkTheme ? '#ffffff' : ''}
                                >
                                  {each.title}
                                </Paragraph>
                                <p className="name">{each.channel.name}</p>
                                <div className="count-container">
                                  <p className="views">
                                    {each.viewCount} views
                                  </p>
                                  <p className="date">
                                    . {formatDistanceToNow(new Date(date))} ago
                                  </p>
                                </div>
                              </div>
                            </Link>
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                )
              }
              return (
                <VideosContainer
                  className="no-videos-container"
                  backgroundColor={isDarkTheme}
                >
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
                    alt="no saved videos"
                    className="no-video-image"
                  />
                  <Heading
                    className="no-products-heading"
                    color={isDarkTheme ? '#ffffff' : '#000000'}
                  >
                    No Saved videos Found
                  </Heading>
                  <Paragraph
                    className="no-products-description"
                    color={isDarkTheme ? '#ffffff' : '#000000'}
                  >
                    You can save your videos while watching them
                  </Paragraph>
                </VideosContainer>
              )
            }}
          </SavedVideosContext.Consumer>
        )
      }}
    </ThemeContext.Consumer>
  )

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken === undefined) {
      return <Redirect to="/login" />
    }

    return (
      <>
        <Header />
        <ThemeContext.Consumer>
          {value => {
            const {isDarkTheme} = value
            return (
              <MainContainer
                className="saved-container"
                backgroundColor={isDarkTheme}
                data-testid="savedVideos"
              >
                <div className="menu">
                  <SideBar />
                </div>
                <div className="saved-content">
                  {this.renderVideosDetailsView()}
                </div>
              </MainContainer>
            )
          }}
        </ThemeContext.Consumer>
      </>
    )
  }
}

export default SavedVideos
