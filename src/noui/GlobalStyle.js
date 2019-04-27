import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Exo+2:400,400i,700');

  * {
    box-sizing: border-box;
    font-family: 'Exo 2', sans-serif;
    
    margin: 0;
    padding: 0;
  }

  iframe[id*=telegram-login-]{
    position: absolute;
    top: 18px;
    right: 20px;
    
    display: ${() => localStorage.getItem('AUTH_DATA') ? 'none' : 'block'};
    
    .btn {
      background-color: #E40712;
    }
  }
`

export default GlobalStyle
