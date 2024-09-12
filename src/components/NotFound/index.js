import Header from '../Header'
import SideBar from '../SideBar'
import ThemeContext from '../../context/ThemeContext'
import {MainContainer, Heading, Paragraph} from './styledComponents'
import './index.css'

const NotFound = () => (
  <>
    <Header />
    <ThemeContext.Consumer>
      {value => {
        const {isDarkTheme} = value
        return (
          <MainContainer
            className="not-found-container"
            backgroundColor={isDarkTheme}
          >
            <div className="menu">
              <SideBar />
            </div>
            <div className="not-found-content">
              <img
                src={
                  isDarkTheme
                    ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-dark-theme-img.png'
                    : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png'
                }
                alt="not found"
                className="not-found-img"
              />
              <Heading
                className="failure-heading-text"
                color={isDarkTheme ? '#ffffff' : '#000000'}
              >
                Page Not Found
              </Heading>
              <Paragraph color={isDarkTheme ? '#ffffff' : '#000000'}>
                We are sorry, the page you requested could not be found.
              </Paragraph>
            </div>
          </MainContainer>
        )
      }}
    </ThemeContext.Consumer>
  </>
)

export default NotFound
