import React, { useState, useEffect } from 'react'
import { ApiService } from './services/ApiService'
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'

import HomePage from './pages/HomePage'
import TimeOff from './pages/TimeOff'
import { Availability } from './pages/Availability'
import NavBar from './pages/NavBar'
import CreateShift from './pages/CreateShift'
import NotFoundPage from './pages/NotFoundPage'
import Login from './pages/LoginPage'
import ProtectedRoute from "./pages/ProtectedRoute"
import TokenService from './services/tokenService'
import { Settings } from './services/Settings'

export const AppContext = React.createContext()

export default () => {

  // const [jwt, setJwt] = useState('')
  const [isLoggedIn, changeLoginState] = useState(Settings.isLoggedInDefault)
  // const [token, setToken] = useState("")
  const [userData, setUserData] = useState({})


  const logInApiRequest = async (userid, password) => {
    const jwt = await ApiService.LogIn(userid, password)
    if(jwt.status === 200 && jwt.data) {
      receiveNewJwt(jwt.data.token)
      setUserData(jwt.data.user)
    } else if(jwt && jwt.data && jwt.data.errors) {
      console.dir(jwt)
    }
  }

  useEffect(() => {
    if(Settings.isLoggedInDefault) {
      logInApiRequest('unclefifi', 'password')
    }
  }, [])


  const toggle = (loggingAction) => {

    if(loggingAction === 'logout') {
      changeLoginState(!isLoggedIn)
      setToken('')
    }

    /*
    // .... THIS IS REGISTRATION LOGIC ....
    if(isLoggedIn===true) {
      alert('remove token from memmory...')
      changeLoginState(true)
    }


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
    }
    */
  }

  const receiveNewJwt = jwt => {
    console.log(jwt)
    setJwt(jwt)

    debugger// fix this as above...
    // needs to be better...
    setUserData(TokenService.retrieveTokenData(jwt))
    changeLoginState(true)
  }

  const _roleDefined = !!(userData && userData.role)
  const _isLoggedIn = isLoggedIn && _roleDefined

  let role = ''
  let isManager = false
  if(_roleDefined) {
      role = userData.role
      isManager = role === 'manager'
  }



  // <AppContext.Provider value={{userData}}>
  return <AppContext.Provider value={{userData}}>
    <Router>

      <NavBar 
        isLoggedIn={_isLoggedIn} 
        userData={userData} 
        toggled={toggle}
        isManager={isManager}
      />

      <div id="page-body" className="flexbox-wrapper vertical">
        <Switch>

          <Route 
            path="/" 
            exact
            render={(props) => <ProtectedRoute adminOnly={false} userData={userData} isLoggedIn={_isLoggedIn}><HomePage userData={userData}/></ProtectedRoute>}
          />

          <Route 
            path="/login" 
            exact
            render={(props) => <Login {...props} newJwtNotify={receiveNewJwt}/>}
          />

          <Route 
            exact
            path="/info" 
            render={(props) => <ProtectedRoute adminOnly={false} userData={userData} isLoggedIn={_isLoggedIn}><Availability/></ProtectedRoute>}
          />

          <Route 
            exact
            path="/timeOff" 
            render={(props) => <ProtectedRoute adminOnly={true} userData={userData} isLoggedIn={_isLoggedIn}><TimeOff userData={userData}/></ProtectedRoute>}
          />
          <Route
            path="/CreateShifts"
            render={(props) => <ProtectedRoute adminOnly={true} userData={userData} isLoggedIn={_isLoggedIn}><CreateShift /></ProtectedRoute>}
          />
          <Route component={NotFoundPage} />

        </Switch>
      </div>
    </Router>
</AppContext.Provider>

}