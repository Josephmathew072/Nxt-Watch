import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {IoIosMoon} from 'react-icons/io'
import {FiSun, FiLogOut} from 'react-icons/fi'
import {IoMenu} from 'react-icons/io5'
import LogOut from '../LogOutPopup'
import MenuPopup from '../MenuPopup'
import ThemeContext from '../../context/ThemeContext'
import {NavConatiner, List} from './styledComponents'

import './index.css'

const Header = props => {
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }
  return (
    <ThemeContext.Consumer>
      {value => {
        const {isDarkTheme, changeTheme} = value
        const onChangeTheme = () => {
          changeTheme(!isDarkTheme)
        }
        return (
          <NavConatiner backgroundColor={isDarkTheme} className="nav-header">
            <div className="nav-content">
              <Link to="/">
                <img
                  className="website-logo"
                  src={
                    isDarkTheme
                      ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
                      : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
                  }
                  alt="website logo"
                />
              </Link>
              <ul className="nav-menu">
                <li className="menu-list">
                  <button
                    aria-label="theme button"
                    type="button"
                    data-testid="theme"
                    className="theme-button"
                    onClick={onChangeTheme}
                  >
                    {isDarkTheme ? (
                      <FiSun className="icon1" />
                    ) : (
                      <IoIosMoon className="icon2" />
                    )}
                  </button>
                </li>
                <li className="menu-list">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
                    alt="profile"
                    className="profile-icon"
                  />
                </li>
              </ul>
              <LogOut onClickLogout={onClickLogout}>Logout</LogOut>
              <div className="nav-menu-mobile">
                <ul className="nav-menu-list-mobile">
                  <li className="nav-menu-item-mobile">
                    <button
                      aria-label="theme button"
                      type="button"
                      data-testid="theme"
                      className="theme-button"
                      onClick={onChangeTheme}
                    >
                      {isDarkTheme ? (
                        <FiSun className="icon1" />
                      ) : (
                        <IoIosMoon className="icon2" />
                      )}
                    </button>
                  </li>
                  <List
                    className="nav-menu-item-mobile"
                    color={isDarkTheme ? '#ffffff' : '#231f20'}
                  >
                    <MenuPopup>
                      <IoMenu className="menu-icon" />
                    </MenuPopup>
                  </List>
                </ul>
                <LogOut onClickLogout={onClickLogout}>
                  <FiLogOut className="logout-icon" />
                </LogOut>
              </div>
            </div>
          </NavConatiner>
        )
      }}
    </ThemeContext.Consumer>
  )
}
export default withRouter(Header)
