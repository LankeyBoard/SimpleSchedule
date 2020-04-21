import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import logo from './../images/Slogo.png'
import { ApiService } from './../services/ApiService'
// import Axios from 'axios'

const Login = (props) => {
    
    const { newJwtNotify } = props
    const [userid, setUserId] = useState('unclefifi')
    const [password, setPassword] = useState('password')
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
            newJwtNotify(jwt.data)
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
                                    <label className="flexbox-item" for="userid">Employee ID</label>
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
                                    <label className="flexbox-item" for="pw">Password</label>
                                    <input 
                                        className="flexbox-item"
                                        type="text" 
                                        id="pw" 
                                        placeholder="password"
                                        value={password}
                                        onChange={(e) => changeField('password',e)}
                                    />
                                </span>
                                <button onClick={logInApiRequest} id="login">Login</button>
                            </div>
                        </div>


                        <div className="flexbox-centeredEvenly flexbox-item flexbox-wrapper vertical">
                            {_errorsBuild()}
                        </div>
                    </div>

    return isRedirectingHome ? <Redirect to="/"/> : buildForm()

}

export default Login;