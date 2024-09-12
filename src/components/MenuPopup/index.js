import Popup from 'reactjs-popup'
import {Link, withRouter} from 'react-router-dom'
import {MdHome} from 'react-icons/md'
import {HiFire} from 'react-icons/hi'
import {SiYoutubegaming} from 'react-icons/si'
import {CgPlayListAdd} from 'react-icons/cg'
import {IoMdClose} from 'react-icons/io'
import ThemeAndVideoContext from '../../context/ThemeAndVideoContext'

import {
  MainContainer,
  List,
  Paragraph,
  Button,
  MainButton,
  ContentContainer,
} from './styledComponents'

import './index.css'

const MenuPopup = props => {
  const {location} = props
  const {pathname} = location
  const activePage = pathname

  const {children} = props

  return (
    <ThemeAndVideoContext.Consumer>
      {value => {
        const {isDarkTheme} = value

        return (
          <Popup
            trigger={
              <MainButton
                type="button"
                color2={isDarkTheme ? '#ffffff' : '#231f20'}
                border={isDarkTheme ? '#ffffff' : '#3b82f6'}
              >
                {children}
              </MainButton>
            }
            modal
            nested
          >
            {close => (
              <MainContainer className="modal" backgroundColor={isDarkTheme}>
                <div className="close">
                  <Button
                    onClick={close}
                    color={isDarkTheme ? '#ffffff' : '#000000'}
                  >
                    <IoMdClose />
                  </Button>
                </div>
                <ContentContainer
                  className="side-bar"
                  backgroundColor={isDarkTheme}
                >
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
                        color={
                          activePage === '/trending' ? '#ff0000' : '#383838'
                        }
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
                        color={
                          activePage === '/saved-videos' ? '#ff0000' : '#383838'
                        }
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
                </ContentContainer>
              </MainContainer>
            )}
          </Popup>
        )
      }}
    </ThemeAndVideoContext.Consumer>
  )
}

export default withRouter(MenuPopup)
