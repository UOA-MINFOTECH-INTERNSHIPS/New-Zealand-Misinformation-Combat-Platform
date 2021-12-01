import express from 'express';
import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';



export default function App() {
    return (
        <Router>
            <div>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/about">About</Link>
                    </li>
                    <li>
                        <Link to="/dashboard">Dashboard</Link>
                    </li>
                </ul>

                <Switch>
                    <Route path="/page1">
                        <PageOne />
                    </Route>
                    <Route path="/page2">
                        <PageTwo />
                    </Route>
                    <Route path="*">
                        <p>404 Not Found!!</p>
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

function PageOne() {
    return (
      <div>
        <h2>Home</h2>
      </div>
    );
  }
  
  function PageTwo() {
    return (
      <div>
        <h2>About</h2>
      </div>
    );
  }

const router = express.Router();

import pokemon from './pokemon';
router.use('/pokemon', pokemon);

export default router;
