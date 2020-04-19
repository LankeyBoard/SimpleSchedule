import React from 'react';
import logo from './../images/Slogo.png';
const Login = () => (
    <>
    <img id="loginLogo" src={logo} alt="Logo" />
    <div className="login">
        <h3>Login</h3>
        <label>
            <p>Employee ID</p>
            <input type="text"/>
        </label>
        <label>
            <p>Password</p>
            <input type="text"/>
        </label>

        <button id="login">Login</button>
    </div>
    </>
);

export default Login;