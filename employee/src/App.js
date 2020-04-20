import React, { useState } from 'react'
// import Axios from 'axios'
import {
  BrowserRouter as Router,
  Route,
  Switch
  // ,Redirect
} from 'react-router-dom'
import HomePage from './pages/HomePage'
import TimeOff from './pages/TimeOff'
import Info from './pages/EmployeeInfo'
import NavBar from './pages/NavBar'
import CreateShift from './pages/CreateShift'
import NotFoundPage from './pages/NotFoundPage'
import Login from './pages/LoginPage'
import ProtectedRoute from "./pages/ProtectedRoute"
import TokenService from './services/tokenService'
import { Settings } from './services/Settings'


export default () => {

  const [jwt, setJwt] = useState('')
  const [isLoggedIn, changeLoginState] = useState(Settings.isLoggedInDefault)
  const [token, setToken] = useState("")
  const [userData, setUserData] = useState({})

  const toggle = (loggingAction) => {

    if(loggingAction === 'logout') {
      changeLoginState(!isLoggedIn)
      setToken('')
    }

    // ....THIS IS REGISTRATION LOGIC....
    /*
    if(isLoggedIn===true) {
      alert('remove token from memmory...')
      changeLoginState(true)
    }
    */

    /*
    const newIsLoggedInState = !isLoggedIn
    changeLoginState(newIsLoggedInState)
    if(newIsLoggedInState) {
      // this means we are now logged in...
      Axios.post('./api/users', {
        "name": "unclefifi",
        "email": "unclefifi@gmail.com",
        "password": "papai"
      }).then((axiosApiResponse) => {
        const token = axiosApiResponse.data.token
        setToken(token)
        alert(token)
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
    }*/
  }

  const receiveNewJwt = jwt => {
    console.log(jwt)
    setJwt(jwt)
    setUserData(TokenService.retrieveTokenData(jwt))
    changeLoginState(true)
  }



  return <Router>

    <NavBar isLoggedIn={isLoggedIn} toggled={toggle}/>

    <div id="page-body" className="flexbox-wrapper vertical">
      <Switch>

        <Route 
          path="/" 
          exact
          render={(props) => <ProtectedRoute {...props} isLoggedIn={isLoggedIn}><HomePage userData={userData}/></ProtectedRoute>}
        />

        <Route 
          path="/login" 
          exact
          render={(props) => <Login {...props} newJwtNotify={receiveNewJwt}/>}
        />

        <Route 
          exact
          path="/info" 
          render={(props) => <ProtectedRoute {...props} isLoggedIn={isLoggedIn}><Info/></ProtectedRoute>}
        />

        <Route 
          exact
          path="/timeOff" 
          render={(props) => <ProtectedRoute {...props} isLoggedIn={isLoggedIn}><TimeOff/></ProtectedRoute>}
        />

        <Route component={NotFoundPage} />

      </Switch>
    </div>
</Router>

}