import styled from 'styled-components'

export const MainContainer = styled.nav`
  background-color: ${props => (props.backgroundColor ? '#212121' : '#ffffff')};
`
export const Paragraph = styled.p`
  color: ${props => props.color};
`
export const Button = styled.button`
  color: ${props => props.color};
  border-color: ${props => props.border};
`
export const MainButton = styled.button`
  @media screen and (min-width: 768px) {
    font-family: 'Roboto';
    font-weight: 600;
    font-size: 10px;
    padding: 8px 16px;
    background-color: transparent;
    border-radius: 4px;
    margin-left: 14px;
    cursor: pointer;
    outline: none;
    border: 1px solid;
    color: ${props => props.color1};
    border-color: ${props => props.border};
  }
  @media screen and (max-width: 767px) {
    border: none;
    padding: 0px;
    background: transparent;
    cursor: pointer;
    outline: none;
    color: ${props => props.color2};
  }
`
