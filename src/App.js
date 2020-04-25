import React, { useState, useEffect } from 'react'
import { ApiService } from './services/ApiService'
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'

import Modal from './components/Modal'
import HomePage from './pages/HomePage'
import TimeOff from './pages/TimeOff'
import { Availability } from './pages/Availability'
import NavBar from './pages/NavBar'
import CreateShift from './pages/CreateShift'
import NotFoundPage from './pages/NotFoundPage'
import Login from './pages/LoginPage'
import ViewRequests from './pages/ViewRequests'
import ProtectedRoute from "./pages/ProtectedRoute"
import { UserManager } from './pages/userManager'
import { Settings } from './services/Settings'
// import Toast from './components/Toast'

export const AppContext = React.createContext()

export default () => {
  const [isLoggedIn, changeLoginState] = useState(Settings.isLoggedInDefault)
  const [userData, setUserData] = useState({})
  const baseModalState = { isOpen: false, title: '', style: {} }
  const [modalState, setModalOpenState] = useState(baseModalState)



  useEffect(() => {
    if(Settings.isLoggedInDefault) {
      ApiService.LogIn(Settings.defaultUser.userid, Settings.defaultUser.password).then((axiosResponse) => {
        if(axiosResponse.status === 200) {
          const response = axiosResponse.data
          receiveNewJwt(response.token)
          setUserData(response.user)
        }
      })
    }
  }, [])


  const receiveNewJwt = jwt => {
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



  /*
  setting has
    - title
    - height
    - width
   */
  const toggleModal = (setting) => {
    let toggledState = !modalState.isOpen
    const newModalState = {
      ...baseModalState,
      ...modalState,
      ...setting,
      isOpen:toggledState
    }
    setModalOpenState(newModalState)
  }

  const modalClassName = modalState.isOpen ? "open" : "closed"

  return <AppContext.Provider value={
    {
      userData, isManager, _isLoggedIn, setUserData, changeLoginState, 
      toggleModal, modalState
    }}>

    <Router>

      {modalState.isOpen ? <Modal toggleModal={toggleModal}/> : null}
      


      {/*<Toast/>*/}
      <div id="applicationContainer" className={modalClassName}>

      <NavBar 
        isLoggedIn={_isLoggedIn} 
        userData={userData}
        isManager={isManager}
      />      
      <div id="page-body" className="flexbox-wrapper vertical">
        <Switch>

          <Route 
            path="/" 
            exact
            render={() => <ProtectedRoute adminOnly={false} userData={userData} isLoggedIn={_isLoggedIn}><HomePage/></ProtectedRoute>}
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
            render={(props) => <ProtectedRoute adminOnly={false} userData={userData} isLoggedIn={_isLoggedIn}><TimeOff userData={userData}/></ProtectedRoute>}
          />

          <Route
            path="/CreateShifts"
            render={(props) => <ProtectedRoute adminOnly={true} userData={userData} isLoggedIn={_isLoggedIn}><CreateShift /></ProtectedRoute>}
          />
          <Route
            path="/ViewRequests"
            render={(props) => <ProtectedRoute adminOnly={true} userData={userData} isLoggedIn={_isLoggedIn}><ViewRequests /></ProtectedRoute>}
          />

          <Route 
            path="/ManageUsers"
            component={UserManager}
          />

          <Route component={NotFoundPage} />

        </Switch>
      </div>

      </div>

    </Router>
</AppContext.Provider>

}