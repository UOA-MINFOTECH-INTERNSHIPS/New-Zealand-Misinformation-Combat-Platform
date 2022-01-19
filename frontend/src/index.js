import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { BrowserRouter as Router } from 'react-router-dom';
import { AppContextProvider } from './AppContextProvider';
import { UserContextProvider } from './UserContextProvider';
import App from './App';
import Navbar from './components/Navigation/nav';

axios.defaults.withCredentials = true;


ReactDOM.render(
  <React.StrictMode>
    <AppContextProvider>
      <UserContextProvider>
        <Router>
            <Navbar/>
            <App />
        </Router>
        </UserContextProvider>
    </AppContextProvider>
  </React.StrictMode>
  ,
  document.getElementById('root')
);
