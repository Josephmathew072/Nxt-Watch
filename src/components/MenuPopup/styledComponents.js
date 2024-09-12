import styled from 'styled-components'

const getBackgroundColor = (isDarkTheme, isSelected) => {
  if (isSelected) {
    return isDarkTheme ? '#404040' : '#e0e0e0'
  }
  return 'transparent'
}

export const MainContainer = styled.nav`
  background-color: ${props => (props.backgroundColor ? '#231f20' : '#ffffff')};
  height: auto;
`
export const ContentContainer = styled.nav`
  background-color: ${props => (props.backgroundColor ? '#231f20' : '#ffffff')};
`

export const List = styled.li`
  color: ${props => props.color};
  background-color: ${props =>
    getBackgroundColor(props.isDark, props.backgroundColor)};
  display: flex;
  align-items: center;
  padding: 10px;
  border-radius: 4px;
  cursor: pointer;
`

export const Paragraph = styled.p`
  color: ${props => props.color};
  margin: 0;
  padding: 0 10px;
  font-size: 16px;
`
export const Heading = styled.h1`
  color: ${props => props.color};
  font-size: 24px;
`

export const Button = styled.button`
  color: ${props => props.color};
  border: none;
  padding: 0px;
  background: transparent;
  cursor: pointer;
  outline: none;
`
export const MainButton = styled.button`
  @media screen and (max-width: 767px) {
    border: none;
    padding: 0px;
    background: transparent;
    cursor: pointer;
    outline: none;
    color: ${props => props.color2};
  }
`
