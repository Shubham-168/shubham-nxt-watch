import styled from 'styled-components/macro'

export const StyledContainer = styled.div`
  background-color: ${props => (props.isDark ? '#0f0f0f' : '#f9f9f9')};
  display: flex;
  flex-direction: row;
`
