import styled from 'styled-components'

export const MainContainer = styled.div`
  background-color: ${props => (props.backgroundColor ? '#000000' : '#ffffff')};
`
export const Heading = styled.h1`
  color: ${props => props.color};
`
export const Paragraph = styled.p`
  color: ${props => props.color};
`
