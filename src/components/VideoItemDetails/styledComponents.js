import styled from 'styled-components'

export const MainContainer = styled.div`
  background-color: ${props => (props.backgroundColor ? '#0f0f0f' : '#ffffff')};
`

export const ReactionContainer = styled.div`
  color: ${props => props.color};
`

export const Heading = styled.h1`
  color: ${props => props.color};
`

export const Paragraph = styled.p`
  color: ${props => props.color};
`

export const Button = styled.button`
  color: ${props => props.color};
`
