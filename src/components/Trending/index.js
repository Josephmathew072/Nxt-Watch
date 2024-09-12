import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect, Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import {HiFire} from 'react-icons/hi'
import {formatDistanceToNow} from 'date-fns'
import SideBar from '../SideBar'
import ThemeContext from '../../context/ThemeContext'
import {
  MainContainer,
  Heading,
  IconContainer,
  Banner,
  Paragraph,
} from './styledComponents'
import Header from '../Header'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Trending extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    videosData: [],
  }

  componentDidMount() {
    this.getVideosData()
  }

  onClickRender = () => {
    this.getVideosData()
  }

  getFormattedData = data => ({
    thumbnailUrl: data.thumbnail_url,
    publishedAt: data.published_at,
    viewCount: data.view_count,
    channel: data.channel,
    id: data.id,
    title: data.title,
  })

  getChannelFormat = data => ({
    name: data.name,
    profileImageUrl: data.profile_image_url,
  })

  getVideosData = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/videos/trending`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const {videos} = fetchedData
      const updatedVideosData = videos.map(this.getFormattedData)
      const updatedData = updatedVideosData.map(each => {
        const updateChannel = this.getChannelFormat(each.channel)
        return {
          ...each,
          channel: updateChannel,
        }
      })
      this.setState({
        videosData: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderVideosDetailsView = () => {
    const {videosData} = this.state
    return (
      <ThemeContext.Consumer>
        {value => {
          const {isDarkTheme} = value
          return (
            <div className="tending-content-container">
              <Banner
                className="tending-banner-container"
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
                  Trending
                </Heading>
              </Banner>
              <ul className="videos-container">
                {videosData.map(each => {
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
                            <p className="views">{each.viewCount} views</p>
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
        }}
      </ThemeContext.Consumer>
    )
  }

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <ThemeContext.Consumer>
      {value => {
        const {isDarkTheme} = value
        return (
          <div className="products-error-view-container">
            <img
              src={
                isDarkTheme
                  ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png'
                  : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png'
              }
              alt="failure view"
              className="products-failure-img"
            />
            <Heading
              className="product-failure-heading-text"
              color={isDarkTheme ? '#ffffff' : ''}
            >
              Oops! Something Went Wrong
            </Heading>
            <p className="products-failure-description">
              We are having some trouble completing your request.
            </p>
            <p className="products-failure-description">Please try again.</p>
            <button
              className="retry-button"
              type="button"
              onClick={this.onClickRender}
            >
              Retry
            </button>
          </div>
        )
      }}
    </ThemeContext.Consumer>
  )

  renderVideosDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderVideosDetailsView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

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
                className="tending-container"
                backgroundColor={isDarkTheme}
                data-testid="trending"
              >
                <div className="menu">
                  <SideBar />
                </div>
                <div className="tending-content">
                  {this.renderVideosDetails()}
                </div>
              </MainContainer>
            )
          }}
        </ThemeContext.Consumer>
      </>
    )
  }
}

export default Trending
