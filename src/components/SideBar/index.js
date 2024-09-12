import {Link, withRouter} from 'react-router-dom'
import {MdHome} from 'react-icons/md'
import {HiFire} from 'react-icons/hi'
import {SiYoutubegaming} from 'react-icons/si'
import {CgPlayListAdd} from 'react-icons/cg'
import ThemeContext from '../../context/ThemeContext'
import {MainContainer, List, Paragraph, Heading} from './styledComponents'

import './index.css'

const SideBar = props => {
  const {location} = props
  const {pathname} = location
  const activePage = pathname

  return (
    <ThemeContext.Consumer>
      {value => {
        const {isDarkTheme} = value
        return (
          <MainContainer className="side-bar" backgroundColor={isDarkTheme}>
            <ul className="pages-container">
              <Link to="/">
                <List
                  className="page-list"
                  backgroundColor={activePage === '/'}
                  color={activePage === '/' ? '#ff0000' : '#383838'}
                  isDark={isDarkTheme}
                >
                  <MdHome className="page-icon" />
                  <Paragraph
                    className="page-name"
                    color={isDarkTheme ? '#ffffff' : '#000000'}
                  >
                    Home
                  </Paragraph>
                </List>
              </Link>

              <Link to="/trending">
                <List
                  className="page-list"
                  backgroundColor={activePage === '/trending'}
                  color={activePage === '/trending' ? '#ff0000' : '#383838'}
                  isDark={isDarkTheme}
                >
                  <HiFire className="page-icon" />
                  <Paragraph
                    className="page-name"
                    color={isDarkTheme ? '#ffffff' : '#000000'}
                  >
                    Trending
                  </Paragraph>
                </List>
              </Link>

              <Link to="/gaming">
                <List
                  className="page-list"
                  backgroundColor={activePage === '/gaming'}
                  color={activePage === '/gaming' ? '#ff0000' : '#383838'}
                  isDark={isDarkTheme}
                >
                  <SiYoutubegaming className="page-icon" />
                  <Paragraph
                    className="page-name"
                    color={isDarkTheme ? '#ffffff' : '#000000'}
                  >
                    Gaming
                  </Paragraph>
                </List>
              </Link>

              <Link to="/saved-videos">
                <List
                  className="page-list"
                  backgroundColor={activePage === '/saved-videos'}
                  color={activePage === '/saved-videos' ? '#ff0000' : '#383838'}
                  isDark={isDarkTheme}
                >
                  <CgPlayListAdd className="page-icon" />
                  <Paragraph
                    className="page-name"
                    color={isDarkTheme ? '#ffffff' : '#000000'}
                  >
                    Saved Videos
                  </Paragraph>
                </List>
              </Link>
            </ul>
            <div className="bottom-logo-container">
              <Heading
                className="bottom-heading"
                color={isDarkTheme ? '#ffffff' : '#000000'}
              >
                CONTACT US
              </Heading>
              <div className="logos-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
                  alt="facebook logo"
                  className="contact-logo"
                />
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
                  alt="twitter logo"
                  className="contact-logo"
                />
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
                  alt="linked in logo"
                  className="contact-logo"
                />
              </div>
              <Paragraph
                className="note"
                color={isDarkTheme ? '#ffffff' : '#000000'}
              >
                Enjoy! Now to see your channels and recommendations!
              </Paragraph>
            </div>
          </MainContainer>
        )
      }}
    </ThemeContext.Consumer>
  )
}

export default withRouter(SideBar)
