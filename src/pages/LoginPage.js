import React, { useState, useContext } from 'react'
import { Redirect } from 'react-router-dom'
import logo from './../images/Slogo.png'
import { ApiService } from './../services/ApiService'
import { Settings } from './../services/Settings'
import { AppContext } from './../App'

import eyeClosed from "./../images/eyeClosed.png"
import eyeOpen from "./../images/eyeOpen.png"

export default () => {
    
    const { setUserData } = useContext(AppContext)

    const [isPassword, setIsPassword] = useState(true)
    const [userid, setUserId] = useState(Settings.defaultUser.userid)
    const [password, setPassword] = useState(Settings.defaultUser.password)

    const [errors, setErrors] = useState([])
    const [isRedirectingHome, setToHome] = useState(false)


    const changeField = (fieldName, eventDetails) => {
        if(eventDetails && eventDetails.target && typeof eventDetails.target.value === "string") {
            const value = eventDetails.target.value
            if(fieldName==='userId') {
                setUserId(value)
            } else if(fieldName==='password') {
                setPassword(value)
            }
        }
    }

    const logInApiRequest = async () => {
        const jwt = await ApiService.LogIn(userid, password)
        if(jwt.status === 200 && jwt.data) {
            setUserData(jwt.data.user)
            setToHome(true)
        } else if(jwt && jwt.data && jwt.data.errors) {
            setErrors(jwt.data.errors.map(x => x.msg))
        }
    }

    
    const _errorsBuild = () => errors.map((e,i) => <div key={e}>{i+1}.) {e}</div>)

    const buildForm = () => <div className="flexbox-wrapper flexbox-item vertical">

                        <div className="flexbox-item">
                            <img id="loginLogo" src={logo} alt="Logo" />
                        </div>

                        <div className="flexbox-centered flexbox-wrapper">
                            <div className="flexbox-wrapper login vertical">
                                <h3>Login</h3>
                                <span className="flexbox-wrapper">
                                    <label className="flexbox-item" htmlFor="userid">Employee ID</label>
                                    <input 
                                        className="flexbox-item"
                                        type="text" 
                                        id="userid" 
                                        placeholder="loginID"
                                        value={userid}
                                        onChange={(e) => changeField('userId',e)}
                                    />
                                </span>
                                <span className="flexbox-wrapper">
                                    <label className="flexbox-item" htmlFor="pw">Password</label>
                                    <input 
                                        className="flexbox-item"
                                        type={isPassword ? "password" : "text"} 
                                        id="pw" 
                                        placeholder="password"
                                        value={password}
                                        onChange={(e) => changeField('password',e)}
                                    />
                                </span>
                                <label htmlFor="viewPassword" className="pointerCursor flexbox-wrapper">
                                    
                                    <span className="flexbox-wrapper flexbox-item">
                                        <span className="flexbox-item">
                                            <img style={{marginRight: '25px'}} height="20" alt="loginLogo" src={isPassword ? eyeOpen : eyeClosed}/>
                                            {isPassword ? "View" : "Hide"}
                                        </span>
                                    </span>
                                    
                                    <input onClick={() => setIsPassword(!isPassword)} id="viewPassword" className="flexbox-item" type="checkbox"/>
                                </label>
                                <button onClick={logInApiRequest} id="login">Login</button>
                            </div>
                        </div>
                        <div className="flexbox-centeredEvenly flexbox-item flexbox-wrapper vertical">
                            {_errorsBuild()}
                        </div>
                    </div>

    return isRedirectingHome ? <Redirect to="/"/> : buildForm()

}