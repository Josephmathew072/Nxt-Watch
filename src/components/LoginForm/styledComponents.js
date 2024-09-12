import styled from 'styled-components'

export const MainConatiner = styled.div`
  background-color: ${props => (props.backgroundColor ? '#1e293b' : '#f8fafc')};
`

export const FormConatiner = styled.form`
  background-color: ${props => (props.backgroundColor ? '#0f0f0f' : '#ffffff')};
`

export const Label = styled.label`
  color: ${props => (props.color ? '#ffffff' : '#000000')};
`
export const Button = styled.button`
  color: '#ffffff';
`
