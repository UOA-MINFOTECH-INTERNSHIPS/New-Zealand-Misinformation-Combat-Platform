import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { BrowserRouter as Router } from 'react-router-dom';
import { AppContextProvider } from './AppContextProvider';
import App from './App';
import Navbar from './components/Navigation/Navbar';

axios.defaults.withCredentials = true;


ReactDOM.render(
  <React.StrictMode>
    <AppContextProvider>
      <Router>
          {/* <Navbar/> */}
          <App />
      </Router>
    </AppContextProvider>
  </React.StrictMode>
  ,
  document.getElementById('root')
);
