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
import logo from './logo.svg';
import './App.css';


class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="App">
          <NavBar />
          <div id="page-body">
            <Switch>
              <Route path="/" component={HomePage} exact />
              <Route path="/info" component={Info} />
              <Route path="/timeOff" component={TimeOff} />
              
              <Route component={NotFoundPage} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
