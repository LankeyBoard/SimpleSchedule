import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';

import HomePage from './pages/HomePage'
import TimeOff from './pages/TimeOff'
import Info from './pages/EmployeeInfo'
import NavBar from './pages/NavBar'
import NotFoundPage from './pages/NotFoundPage'

export default () => <Router>
    <NavBar />
    <div id="page-body" className="flexbox-wrapper vertical">
      <Switch>
        <Route path="/" component={HomePage} exact />
        <Route path="/info" component={Info} />
        <Route path="/timeOff" component={TimeOff} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
</Router>