import styled from 'styled-components/macro'

export const LoginMainContainer = styled.div`
    background-color: ${props => (props.isDark ? '#212121' : '#ffffff')};
    height: 100vh;
    background-size: cover;
    display: flex;
    flex-direction: column:
    justify-content: center;
    align-items: center;
`

export const MainContainer = styled.div`
  background-color: ${props => (props.isDark ? '#000000' : '#ffffff')};
  background-size: cover;
  height: 500px;
  width: 400px;
  margin-left: 400px;
  display: flex;
  flex-direction: column;
  padding: 50px;
`

export const LogoImage = styled.img`
  height: 90px;
  width: 200px;
  margin: 20px;
`

export const FormContainer = styled.form`
  padding: 10px;
`

export const Label = styled.label`
  color: ${props => (props.isDark ? '#ffffff' : '#616e7c')};
  font-size: 25px;
  padding-bottom: 20px;
  font-family: 'Roboto';
`

export const Button = styled.button`
  color: #ffffff;
  border-radius: 10px;
  border-width: 0px;
  background-color: #4f46e5;
`
