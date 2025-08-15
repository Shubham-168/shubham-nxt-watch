import styled from 'styled-components/macro'

export const BannerContainer = styled.div`
  background-image: url('https://assets.ccbp.in/frontend/react-js/nxt-watch-banner-bg.png');
  background-size: cover;
  width: 100vh;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`
export const StyledContainer = styled.div`
  background-color: ${props => (props.isDark ? '#181818' : '#f9f9f9')};
  display: flex;
  flex-direction: row;
`
