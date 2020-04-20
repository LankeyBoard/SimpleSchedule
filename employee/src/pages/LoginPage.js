import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import logo from './../images/Slogo.png'
import Axios from 'axios'

const Login = (props) => {
    
    const { newJwtNotify } = props
    const [userid, setUserId] = useState('unclefifi')
    const [password, setPassword] = useState('password')
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

    const logInApiRequest = () => {
        Axios.post('/api/users/authenticate', { userid, password }).then((apiResponse)=> {
            
            const jwt = apiResponse.data
            newJwtNotify(jwt)
            setToHome(true)

        }).catch((apiError) => {
            console.log(apiError)
        })
    }

    const buildForm = () => <div className="flexbox-wrapper flexbox-item">
                        <img id="loginLogo" src={logo} alt="Logo" />
                        <div className="flexbox-wrapper flexbox-half-item login vertical">

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

    return isRedirectingHome ? <Redirect to="/"/> : buildForm()

}

export default Login;