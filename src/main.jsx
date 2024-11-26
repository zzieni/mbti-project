import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { GlobalStyle } from './style/GlobalStyle.js';
import UserProvider from './context/UserProvider.jsx';

createRoot(document.getElementById('root')).render(
  <>
    <UserProvider>
      <GlobalStyle />
      <App />
    </UserProvider>
  </>
);
