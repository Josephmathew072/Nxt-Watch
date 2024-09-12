import styled from 'styled-components'

export const MainContainer = styled.div`
  background-color: ${props => (props.backgroundColor ? '#181818' : '#ffffff')};
`
export const SearchContainer = styled.div`
  background-color: ${props => (props.backgroundColor ? '#000000' : '#ffffff')};
`

export const IconContainer = styled.button`
  background-color: ${props => (props.backgroundColor ? '#424242' : '#f4f4f4')};
  color: ${props => props.color};
`

export const Heading = styled.h1`
  color: ${props => props.color};
`
export const Paragraph = styled.p`
  color: ${props => props.color};
`

export const BannerContainer = styled.div`
  background-image: url('https://assets.ccbp.in/frontend/react-js/nxt-watch-banner-bg.png');
  background-size: cover;
  height: 250px;
`
