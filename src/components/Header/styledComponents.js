import styled from 'styled-components/macro'

export const MainHeaderContainer = styled.div`
    backgroun-color: ${props => (props.isDark ? '#0f0f0f' : '#f9f9f9')} ;
    display:flex;
    flex-direction:row;
    justify-content:space-between;
`

export const LogoImage = styled.img`
  height: 90px;
  width: 200px;
  margin: 20px;
`

export const LogoutButton = styled.button`
  color : ${props => (props.isDark ? '#f9f9f9' : '#0f0f0f')} ;
  backgroun-color: ${props => (props.isDark ? '#0f0f0f' : '#f9f9f9')} ;
  border-radius:10px;
`
