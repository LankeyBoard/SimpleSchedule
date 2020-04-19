import React, { useState } from 'react';
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
import Login from './pages/login'

export default () => {

  const [isLoggedIn, changeLoginState] = useState(false)

  const loginCallBackClicked = () => {
    alert(`is user login????${isLoggedIn ? "Yes" : "No"}`)
  }

  return <Router>
    {!isLoggedIn &&
      <Switch>
        <Route path="/" component={Login} exact />
        <Route component={NotFoundPage} />
      </Switch>
    }
    {isLoggedIn &&
    <>
      <NavBar isLoggedIn={isLoggedIn} toggled={() => changeLoginState(!isLoggedIn)} loginCallBack={loginCallBackClicked}/>

      <div id="page-body" className="flexbox-wrapper vertical">
      
        <Switch>

          <Route path="/" component={HomePage} exact />
          <Route path="/info" component={Info} />
          <Route path="/timeOff" component={TimeOff} />

          <Route component={NotFoundPage} />
        </Switch>
      </div>
      </>
    }
</Router>

}