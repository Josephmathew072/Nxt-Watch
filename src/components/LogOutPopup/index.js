import Popup from 'reactjs-popup'
import ThemeContext from '../../context/ThemeContext'
import {MainContainer, Paragraph, Button, MainButton} from './styledComponents'
import './index.css'

const LogOut = props => {
  const {onClickLogout, children} = props

  const onClickButton = () => {
    onClickLogout()
  }

  return (
    <ThemeContext.Consumer>
      {value => {
        const {isDarkTheme} = value

        return (
          <Popup
            trigger={
              <MainButton
                type="button"
                color1={isDarkTheme ? '#ffffff' : '#3b82f6'}
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
                <Paragraph
                  className="header"
                  color={isDarkTheme ? '#ffffff' : '#000000'}
                >
                  Are you sure, you want to logout
                </Paragraph>
                <div className="actions">
                  <Button
                    className="log-out-desktop-btn"
                    type="button"
                    color={isDarkTheme ? '#94a3b8' : '#475569'}
                    border={isDarkTheme ? '#94a3b8' : '#475569'}
                    onClick={() => {
                      close()
                    }}
                  >
                    Cancel
                  </Button>
                  <button
                    type="button"
                    className="close-button"
                    onClick={onClickButton}
                  >
                    Confirm
                  </button>
                </div>
              </MainContainer>
            )}
          </Popup>
        )
      }}
    </ThemeContext.Consumer>
  )
}

export default LogOut
