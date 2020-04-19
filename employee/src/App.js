import React, { useState } from 'react'
import Axios from 'axios'
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';

import HomePage from './pages/HomePage'
import TimeOff from './pages/TimeOff'
import Info from './pages/EmployeeInfo'
import NavBar from './pages/NavBar'
import CreateShift from './pages/CreateShift'
import NotFoundPage from './pages/NotFoundPage'

export default () => {

  const [isLoggedIn, changeLoginState] = useState(false)
  const [token, setToken] = useState("")

  const toggle = () => {
    const newIsLoggedInState = !isLoggedIn
    changeLoginState(newIsLoggedInState)
    if(newIsLoggedInState) {
      // this means we are now logged in...
      Axios.post('./api/users', {
        "name": "unclefifi",
        "email": "unclefifi@gmail.com",
        "password": "papai"
      }).then((axiosApiResponse) => {
        debugger
        alert('this is a good response...')
        setToken(axiosApiResponse.data.token)
      }).catch((axiosError) => {
        if(axiosError
          && axiosError.response
          && axiosError.response.data
          && Array.isArray(axiosError.response.data.errors)
          && axiosError.response.data.errors.length > 0) {
            const { errors } = axiosError.response.data
            errors.forEach(i => {
              alert(i.msg)
            })
          }
      })
    }
  }


  return <Router>
    <NavBar isLoggedIn={isLoggedIn} toggled={toggle}/>
    <div id="page-body" className="flexbox-wrapper vertical">
      <Switch>
        <Route path="/" component={HomePage} exact />
        <Route path="/info" component={Info} />
        <Route path="/timeOff" component={TimeOff} />
        <Route path="/createShift" component={CreateShift} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
</Router>

}