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
      clientId={process.env.REACT_APP_KINDE_CLIENT_ID}
      domain={process.env.REACT_APP_DOMAIN}
      redirectUri={process.env.REACT_APP_REDIRECT}
      logoutUri={process.env.REACT_APP_LOGOUT}
    >
      <App />
    </KindeProvider>
  </BrowserRouter>
);

reportWebVitals();
