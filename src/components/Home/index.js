import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect, Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import {formatDistanceToNow} from 'date-fns'
import {IoIosClose} from 'react-icons/io'
import {BsSearch} from 'react-icons/bs'
import SideBar from '../SideBar'
import ThemeContext from '../../context/ThemeContext'
import {
  MainContainer,
  Heading,
  SearchContainer,
  Paragraph,
  IconContainer,
  BannerContainer,
} from './styledComponents'
import Header from '../Header'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    videosData: [],
    searchInput: '',
    showPremium: true,
  }

  componentDidMount() {
    this.getVideosData()
  }

  onClickRender = () => {
    this.getVideosData()
  }

  onClickClose = () => {
    this.setState({showPremium: false})
  }

  onClickSearchButton = () => {
    this.setState({searchInput: ''})
    this.getVideosData()
  }

  onEnterSearchInput = event => {
    if (event.key === 'Enter') {
      this.setState({searchInput: ''})
      this.getVideosData()
    }
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
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
    const {searchInput} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/videos/all?search=${searchInput}`
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
    const {videosData, showPremium, searchInput} = this.state
    return (
      <ThemeContext.Consumer>
        {value => {
          const {isDarkTheme} = value
          return (
            <div className="home-content-container">
              {showPremium && (
                <BannerContainer
                  className="banner-container"
                  data-testid="banner"
                >
                  <div className="banner-content-container">
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                      alt="nxt watch logo"
                      className="website-logo"
                    />
                    <p className="banner-para">
                      Buy Nxt Watch Premium prepaid plans with UPI
                    </p>
                    <button className="banner-para" type="button">
                      GET IT NOW
                    </button>
                  </div>
                  <button
                    className="banner-close-button"
                    type="button"
                    onClick={this.onClickClose}
                    aria-label="close button"
                    data-testid="close"
                  >
                    <IoIosClose className="close-icon" />
                  </button>
                </BannerContainer>
              )}
              <SearchContainer
                className="search-input-container"
                backgroundColor={isDarkTheme}
              >
                <input
                  value={searchInput}
                  type="search"
                  className="search-input"
                  placeholder="Search"
                  onChange={this.onChangeSearchInput}
                  onKeyDown={this.onEnterSearchInput}
                  id="search"
                />
                <IconContainer
                  className="search-icon-container"
                  backgroundColor={isDarkTheme}
                  color={isDarkTheme ? '#ffffff' : '#475569'}
                  data-testid="searchButton"
                  onClick={this.onClickSearchButton}
                >
                  <BsSearch className="search-icon" />
                </IconContainer>
              </SearchContainer>
              {videosData.length > 0 ? (
                <ul className="home-videos-container">
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
                            <img
                              src={each.channel.profileImageUrl}
                              alt="channel logo"
                              className="profile"
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
                          </div>
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              ) : (
                <MainContainer
                  className="home-no-videos-container"
                  backgroundColor={isDarkTheme}
                >
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
                    alt="no videos"
                    className="no-video-image"
                  />
                  <Heading
                    className="no-products-heading"
                    color={isDarkTheme ? '#ffffff' : '#000000'}
                  >
                    No Search results Found
                  </Heading>
                  <Paragraph
                    className="no-products-description"
                    color={isDarkTheme ? '#ffffff' : '#000000'}
                  >
                    Try different key words or remove search filter
                  </Paragraph>
                  <button
                    className="retry-button"
                    type="button"
                    onClick={this.onClickRender}
                  >
                    Retry
                  </button>
                </MainContainer>
              )}
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
                className="home-container"
                backgroundColor={isDarkTheme}
                data-testid="home"
              >
                <div className="menu">
                  <SideBar />
                </div>
                <div className="home-content">{this.renderVideosDetails()}</div>
              </MainContainer>
            )
          }}
        </ThemeContext.Consumer>
      </>
    )
  }
}

export default Home
