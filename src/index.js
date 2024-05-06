import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import App from './App';
import './index.css';
import { KindeProvider } from '@kinde-oss/kinde-auth-react';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <KindeProvider
      clientId="3ab5bb85682549019656ddcae1056def"
      domain="https://imagify.kinde.com"
      redirectUri="http://localhost:3000"
      logoutUri="http://localhost:3000"
    >
      <App />
    </KindeProvider>
  </BrowserRouter>
);

reportWebVitals();
