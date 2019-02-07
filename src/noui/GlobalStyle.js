import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Roboto:300,300i,400,500,700');

  * {
    box-sizing: border-box;
    font-family: 'Roboto', sans-serif;
    
    margin: 0;
    padding: 0;
  }
`

export default GlobalStyle
