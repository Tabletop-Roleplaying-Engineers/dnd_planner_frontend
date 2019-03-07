import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Exo+2:400,400i,700');

  * {
    box-sizing: border-box;
    font-family: 'Exo 2', sans-serif;
    
    margin: 0;
    padding: 0;
  }

`

export default GlobalStyle
