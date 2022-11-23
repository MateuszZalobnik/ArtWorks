import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
html {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: 'EB Garamond', serif;
  }
  
  *, *::after, *::before {
    box-sizing: inherit;
  }
  
  body {
    box-sizing: border-box;
    margin: 0;
    padding: 0px;
    font-family: 'EB Garamond', serif;
  }
  
  a, button {
    font-family: 'EB Garamond', serif;
  }
`;
