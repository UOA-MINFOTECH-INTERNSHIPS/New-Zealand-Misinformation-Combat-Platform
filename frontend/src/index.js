import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter as Router } from 'react-router-dom';
import { AppContextProvider } from './AppContextProvider';
import App from './App';
import { CssBaseline } from '@mui/material';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <AppContextProvider>
        <CssBaseline />
        <App />
      </AppContextProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
