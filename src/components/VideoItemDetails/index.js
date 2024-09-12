import {Component} from 'react'
import Cookies from 'js-cookie'
import ReactPlayer from 'react-player'
import {Redirect} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import {formatDistanceToNow} from 'date-fns'
import {AiOutlineLike, AiOutlineDislike} from 'react-icons/ai'
import {CgPlayListAdd} from 'react-icons/cg'
import SideBar from '../SideBar'
import ThemeContext from '../../context/ThemeContext'
import SavedVideosContext from '../../context/SavedVideosContext'
import {
  MainContainer,
  Heading,
  Paragraph,
  ReactionContainer,
  Button,
} from './styledComponents'
import Header from '../Header'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class VideoItemDetails extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    videosData: {},
    isAdded: false,
    isLiked: false,
    isDisliked: false,
  }

  componentDidMount() {
    this.getVideosData()
  }

  onClickRender = () => {
    this.getVideosData()
  }

  onClickLike = () => {
    this.setState(prevState => ({
      isLiked: !prevState.isLiked,
      isDisliked: false,
    }))
  }

  onClickDislike = () => {
    this.setState(prevState => ({
      isDisliked: !prevState.isDisliked,
      isLiked: false,
    }))
  }

  onClickAdded = context => {
    const {isAdded, videosData} = this.state
    const {savedVideosData, addVideos, removeVideos} = context
    const isVideoAdded = savedVideosData.some(each => each.id === videosData.id)

    if (isAdded && !isVideoAdded) {
      removeVideos(videosData)
    } else {
      addVideos(videosData)
    }
    this.setState(prevState => ({isAdded: !prevState.isAdded}))
  }

  getFormattedData = data => ({
    thumbnailUrl: data.thumbnail_url,
    publishedAt: data.published_at,
    viewCount: data.view_count,
    channel: data.channel,
    id: data.id,
    title: data.title,
    videoUrl: data.video_url,
    description: data.description,
  })

  getChannelFormat = data => ({
    name: data.name,
    profileImageUrl: data.profile_image_url,
    subscriberCount: data.subscriber_count,
  })

  getVideosData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/videos/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    try {
      const response = await fetch(apiUrl, options)
      if (response.ok) {
        const fetchedData = await response.json()
        const updatedVideosData = this.getFormattedData(
          fetchedData.video_details,
        )
        const channelData = this.getChannelFormat(updatedVideosData.channel)
        const updatedData = {...updatedVideosData, channel: channelData}
        this.setState({
          videosData: updatedData,
          apiStatus: apiStatusConstants.success,
        })
      } else {
        this.setState({apiStatus: apiStatusConstants.failure})
      }
    } catch {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderVideosDetailsView = () => {
    const {videosData, isAdded, isDisliked, isLiked} = this.state
    const {
      publishedAt,
      viewCount,
      channel,
      title,
      videoUrl,
      description,
    } = videosData
    const {name, profileImageUrl, subscriberCount} = channel
    const date = publishedAt

    return (
      <ThemeContext.Consumer>
        {value => {
          const {isDarkTheme} = value
          return (
            <SavedVideosContext.Consumer>
              {savedVideosContext => (
                <div className="video-content-container">
                  <div className="video-container">
                    <ReactPlayer url={videoUrl} />
                  </div>
                  <div>
                    <Paragraph
                      className="title"
                      color={isDarkTheme ? '#ffffff' : '#000000'}
                    >
                      {title}
                    </Paragraph>
                    <ReactionContainer
                      className="video-react-container"
                      color={isAdded ? '#94a3b8' : '#475569'}
                    >
                      <div className="count-container">
                        <Paragraph className="views">
                          {viewCount} views
                        </Paragraph>
                        <Paragraph className="date">
                          . {formatDistanceToNow(new Date(date))} ago
                        </Paragraph>
                      </div>
                      <div className="buttons-container">
                        <Button
                          className="button"
                          type="button"
                          onClick={this.onClickLike}
                          color={isLiked ? '#2563eb' : '#64748b'}
                        >
                          <AiOutlineLike className="icon" />
                          Like
                        </Button>
                        <Button
                          className="button"
                          type="button"
                          onClick={this.onClickDislike}
                          color={isDisliked ? '#2563eb' : '#64748b'}
                        >
                          <AiOutlineDislike className="icon" />
                          Dislike
                        </Button>
                        <Button
                          className="button"
                          type="button"
                          onClick={() => this.onClickAdded(savedVideosContext)}
                          color={isAdded ? '#2563eb' : '#64748b'}
                        >
                          <CgPlayListAdd className="icon" />
                          <p>{isAdded ? 'Saved' : 'Save'}</p>
                        </Button>
                      </div>
                    </ReactionContainer>
                    <hr className="hr-line" />
                    <div className="channel-container">
                      <img
                        src={profileImageUrl}
                        alt="channel logo"
                        className="profile"
                      />
                      <div className="channel-details">
                        <div className="count-container">
                          <Paragraph
                            className="name"
                            color={isDarkTheme ? '#ffffff' : '#000000'}
                          >
                            {name}
                          </Paragraph>
                          <Paragraph
                            className="subscribe"
                            color={isDarkTheme ? '#94a3b8' : '#64748b'}
                          >
                            {channel.subscriberCount} subscribers
                          </Paragraph>
                        </div>
                        <Paragraph
                          className="description"
                          color={isDarkTheme ? '#f8fafc' : '#181818'}
                        >
                          {description}
                        </Paragraph>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </SavedVideosContext.Consumer>
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
              color={isDarkTheme ? '#ffffff' : '#000000'}
            >
              Oops! Something Went Wrong
            </Heading>
            <p className="products-failure-description">
              We are having some trouble to complete your request. Please try
              again.
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
                className="details-container"
                backgroundColor={isDarkTheme}
                data-testid="videoItemDetails"
              >
                <div className="menu">
                  <SideBar />
                </div>
                <div className="details-content">
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

export default VideoItemDetails
