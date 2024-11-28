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
    flex-direction: column;
  }

h1 {
  text-align: center;
  color: #333;
  margin-bottom: 30px;
  padding: 30px;
}


p {
padding : 30px;
}


button {
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin: 20px;

  &:hover {
    background-color: #0056b3;
  }
}

loginSinginupContainer {
  display: flex;
  flex-direction: column;
  align-items: center;
}


`;
