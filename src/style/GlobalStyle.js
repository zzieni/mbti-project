import { createGlobalStyle } from 'styled-components';
import styledReset from 'styled-reset';

export const GlobalStyle = createGlobalStyle`
  ${styledReset} 
  #root {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    flex-wrap: wrap;
    padding: 0;

  }

`;
