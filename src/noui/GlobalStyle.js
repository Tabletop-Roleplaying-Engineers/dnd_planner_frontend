import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Exo+2:400,400i,700');

  * {
    box-sizing: border-box;
    font-family: 'Exo 2', sans-serif;
    
    margin: 0;
    padding: 0;
  }
  
  .ant-layout {
    background: white;
  }
  
  .ant-layout-content {
    min-height: calc(100vh - 64px);
  }

  iframe[id*=telegram-login-]{
    position: absolute;
    top: 18px;
    right: 0;
    //right: 50%;
    //transform: translateX(50%);

    display: ${() => localStorage.getItem('AUTH_DATA') ? 'none' : 'block'};
    
    .btn {
      background-color: #E40712;
    }
  }
  
  .slick-list{
    padding-top: 25vh !important;
    height: 80vh;
  }
  
  .slick-center {
    transform: scale(1.4);
  }
  
  .slick-prev:before, .slick-next:before {
     color: black;
  }
`

export default GlobalStyle
