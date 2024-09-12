import styled from 'styled-components'

export const MainContainer = styled.div`
  background-color: ${props => (props.backgroundColor ? '#0f0f0f' : '#ffffff')};
`
export const Banner = styled.div`
  background-color: ${props => (props.backgroundColor ? '#0f0f0f' : '#f1f1f1')};
`

export const IconContainer = styled.div`
  background-color: ${props => (props.backgroundColor ? '#000000' : '#e2e8f0')};
  color: #ff0000;
`
export const Heading = styled.h1`
  color: ${props => props.color};
`
export const Paragraph = styled.p`
  color: ${props => props.color};
`
