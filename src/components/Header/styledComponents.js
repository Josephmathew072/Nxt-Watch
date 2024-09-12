import styled from 'styled-components'

export const NavConatiner = styled.nav`
  background-color: ${props => (props.backgroundColor ? '#231f20' : '#ffffff')};
`
export const List = styled.li`
  color: ${props => props.color};
`
export const Button = styled.button`
  color: ${props => props.color};
`
